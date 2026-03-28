import { CssBaseline, ThemeProvider } from '@mui/material';
import { App } from 'components/App';
import { ErrorPage } from 'components/ErrorPage';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { theme } from 'theme';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
]);

createRoot(document.getElementById('root') as Element).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>,
);
