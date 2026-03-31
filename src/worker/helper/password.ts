export async function hashPassword(password: string, providedSalt?: Uint8Array): Promise<string> {
	const encoder = new TextEncoder();
	const salt = providedSalt ?? crypto.getRandomValues(new Uint8Array(16));

	const cryptoKey = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits']
	);

	const hashBuffer = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt: salt,
			iterations: 100000,
			hash: 'SHA-256',
		},
		cryptoKey,
		256
	);

	const hashArray = new Uint8Array(hashBuffer);

	const hashHex = Array.from(hashArray)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	const saltHex = Array.from(salt)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(passwordAttempt: string, storedHash: string): Promise<boolean> {
	const [saltHex, originalHash] = storedHash.split(':');
	const matchResult = saltHex.match(/.{1,2}/g);

	if (!matchResult) {
		throw new Error('Invalid salt format');
	}

	const salt = new Uint8Array(matchResult.map((byte) => parseInt(byte, 16)));
	const attemptHashWithSalt = await hashPassword(passwordAttempt, salt);
	const [, attemptHash] = attemptHashWithSalt.split(':');

	return attemptHash === originalHash;
}
