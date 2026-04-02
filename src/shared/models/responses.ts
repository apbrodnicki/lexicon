export interface GenericResponse {
	message: string;
}

export interface UserResponse {
	userId: number;
	username: string;
}

export interface LoginResponse extends GenericResponse {
	user: UserResponse;
}
