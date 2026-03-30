import { Box, Link as MuiLink, Typography } from '@mui/material';
import merriamWebsterLogo from '@react-app/assets/merriam-webster-logo.svg';
import React from 'react';

export const Footer = (): React.JSX.Element => {
	return (
		<Box m={2} textAlign={'right'}>

			<Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
				<Typography variant='subtitle2'>
					Data:
				</Typography>
				<MuiLink href='https://www.dictionaryapi.com/' target='_blank' underline='hover' color='black' mx={1}>
					<Box
						component='img'
						src={merriamWebsterLogo}
						alt='Merriam-Webster logo'
						width={{ xs: '75px', sm: '100px' }}
						height={{ xs: '75px', sm: '100px' }}
					/>
				</MuiLink>
			</Box>
			<Typography variant='subtitle2' m={2}>
				Created by Alex Brodnicki
			</Typography>
		</Box>
	);
};
