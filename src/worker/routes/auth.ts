import type { UserEntity } from '@shared/models/entities';
import type { AuthRequest } from '@shared/models/requests';
import type { GenericResponse, LoginResponse } from '@shared/models/responses';
import { hashPassword, verifyPassword } from '@worker/helper/password';
import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { sign, verify } from 'hono/jwt';

const auth = new Hono<{ Bindings: Env; }>();

auth.get('/validate', async (c) => {
	const token = getCookie(c, 'token');

	if (token === undefined) {
		throw new HTTPException(401, { message: 'No credentials found.' });
	}

	const payload = await verify(token, c.env.JWT_SECRET);

	const existingUser = await c.env['lexicon-db'].prepare(`
		SELECT *
		FROM Users
		WHERE userId = ?
	`).bind(payload.userId).first<UserEntity>();

	if (existingUser === null) {
		throw new HTTPException(401, { message: 'Invalid credentials.' });
	}

	return c.json<LoginResponse>({ message: 'Validation success!', user: { userId: existingUser.userId, username: existingUser.username } });
});

auth.post('/register', async (c) => {
	const { username, password } = await c.req.json<AuthRequest>();
	const lowercaseUsername = username.toLowerCase();

	const existingUser = await c.env['lexicon-db'].prepare(`
		SELECT *
		FROM Users
		WHERE username = ?
	`).bind(lowercaseUsername).first<UserEntity>();

	if (existingUser !== null) {
		throw new HTTPException(400, { message: 'This username has already been registered.' });
	}

	const hashedPassword = await hashPassword(password);

	await c.env['lexicon-db'].prepare(`
		INSERT INTO Users (username, password)
		VALUES (?, ?)
	`).bind(lowercaseUsername, hashedPassword).run();

	return c.json<GenericResponse>({ message: 'Registration success!' });
});

auth.post('/login', async (c) => {
	const { username, password } = await c.req.json<AuthRequest>();
	const lowercaseUsername = username.toLowerCase();

	const existingUser = await c.env['lexicon-db'].prepare(`
		SELECT *
		FROM Users
		WHERE username = ?
	`).bind(lowercaseUsername).first<UserEntity>();

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

	setCookie(c, 'token', token, {
		path: '/',
		secure: true,
		httpOnly: true,
		sameSite: 'Strict',
		maxAge: 60 * 60 // 60 minutes
	});

	return c.json<LoginResponse>({ message: 'Login success!', user: { userId: existingUser.userId, username: existingUser.username } });
});

auth.post('/logout', async (c) => {
	deleteCookie(c, 'token');

	return c.json<GenericResponse>({ message: 'Goodbye!' });
});

export default auth;
