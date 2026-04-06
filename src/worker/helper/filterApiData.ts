import { capitalizeFirstLetter } from '@shared/helper';
import type { WordEntity } from '@shared/models/entities';
import type { GenericWord, PartsOfSpeech, Word } from '@shared/models/models';

export const filterGenericWordData = (word: GenericWord): Word => {
	return {
		wordId: word.meta.uuid,
		word: capitalizeFirstLetter(word.meta.id.replace(/:.*/, '')),
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

export const convertWordsForInsert = (words: Word[]): WordEntity[] => (
	words.map(({ wordId, word, definitions, stems, speechPart, offensive }) => ({
		wordId,
		word,
		definitions: definitions.join('`'),
		stems: stems.join('`'),
		speechPart: speechPart as string,
		offensive: offensive ? 1 : 0
	}))
);

export const isDidYouMeanResponse = (response: GenericWord[] | string[]) => {
	return response.length > 0 && typeof response[0] === 'string';
};
