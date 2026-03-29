import { filterGenericWords } from '@shared/helper';
import type { GenericWord } from '@shared/models/genericModels';
import type { Word } from '@shared/models/models';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

const app = new Hono<{ Bindings: Env; }>();

app.get('/api/fetchWord', async (c): Promise<Response> => {
	const query = c.req.query('query');

	if (query === undefined || query.length === 0) {
		throw new HTTPException(400, { message: 'Please provide a word to search.' });
	}

	const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${c.env.DICTIONARY_TOKEN}`);
	const genericWords: GenericWord[] = await response.json();

	return c.json<Word[]>(filterGenericWords(genericWords));
});

app.onError((error, c) => {
	if (error instanceof HTTPException) {
		console.log(error.getResponse);
		return error.getResponse();
	}

	return c.text('Internal Server Error', 500);
});

export default app;
