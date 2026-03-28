import type { GenericWordWrapper } from 'models/genericModels';

export const fetchWord = async (word: string): Promise<GenericWordWrapper> => {
	const response = await fetch(`/api/fetchWord?query=${word}`);

	return await response.json();
};
