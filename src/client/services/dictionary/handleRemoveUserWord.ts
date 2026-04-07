import { removeUserWord } from '@client/api/dictionary/removeUserWord';
import type { SnackbarContextProps } from '@client/contexts/SnackbarContext';
import type { SnackbarSetProps, Word } from '@shared/models/models';

interface HandleRemoveUserWordProps extends SnackbarSetProps {
	userId: number;
	wordId: string;
	lexiconList: Word[];
	setLexiconList: React.Dispatch<React.SetStateAction<Word[]>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleRemoveUserWord = async ({
	userId,
	wordId,
	lexiconList,
	setLexiconList,
	setIsLoading,
	setSnackbarOpen,
	setSnackbarMessage,
	setSnackbarColor
}: HandleRemoveUserWordProps): Promise<void> => {
	let message = '';
	let snackbarColor = 'success' as SnackbarContextProps['snackbarColor'];

	try {
		setIsLoading(true);

		({ message } = await removeUserWord({ userId, wordId }));
		setLexiconList(lexiconList.filter(w => w.wordId !== wordId));
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
