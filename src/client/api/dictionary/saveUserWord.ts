import type { GenericResponse } from '@shared/models/responses';

export const saveUserWord = async (userId: number, wordId: string): Promise<GenericResponse> => {
	const response = await fetch('/api/dictionary/saveUserWord', {
		method: 'POST',
		body: JSON.stringify({ userId, wordId })
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
