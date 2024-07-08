export interface Word {
	id: string,
	stems: string[],
	offensive: boolean,
	speechPart: keyof PartsOfSpeech,
	definitions: string[],
}

export interface PartsOfSpeech {
	noun: string,
	pronoun: string,
	verb: string,
	adjective: string,
	adverb: string,
	preposition: string,
	conjunction: string,
	interjection: string,
	idiom: string,
	[key: string]: unknown
}
