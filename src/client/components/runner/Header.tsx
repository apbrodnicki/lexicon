
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AuthSpeedDial } from './AuthSpeedDial';

export const Header = (): React.JSX.Element => {
	const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);



	const onClick = () => {

	};

	return (
		<Box mt={2} textAlign={'center'}>
			<Typography variant='h3'>
				Lexicon
			</Typography>
			<AuthSpeedDial />
		</Box>
	);
};
