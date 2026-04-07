import type { FetchWordResponse } from '@shared/models/responses';

export const getUserWords = async (userId: number): Promise<FetchWordResponse> => {
	const response = await fetch(`/api/dictionary/getUserWords?userId=${userId}`);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
