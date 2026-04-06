import type { GenericWord, Word } from '@shared/models/models';
import { SaveUserWordRequest } from '@shared/models/requests';
import type { FetchWordResponse, GenericResponse } from '@shared/models/responses';
import { convertWordsForInsert, filterGenericWords, isDidYouMeanResponse } from '@worker/helper/filterApiData';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

const dictionary = new Hono<{ Bindings: Env; }>();

dictionary.get('/fetchWord', async (c): Promise<Response> => {
	const query = c.req.query('query');

	if (query === undefined || query.length === 0) {
		throw new HTTPException(400, { message: 'Please provide a word to search.' });
	}

	const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${c.env.DICTIONARY_TOKEN}`);

	const genericWords: GenericWord[] | string[] | [] = await response.json();

	if (genericWords.length === 0) {
		throw new HTTPException(400, { message: 'Unable to find definition.' });
	} else if (isDidYouMeanResponse(genericWords)) {
		throw new HTTPException(400, { message: `Word not found. Did you mean... ${genericWords.splice(0, 3).join(', ')}?` });
	}

	const words = filterGenericWords(genericWords as GenericWord[]);

	return c.json<FetchWordResponse>({ message: 'Fetch success!', words: words });
});

dictionary.post('/saveWords', async (c): Promise<Response> => {
	const words = await c.req.json<Word[]>();
	const wordEntities = convertWordsForInsert(words);

	const statements = wordEntities.map(word =>
		c.env['lexicon-db'].prepare(`
			INSERT INTO Words (wordId, word, definitions, stems, speechPart, offensive)
			VALUES (?, ?, ?, ?, ?, ?)
			ON CONFLICT (wordId) DO NOTHING
		`).bind(word.wordId, word.word, word.definitions, word.stems, word.speechPart, word.offensive)
	);

	await c.env['lexicon-db'].batch(statements);

	return c.json<GenericResponse>({ message: 'Words saved!' });
});

dictionary.post('/saveUserWords', async (c): Promise<Response> => {
	const { userId, wordIds } = await c.req.json<SaveUserWordRequest>();

	const statements = wordIds.map(wordId =>
		c.env['lexicon-db'].prepare(`
			INSERT INTO UserWords (userId, wordId)
			VALUES (?, ?)
			ON CONFLICT (wordId, userId) DO NOTHING
		`).bind(userId, wordId)
	);

	await c.env['lexicon-db'].batch(statements);

	return c.json<GenericResponse>({ message: 'Words saved to user Lexicon!' });
});

export default dictionary;
