/*
	Deploy command:
	npx wrangler d1 execute lexicon-db --remote --file=src/worker/schema.sql
*/

DROP TABLE IF EXISTS Words;
CREATE TABLE IF NOT EXISTS Words (
	WordId INTEGER PRIMARY KEY,
	Word TEXT
);
INSERT INTO Words (WordId, Word) VALUES (1, 'elegy')
