export interface GenericWord {
	meta: {
		id: string;
		uuid: string;
		stems: string[];
		offensive: boolean;
	};
	fl: string;
	shortdef: string[];
	[key: string]: unknown;
}

export interface PartsOfSpeech {
	noun: string;
	pronoun: string;
	verb: string;
	adjective: string;
	adverb: string;
	preposition: string;
	conjunction: string;
	interjection: string;
	idiom: string;
	[key: string]: unknown;
}

export interface User {
	userId: number;
	username: string;
}

export interface Word {
	wordId: string;
	word: string;
	stems: string[];
	offensive: boolean;
	speechPart: keyof PartsOfSpeech;
	definitions: string[];
}
