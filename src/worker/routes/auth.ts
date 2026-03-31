import type { User } from '@shared/models/models';
import { hashPassword, verifyPassword } from '@worker/helper/password';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';

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

	const hashedPassword = await hashPassword(password);

	await c.env['lexicon-db'].prepare(`
		INSERT INTO Users (Username, Password)
		VALUES (?, ?)
	`).bind(username, hashedPassword).run();

	return c.json({ success: true });
});

auth.post('/login', async (c) => {
	const { username, password } = await c.req.json();

	const existingUser = await c.env['lexicon-db'].prepare(`
		SELECT *
		FROM Users
		WHERE Username = ?
	`).bind(username).first<User>();

	if (existingUser === null) {
		throw new HTTPException(401, { message: 'Invalid credentials.' });
	}

	const verified = await verifyPassword(password, existingUser.password);

	if (!verified) {
		throw new HTTPException(401, { message: 'Invalid credentials.' });
	}

	const token = await sign(
		{
			userId: existingUser.userId,
			exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 60 minutes
		},
		c.env.JWT_SECRET
	);

	return c.json({ token });
});

export default auth;
