import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

const auth = new Hono<{ Bindings: Env; }>();

auth.post('/register', async (c) => {
	const { username, password } = await c.req.json();

	const existingUser = await c.env['lexicon-db'].prepare(`
		SELECT *
		FROM Users
		Where Username = ?
	`).bind(username).first();

	if (existingUser !== null) {
		throw new HTTPException(400, { message: 'This username has already been registered.' });
	}

	await c.env['lexicon-db'].prepare(`
		INSERT INTO Users (Username, Password)
		VALUES (?, ?)
	`).bind(username, password).run();

	return c.json({ success: true });
});

export default auth;
