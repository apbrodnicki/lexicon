
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AuthSpeedDial } from './AuthSpeedDial';

export const Header = (): React.JSX.Element => {
	const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);



	const onClick = () => {

	};

	return (
		<Box display='flex' alignItems='center' justifyContent='center' flexDirection={{ xs: 'column', md: 'row' }}>
			<Box flex={1} />
			<Typography variant='h3'>
				Lexicon
			</Typography>
			<Box display={'flex'} flex={1} justifyContent={'end'}>
				<AuthSpeedDial />
			</Box>
		</Box>
	);
};
