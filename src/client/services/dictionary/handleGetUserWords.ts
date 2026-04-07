import { getUserWords } from '@client/api/dictionary/getUserWords';
import type { SnackbarContextProps, SnackbarSetProps } from '@client/contexts/SnackbarContext';
import type { Word } from '@shared/models/models';

interface HandleGetUserWordsProps extends SnackbarSetProps {
	userId: number;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setLexiconList: React.Dispatch<React.SetStateAction<Word[]>>;
}

export const handleGetUserWords = async ({
	userId,
	setIsLoading,
	setLexiconList,
	setSnackbarOpen,
	setSnackbarMessage,
	setSnackbarColor
}: HandleGetUserWordsProps): Promise<void> => {
	let message = '';
	let words: Word[];
	let snackbarColor = 'success' as SnackbarContextProps['snackbarColor'];

	try {
		setIsLoading(true);

		({ message, words } = await getUserWords(userId));
		setLexiconList(words);
	} catch (error) {
		message = String(error);
		snackbarColor = 'error';
	} finally {
		setIsLoading(false);
		setSnackbarOpen(true);
		setSnackbarMessage(message);
		setSnackbarColor(snackbarColor);
	}
};
