import type { ApiResponse } from '@shared/models/models';

export const logout = async (): Promise<ApiResponse> => {
	const response = await fetch('/api/auth/logout', { method: 'POST' });

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
