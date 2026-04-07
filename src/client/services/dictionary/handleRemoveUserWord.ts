import { removeUserWord } from '@client/api/dictionary/removeUserWord';
import type { SnackbarContextProps, SnackbarSetProps } from '@client/contexts/SnackbarContext';
import type { Word } from '@shared/models/models';

interface HandleRemoveUserWordProps extends SnackbarSetProps {
	userId: number;
	wordId: string;
	lexiconList: Word[];
	setLexiconList: React.Dispatch<React.SetStateAction<Word[]>>;
}

export const handleRemoveUserWord = async ({
	userId,
	wordId,
	lexiconList,
	setLexiconList,
	setSnackbarOpen,
	setSnackbarMessage,
	setSnackbarColor
}: HandleRemoveUserWordProps): Promise<void> => {
	let message = '';
	let snackbarColor = 'success' as SnackbarContextProps['snackbarColor'];

	try {
		({ message } = await removeUserWord({ userId, wordId }));
		setLexiconList(lexiconList.filter(w => w.wordId !== wordId));
	} catch (error) {
		message = String(error);
		snackbarColor = 'error';
	} finally {
		setSnackbarOpen(true);
		setSnackbarMessage(message);
		setSnackbarColor(snackbarColor);
	}
};
