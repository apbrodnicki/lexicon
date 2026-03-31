import type { ApiResponse } from '@shared/models/models';

export const login = async (username: string, password: string): Promise<ApiResponse> => {
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify({ username, password })
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
