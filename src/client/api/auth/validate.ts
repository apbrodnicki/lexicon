import type { LoginResponse } from '@shared/models/responses';

export const validate = async (): Promise<LoginResponse> => {
	const response = await fetch('/api/auth/validate');

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return await response.json();
};
