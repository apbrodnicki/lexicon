import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, TextField } from '@mui/material';
import { fetchWord } from 'api/fetchWord';
import { LexiconListContext } from 'contexts/LexiconListContext';
import { filterWordDataWrapper } from 'helper';
import React, { useContext, useState } from 'react';

export const AddWordInput = (): React.JSX.Element => {
	const { wordsList, setWordsList } = useContext(LexiconListContext);

	const [word, setWord] = useState<string>('');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setWord(event.target.value);
	};

	const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter') {
			onClick();
		}
	};

	const onClick = (): void => {
		fetchWord(word)
			.then((genericWordWrapper) => {
				const wordsToAdd = filterWordDataWrapper(genericWordWrapper);
				setWordsList([...wordsList, ...wordsToAdd]);
			})
			.catch((error: unknown) => {
				console.log('Error fetching words ->', error);
			})
			.finally(() => { setWord(''); });
	};

	return (
		<Box display='flex' justifyContent='center' my={2}>
			<TextField
				label='Add a word'
				value={word}
				onChange={onChange}
				onKeyUp={onKeyUp}
				InputProps={{
					endAdornment: (
						<IconButton onClick={onClick} sx={{ mx: 0 }}>
							<AddIcon />
						</IconButton>
					)
				}}
			/>
		</Box>
	);
};
