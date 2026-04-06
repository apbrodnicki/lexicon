export interface AuthRequest {
	username: string;
	password: string;
}

export interface SaveUserWordRequest {
	userId: number;
	wordIds: string[];
}
