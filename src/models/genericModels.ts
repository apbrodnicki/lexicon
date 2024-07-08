export interface GenericWord {
	meta: {
		id: string,
		stems: string[],
		offensive: boolean,
	},
	fl: string,
	shortdef: string[],
	[key: string]: unknown
}

export interface GenericWordWrapper extends Array<GenericWord> {}
