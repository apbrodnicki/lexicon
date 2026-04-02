import { fetchWord } from '@client/api/fetchWord';
import { LexiconListContext } from '@client/contexts/LexiconListContext';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';

export const AddWordInput = (): React.JSX.Element => {
	const { wordsList, setWordsList } = useContext(LexiconListContext);

	const [word, setWord] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setWord(event.target.value);
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter' && word.length > 0) {
			onClick();
		}
	};

	const onClick = async (): Promise<void> => {
		try {
			if (word.length > 0) {
				const words = await fetchWord(word);
				setWordsList([...wordsList, ...words]);
			}
		} catch (error) {
			alert(error);
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
							<IconButton onClick={onClick} sx={{ mx: 0 }}>
								<AddIcon />
							</IconButton>
						)
					}
				}}
			/>
		</Box>
	);
};
