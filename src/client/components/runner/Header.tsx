
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AuthDialog } from './AuthDialog';
import { AuthSpeedDial } from './AuthSpeedDial';

export const Header = (): React.JSX.Element => {
	const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);

	return (
		<Box m={2} textAlign={'center'}>
			<Typography variant='h3' color='black'>
				Lexicon
			</Typography>
			<AuthSpeedDial setAuthDialogOpen={setAuthDialogOpen} />
			<AuthDialog authDialogOpen={authDialogOpen} setAuthDialogOpen={setAuthDialogOpen} />
		</Box>
	);
};
