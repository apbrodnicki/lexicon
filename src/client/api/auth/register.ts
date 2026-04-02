import type { GenericResponse } from '@shared/models/responses';

export const register = async (username: string, password: string): Promise<GenericResponse> => {
	const response = await fetch('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify({ username, password })
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
