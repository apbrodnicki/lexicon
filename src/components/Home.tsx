import { Box } from '@mui/material';
import { useFetchWords } from 'api/useFetchWords';
import loader from 'assets/loader.gif';
import { wordsList } from 'data';
import type { Word } from 'models/models';
import React, { useState } from 'react';

export const Home = (): React.JSX.Element => {
	const [isLoading, setIsLoadingWords] = useState<boolean>(false);
	const words = useFetchWords({ wordsList, setIsLoadingWords });

	return (
		<>
			{!isLoading ? (
				words.map((word: Word, index: number) => (
					<Box key={index}>
						{word.id}
						{word.speechPart}
					</Box>
				))
			) : (
				<Box display='flex' justifyContent='center'>
					<img src={loader} alt='loading' />
				</Box>
			)}
		</>
	);
};
