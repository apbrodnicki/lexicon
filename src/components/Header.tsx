import { Box, Button, FormControlLabel, FormGroup, Switch, Typography, styled } from '@mui/material';
import { ShowOffensiveWordsContext } from 'contexts/ShowOffensiveWordsContext';
import React, { useContext } from 'react';

export const Header = (): React.JSX.Element => {
	const { setShowOffensiveWords } = useContext(ShowOffensiveWordsContext);
	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setShowOffensiveWords(event.target.checked);
	};

	const StyledButton = styled(Button)(() => ({
		textTransform: 'none',
		color: 'black',
		flex: 1
	}));

	return (
		<Box m={2} display='flex' alignItems='center' justifyContent='center' flexDirection={{ xs: 'column', md: 'row' }}>
			<Box flex={1} />
			<StyledButton variant='text'>
				<Typography variant='h3'>
					Lexicon
				</Typography>
			</StyledButton>
			<FormGroup sx={{ flex: 1, alignItems: 'center', mt: { xs: 1, md: 0 } }}>
				<FormControlLabel control={<Switch onChange={onChange} />} label='Reveal offensive words' />
			</FormGroup>
		</Box>
	);
};
