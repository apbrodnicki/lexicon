import { filterGenericWords } from '@shared/helper';
import type { GenericWord } from '@shared/models/genericModels';
import type { Word } from '@shared/models/models';
import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env; }>();

app.get('/api/fetchWord', async (c): Promise<Response> => {
	const query = c.req.query('query');

	const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${c.env.DICTIONARY_TOKEN}`);
	const genericWords: GenericWord[] = await response.json();

	return c.json<Word[]>(filterGenericWords(genericWords));
});

export default app;
