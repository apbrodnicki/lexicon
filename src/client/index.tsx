import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './components/App';
import { ErrorPage } from './components/ErrorPage';
import { theme } from './theme';

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
