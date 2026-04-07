import type { RemoveUserWordRequest } from '@shared/models/requests';
import type { GenericResponse } from '@shared/models/responses';

export const removeUserWord = async (removeUserWordRequest: RemoveUserWordRequest): Promise<GenericResponse> => {
	const response = await fetch('/api/dictionary/removeUserWord', {
		method: 'POST',
		body: JSON.stringify(removeUserWordRequest)
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
