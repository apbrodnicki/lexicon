import { validate } from '@client/api/auth/validate';
import { AuthContext } from '@client/contexts/AuthContext';
import { LexiconListContext } from '@client/contexts/LexiconListContext';
import { ShowOffensiveWordsContext } from '@client/contexts/ShowOffensiveWordsContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import '@client/css/app.css';
import '@client/css/legal-pad.css';
import { Box } from '@mui/material';
import type { Word } from '@shared/models/database';
import React, { useEffect, useState } from 'react';
import { AddWordInput } from './AddWordInput';
import { CustomSnackbar } from './custom/CustomSnackbar';
import { RevealSwitch } from './RevealSwitch';
import { Footer } from './runner/Footer';
import { Header } from './runner/Header';
import { WordsList } from './WordsList';

export const App = (): React.JSX.Element => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const [showOffensiveWords, setShowOffensiveWords] = useState<boolean>(false);

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [snackbarColor, setSnackbarColor] = useState<'success' | 'info' | 'warning' | 'error'>('info');

	const [wordsList, setWordsList] = useState<Word[]>(() => {
		const list = localStorage.getItem('lexicon-list');

		return (list !== null) ? JSON.parse(list) : [];
	});

	useEffect(() => {
		const validateUser = async (): Promise<void> => {
			let message = '';

			try {
				const response = await validate();
				message = response.message;

				setIsAuthenticated(true);
				setSnackbarColor('success');
			} catch (error) {
				message = String(error);

				setIsAuthenticated(false);
				setSnackbarColor('info');
			} finally {
				setSnackbarOpen(true);
				setSnackbarMessage(message);
			}
		};

		validateUser();
	}, []);

	useEffect(() => {
		localStorage.setItem('lexicon-list', JSON.stringify(wordsList));
	}, [wordsList]);

	return (
		<Box id='lexicon' className='page-layout legal-pad'>
			<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
				<ShowOffensiveWordsContext.Provider value={{ showOffensiveWords, setShowOffensiveWords }}>
					<LexiconListContext.Provider value={{ wordsList, setWordsList }}>
						<SnackbarContext.Provider value={{ snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage, snackbarColor, setSnackbarColor }}>
							<Header />
							<AddWordInput />
							<RevealSwitch />
							<WordsList />
							<Footer />
							<CustomSnackbar />
						</SnackbarContext.Provider>
					</LexiconListContext.Provider>
				</ShowOffensiveWordsContext.Provider>
			</AuthContext.Provider>
		</Box>
	);
};
