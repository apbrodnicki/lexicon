import type { GenericWordWrapping } from 'models/genericModels';

export const fetchWord = async (word: string): Promise<GenericWordWrapping> => {
	const response = await fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=' + process.env.REACT_APP_DICTIONARY_TOKEN);
	return await response.json();
};
