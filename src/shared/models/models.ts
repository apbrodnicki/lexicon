import type { GenericResponse } from './genericModels';

export interface Word {
	id: string;
	stems: string[];
	offensive: boolean;
	speechPart: keyof PartsOfSpeech;
	definitions: string[];
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
	password: string;
}

export interface Words {
	wordId: number;
	word: string;
	definition: string;
}

export interface LoginResponse extends GenericResponse {
	user: UserResponse;
}

export interface UserResponse {
	userId: number;
	username: string;
}

export interface AuthRequest {
	username: string;
	password: string;
}
