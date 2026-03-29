import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import dictionary from './routes/dictionary';

const app = new Hono<{ Bindings: Env; }>();

app.route('/api/dictionary', dictionary);

app.onError((error, c) => {
	if (error instanceof HTTPException) {
		return error.getResponse();
	}

	return c.text('Internal Server Error', 500);
});

export default app;
