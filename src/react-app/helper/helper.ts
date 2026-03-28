import type { GenericWord, GenericWordWrapper } from 'models/genericModels';
import type { PartsOfSpeech, Word } from 'models/models';

export const filterWordData = (word: GenericWord): Word => {
	return {
		id: word.meta.id,
		stems: word.meta.stems,
		offensive: word.meta.offensive,
		speechPart: word.fl as keyof PartsOfSpeech,
		definitions: word.shortdef,
	};
};

export const filterWordDataWrapper = (wordWrapper: GenericWordWrapper): Word[] => {
	const words: Word[] = [];

	for (const word of wordWrapper) {
		// Skip words with no definitions (they're just alternate spellings)
		if (word.shortdef.length < 1) {
			continue;
		}

		words.push(filterWordData(word));
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

/**
 * Takes a two-dimensional array and returns the inner array
 * @param array
 * @returns unknown[]
 */
export const reduceArray = (array: unknown[][]): unknown[] => {
	return array.reduce(
		(accumulator, currentArray) => {
			for (const currentElement of currentArray) {
				if (!accumulator.includes(currentElement)) {
					accumulator.push(currentElement);
				}
			}

			return accumulator;
		},
		[]
	);
};
