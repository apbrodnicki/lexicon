import type { Word } from '@shared/models/models';

export const fetchWord = async (word: string): Promise<Word[]> => {
	const response = await fetch(`/api/dictionary/fetchWord?query=${word}`);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
