import { fetchWord } from '@client/api/fetchWord';
import { LexiconListContext } from '@client/contexts/LexiconListContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, TextField } from '@mui/material';
import type { Word } from '@shared/models/database';
import React, { useContext, useState } from 'react';
import { ChooseWordsDialog } from './ChooseWordsDialog';

export const AddWordInput = (): React.JSX.Element => {
	const { lexiconList, setLexiconList } = useContext(LexiconListContext);
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [word, setWord] = useState<string>('');
	const [wordsFromApi, setWordsFromApi] = useState<Word[]>([]);
	const [chooseWordsDialogOpen, setChooseWordsDialogOpen] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setWord(event.target.value);
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter' && word.length > 0) {
			handleClick();
		}
	};

	const handleClick = async (): Promise<void> => {
		try {
			if (word.length > 0) {
				const words = await fetchWord(word);

				if (words.length > 1) {
					setWordsFromApi(words);
					setChooseWordsDialogOpen(true);
				} else {
					setLexiconList([...lexiconList, ...words]);
				}
			}
		} catch (error) {
			const message = String(error);

			setSnackbarOpen(true);
			setSnackbarMessage(message);
			setSnackbarColor('error');
		}

	};

	return (
		<Box display='flex' justifyContent='center' mt={6} mb={3}>
			<TextField
				label='Add a word'
				value={word}
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				color='secondary'
				slotProps={{
					input: {
						endAdornment: (
							<IconButton onClick={handleClick} sx={{ mx: 0 }}>
								<AddIcon />
							</IconButton>
						)
					}
				}}
			/>
			<ChooseWordsDialog words={wordsFromApi} chooseWordsDialogOpen={chooseWordsDialogOpen} setChooseWordsDialogOpen={setChooseWordsDialogOpen} />
		</Box>
	);
};
