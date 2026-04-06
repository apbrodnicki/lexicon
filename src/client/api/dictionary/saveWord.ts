import type { Word } from '@shared/models/models';
import type { GenericResponse } from '@shared/models/responses';

export const saveWord = async (word: Word): Promise<GenericResponse> => {
	const response = await fetch('/api/dictionary/saveWord', {
		method: 'POST',
		body: JSON.stringify(word)
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
