import type { GenericResponse } from '@shared/models/responses';

export const logout = async (): Promise<GenericResponse> => {
	const response = await fetch('/api/auth/logout', { method: 'POST' });

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
