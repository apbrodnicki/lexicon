import { Box, Link as MuiLink, Typography } from '@mui/material';
import merriamWebsterLogo from 'assets/merriam-webster-logo.svg';
import React from 'react';

export const Footer = (): React.JSX.Element => {
	return (
		<Box display='flex' alignItems='center' justifyContent='center' flexDirection={{ xs: 'column', md: 'row' }} m={2}>
			<Box flex={1} />
			<Box flex={1} display='flex' justifyContent='center'>
				<Typography variant='subtitle2' m={2}>
					Created by Alex Brodnicki
				</Typography>
			</Box>
			<Box flex={1} display='flex' alignItems='center' justifyContent='flex-end' mr={2}>
				<Typography variant='subtitle2' mx={1}>
					Data provided by Merriam-Webster
				</Typography>
				<MuiLink href='https://www.dictionaryapi.com/' target='_blank' underline='hover' color='black' mx={1}>
					<Box
						component='img'
						src={merriamWebsterLogo}
						alt='Merriam-Webster logo'
						width={{ xs: '50px', md: '100px' }}
						height={{ xs: '50px', md: '100px' }}
					/>
				</MuiLink>
			</Box>
		</Box>
	);
};
