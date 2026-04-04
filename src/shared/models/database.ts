import type { PartsOfSpeech } from './models';

export interface User {
	userId: number;
	username: string;
	password: string;
}

export interface Word {
	wordId: string;
	word: string;
	stems: string[];
	offensive: boolean;
	speechPart: keyof PartsOfSpeech;
	definitions: string[];
}
