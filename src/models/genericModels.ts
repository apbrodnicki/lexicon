export interface GenericWord {
	meta: {
		id: string,
		stems: string[],
		offensive: boolean,
	},
	fl: string,
	shortdef: string[],
	[key: string]: any,
}

export interface GenericWordWrapping extends Array<GenericWord> {}

export type GenericWordArray = GenericWord[][];
