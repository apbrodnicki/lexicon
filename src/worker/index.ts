import { Hono } from 'hono';
import { env } from 'hono/adapter';

const app = new Hono<{ Bindings: Env; }>();

app.get('/api/fetchWord', async (c) => {
	const query = c.req.query('query');
	const { DICTIONARY_TOKEN } = env<{ DICTIONARY_TOKEN: string; }>(c);

	const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${DICTIONARY_TOKEN}`);
	const data = await response.json();

	return c.json(data);
});

export default app;
