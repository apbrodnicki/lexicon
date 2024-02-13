import cors from 'cors';
import 'dotenv/config';
import express, { type Request, type RequestHandler, type Response } from 'express';

const app = express();
const port = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

// Define your API routes
app.get('/api/word', (async (req: Request, res: Response) => {
	try {
		const { word }: { word?: string } = req.query;

		if (word == null) {
			return res.status(400).json({ error: 'Invalid or missing "word" parameter.' });
		}

		const url = `${process.env.DICTIONARY_BASE_URL}/${word}?key=${process.env.DICTIONARY_TOKEN}`;
		const dictionaryApiResponse = await fetch(url);
		const dictionaryApiData = await dictionaryApiResponse.json();

		res.json(dictionaryApiData);
	} catch (error) {
		console.log(error);
	}
}) as RequestHandler);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
