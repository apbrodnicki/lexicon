import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, TextField } from '@mui/material';
import { fetchWord } from '@react-app/api/fetchWord';
import { LexiconListContext } from '@react-app/contexts/LexiconListContext';
import React, { useContext, useState } from 'react';

export const AddWordInput = (): React.JSX.Element => {
	const { wordsList, setWordsList } = useContext(LexiconListContext);

	const [word, setWord] = useState<string>('');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setWord(event.target.value);
	};

	const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter' && word.length > 0) {
			onClick();
		}
	};

	const onClick = async (): Promise<void> => {
		try {
			const words = await fetchWord(word);
			setWordsList([...wordsList, ...words]);
		} catch (error) {
			alert(error);
		}

	};

	return (
		<Box display='flex' justifyContent='center' my={2}>
			<TextField
				label='Add a word'
				value={word}
				onChange={onChange}
				onKeyUp={onKeyUp}
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
