import type { GenericWord } from '@shared/models/models';
import { SaveUserWordsRequest } from '@shared/models/requests';
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

dictionary.post('/saveUserWords', async (c): Promise<Response> => {
	const { userId, words } = await c.req.json<SaveUserWordsRequest>();
	const wordEntities = convertWordsForInsert(words);

	const wordStatements = wordEntities.map(word =>
		c.env['lexicon-db'].prepare(`
			INSERT INTO Words (wordId, word, definitions, stems, speechPart, offensive)
			VALUES (?, ?, ?, ?, ?, ?)
			ON CONFLICT (wordId) DO NOTHING
		`).bind(word.wordId, word.word, word.definitions, word.stems, word.speechPart, word.offensive)
	);

	const userWordStatements = wordEntities.map(word =>
		c.env['lexicon-db'].prepare(`
			INSERT INTO UserWords (userId, wordId)
			VALUES (?, ?)
			ON CONFLICT (userId, wordId) DO NOTHING
		`).bind(userId, word.wordId)
	);

	await c.env['lexicon-db'].batch(wordStatements);
	await c.env['lexicon-db'].batch(userWordStatements);

	return c.json<GenericResponse>({ message: 'Words saved to Lexicon!' });
});

export default dictionary;
