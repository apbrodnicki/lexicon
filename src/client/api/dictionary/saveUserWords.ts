import type { SaveUserWordsRequest } from '@shared/models/requests';
import type { GenericResponse } from '@shared/models/responses';

export const saveUserWords = async (saveUserWords: SaveUserWordsRequest): Promise<GenericResponse> => {
	const response = await fetch('/api/dictionary/saveUserWords', {
		method: 'POST',
		body: JSON.stringify(saveUserWords)
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
