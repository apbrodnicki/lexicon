import type { Word } from '@shared/models/models';
import type { GenericResponse } from '@shared/models/responses';

export const saveWords = async (words: Word[]): Promise<GenericResponse> => {
	const response = await fetch('/api/dictionary/saveWords', {
		method: 'POST',
		body: JSON.stringify(words)
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
