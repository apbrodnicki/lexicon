export interface UserEntity {
	userId: number;
	username: string;
	password: string;
}

export interface WordEntity {
	wordId: string;
	word: string;
	stems: string;
	offensive: number;
	speechPart: string;
	definitions: string;
}
