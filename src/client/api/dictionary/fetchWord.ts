import type { FetchWordResponse } from '@shared/models/responses';

export const fetchWord = async (word: string): Promise<FetchWordResponse> => {
	const response = await fetch(`/api/dictionary/fetchWord?query=${word}`);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
