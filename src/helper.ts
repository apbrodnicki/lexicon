import type { GenericWordWrapping } from 'models/genericModels';
import type { PartsOfSpeech, Word } from 'models/models';

export const filterWordsData = (word: GenericWordWrapping): Word => {
	const innerWord = word[0];

	return {
		id: innerWord.meta.id,
		stems: innerWord.meta.stems,
		offensive: innerWord.meta.offensive,
		speechPart: innerWord.fl as keyof PartsOfSpeech,
		definitions: innerWord.shortdef,
	};
};
