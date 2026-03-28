import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env; }>();

app.get('/api/fetchWord', async (c) => {
	const query = c.req.query('query');

	const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=62ae6585-05f1-46c3-8cda-757eca0f6e87`);
	const data = await response.json();

	return c.json(data);
});

export default app;
