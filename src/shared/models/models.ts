export interface GenericWord {
	meta: {
		id: string;
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
