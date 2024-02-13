import type { GenericWordWrapping } from 'models/genericModels';

export const fetchWord = async (word: string): Promise<GenericWordWrapping> => {
	const response = await fetch(`http://localhost:5000/api/word?word=${encodeURIComponent(word)}`);
	return await response.json();
};
