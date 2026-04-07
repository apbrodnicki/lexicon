import { fetchWord } from '@client/api/dictionary/fetchWord';
import type { SnackbarSetProps } from '@client/contexts/SnackbarContext';
import type { Word } from '@shared/models/models';

interface HandleFetchWordProps extends SnackbarSetProps {
	word: string;
}

export const handleFetchWord = async ({
	word,
	setSnackbarOpen,
	setSnackbarMessage,
	setSnackbarColor
}: HandleFetchWordProps): Promise<Word[]> => {
	let words: Word[] = [];
	let message = '';

	try {
		({ words, message } = await fetchWord(word));
	} catch (error) {
		message = String(error);
		setSnackbarOpen(true);
		setSnackbarMessage(message);
		setSnackbarColor('error');
	}

	return words;
};
