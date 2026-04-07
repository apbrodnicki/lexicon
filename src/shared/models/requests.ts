import type { Word } from './models';

export interface AuthRequest {
	username: string;
	password: string;
}

export interface SaveUserWordsRequest {
	userId: number;
	words: Word[];
}

export interface GetUserWordsRequest {
	userId: number;
}
