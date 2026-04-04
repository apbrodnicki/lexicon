import type { User } from './models';

export interface GenericResponse {
	message: string;
}

export interface LoginResponse extends GenericResponse {
	user: User;
}
