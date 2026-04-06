import type { GenericWord, Word } from '@shared/models/models';
import { SaveUserWordRequest } from '@shared/models/requests';
import type { FetchWordResponse, GenericResponse } from '@shared/models/responses';
import { filterGenericWords, isDidYouMeanResponse } from '@worker/helper/filterApiData';
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

dictionary.post('/saveWord', async (c): Promise<Response> => {
	const { wordId, word, definitions, stems, speechPart, offensive } = await c.req.json<Word>();

	const definitionsString = definitions.join(',');
	const stemsString = stems.join(',');

	await c.env['lexicon-db'].prepare(`
		INSERT INTO Words (wordId, word, definitions, stems, speechPart, offensive)
		VALUES (?, ?, ?, ?, ?, ?)
	`).bind(wordId, word, definitionsString, stemsString, speechPart, offensive).run();

	return c.json<GenericResponse>({ message: 'Word saved!' });
});

dictionary.post('/saveUserWord', async (c): Promise<Response> => {
	const { userId, wordId } = await c.req.json<SaveUserWordRequest>();

	if (userId === 0 || wordId === '') {
		throw new HTTPException(400, { message: 'Unable to save word.' });
	}

	await c.env['lexicon-db'].prepare(`
		INSERT INTO UserWords (userId, wordId)
		VALUES (?, ?)
	`).bind(userId, wordId).run();

	return c.json<GenericResponse>({ message: 'Word saved to user Lexicon!' });
});

export default dictionary;
