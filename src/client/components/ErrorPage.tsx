import { Box, Typography } from '@mui/material';
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Footer } from './runner/Footer';
import { Header } from './runner/Header';

export const ErrorPage = (): React.JSX.Element => {
	const error = useRouteError();
	let errorMessage: string;

	if (isRouteErrorResponse(error)) {
		errorMessage = error.statusText;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		console.error(error);
		errorMessage = 'An unknown error has occurred.';
	}

	return (
		<Box className='page-layout legal-pad'>
			<Header />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flex: 1
				}}>
				<Typography p={5} align='center'>
					{errorMessage}
				</Typography>
			</Box>
			<Footer />
		</Box>
	);
};
