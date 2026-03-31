export const login = async (username: string, password: string) => {
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
