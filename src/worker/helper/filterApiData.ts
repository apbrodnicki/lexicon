import type { GenericWord } from '@shared/models/genericModels';
import type { PartsOfSpeech, Word } from '@shared/models/models';

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

export const isDidYouMeanResponse = (response: GenericWord[] | string[]) => {
	return response.length > 0 && typeof response[0] === 'string';
};
