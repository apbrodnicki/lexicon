import type { GenericWord } from './models/genericModels';
import type { PartsOfSpeech, Word } from './models/models';

export const filterGenericWordData = (word: GenericWord): Word => {
	return {
		id: word.meta.id,
		stems: word.meta.stems,
		offensive: word.meta.offensive,
		speechPart: word.fl as keyof PartsOfSpeech,
		definitions: word.shortdef,
	};
};

export const filterGenericWords = (genericWords: GenericWord[]): Word[] => {
	const words: Word[] = [];

	for (const currentGenericWord of genericWords) {
		// Skip words with no definitions (they're just alternate spellings)
		if (currentGenericWord.shortdef.length < 1) {
			continue;
		}

		words.push(filterGenericWordData(currentGenericWord));
	}

	return words;
};

/**
 * Capitalizes the first letter in a string
 * @param word: string
 * @returns string
 */
export const capitalizeFirstLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};
