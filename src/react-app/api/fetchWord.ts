import type { Word } from '@shared/models/models';

export const fetchWord = async (word: string): Promise<Word[]> => {
	const response = await fetch(`/api/fetchWord?query=${word}`);

	return await response.json();
};
