import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { jwt } from 'hono/jwt';
import auth from './routes/auth';
import dictionary from './routes/dictionary';

const app = new Hono<{ Bindings: Env; }>();

app.use('/api/*', async (c, next) => {
	if (c.req.path.startsWith('/api/auth')) {
		return next();
	}

	const token = getCookie(c, 'token');

	if (token === undefined) {
		throw new HTTPException(401, { message: 'Unauthorized' });
	}

	return jwt({
		secret: c.env.JWT_SECRET,
		cookie: 'token',
		alg: 'HS256'
	})(c, next);
});

app.route('/api/dictionary', dictionary);
app.route('/api/auth', auth);

app.onError((error, c) => {
	if (error instanceof HTTPException) {
		return error.getResponse();
	}

	console.error(error);

	return c.text('Internal Server Error', 500);
});

export default app;
