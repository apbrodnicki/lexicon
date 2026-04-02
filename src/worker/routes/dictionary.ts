import type { GenericWord } from '@shared/models/genericModels';
import type { Word } from '@shared/models/models';
import { filterGenericWords, isDidYouMeanResponse } from '@worker/helper/filterApiData';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

const dictionary = new Hono<{ Bindings: Env; }>();

dictionary.get('/fetchWord', async (c): Promise<Response> => {
	const query = c.req.query('query');

	// await c.env['lexicon-db'].prepare('sql query').run();

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

	return c.json<Word[]>(filterGenericWords(genericWords as GenericWord[]));
});

export default dictionary;
