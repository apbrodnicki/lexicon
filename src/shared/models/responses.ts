import type { User, Word } from './models';

export interface GenericResponse {
	message: string;
}

export interface LoginResponse extends GenericResponse {
	user: User;
}

export interface FetchWordResponse extends GenericResponse {
	words: Word[];
}
