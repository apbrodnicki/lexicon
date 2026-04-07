import { saveUserWords } from '@client/api/dictionary/saveUserWords';
import type { SnackbarContextProps } from '@client/contexts/SnackbarContext';
import type { SnackbarSetProps, Word } from '@shared/models/models';

interface HandleSaveUserWordsProps extends SnackbarSetProps {
	userId: number;
	words: Word[];
	lexiconList: Word[];
	setLexiconList: React.Dispatch<React.SetStateAction<Word[]>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleSaveUserWords = async ({
	userId,
	words,
	lexiconList,
	setLexiconList,
	setIsLoading,
	setSnackbarOpen,
	setSnackbarMessage,
	setSnackbarColor
}: HandleSaveUserWordsProps): Promise<void> => {
	let message = '';
	let snackbarColor = 'success' as SnackbarContextProps['snackbarColor'];

	try {
		setIsLoading(true);

		({ message } = await saveUserWords({ userId, words }));
		setLexiconList([...lexiconList, ...words]);
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
