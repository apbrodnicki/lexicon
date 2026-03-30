import { Box, Typography } from '@mui/material';
import React from 'react';

export const Header = (): React.JSX.Element => (
	<Box m={2} textAlign={'center'}>
		<Typography variant='h3'>
			Lexicon
		</Typography>
	</Box>
);
