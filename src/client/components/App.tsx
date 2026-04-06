import { validate } from '@client/api/auth/validate';
import { AuthContext } from '@client/contexts/AuthContext';
import { LexiconListContext } from '@client/contexts/LexiconListContext';
import { LoadingContext } from '@client/contexts/LoadingContext';
import { ShowOffensiveWordsContext } from '@client/contexts/ShowOffensiveWordsContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import '@client/css/app.css';
import '@client/css/book-loader.css';
import '@client/css/legal-pad.css';
import { Box } from '@mui/material';
import type { Word } from '@shared/models/models';
import React, { useEffect, useState } from 'react';
import { AddWordInput } from './AddWordInput';
import { CustomSnackbar } from './custom/CustomSnackbar';
import { LexiconList } from './LexiconList';
import { BookLoader } from './loader/BookLoader';
import { RevealSwitch } from './RevealSwitch';
import { Footer } from './runner/Footer';
import { Header } from './runner/Header';

export const App = (): React.JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [userId, setUserId] = useState<number>(0);
	const [username, setUsername] = useState<string>('');

	const [showOffensiveWords, setShowOffensiveWords] = useState<boolean>(false);

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [snackbarColor, setSnackbarColor] = useState<'success' | 'info' | 'warning' | 'error'>('info');

	const [lexiconList, setLexiconList] = useState<Word[]>(() => {
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
		localStorage.setItem('lexicon-list', JSON.stringify(lexiconList));
	}, [lexiconList]);

	return (
		<Box id='lexicon' className='page-layout legal-pad'>
			<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
				<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId, username, setUsername }}>
					<ShowOffensiveWordsContext.Provider value={{ showOffensiveWords, setShowOffensiveWords }}>
						<LexiconListContext.Provider value={{ lexiconList, setLexiconList }}>
							<SnackbarContext.Provider value={{ snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage, snackbarColor, setSnackbarColor }}>
								<Header />
								{!isLoading ? (
									<>
										<AddWordInput />
										<RevealSwitch />
										<LexiconList />
									</>
								) : (
									<Box
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
										flex={1}
									>
										<BookLoader />
									</Box>
								)}
								<Footer />
								<CustomSnackbar />
							</SnackbarContext.Provider>
						</LexiconListContext.Provider>
					</ShowOffensiveWordsContext.Provider>
				</AuthContext.Provider>
			</LoadingContext.Provider>
		</Box>
	);
};
