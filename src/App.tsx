import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import { AddWordInput } from './components/AddWordInput';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { WordsList } from './components/WordsList';
import { LexiconListContext } from './contexts/LexiconListContext';
import { ShowOffensiveWordsContext } from './contexts/ShowOffensiveWordsContext';
import type { Word } from './models/models';

export const App = (): React.JSX.Element => {
	const [showOffensiveWords, setShowOffensiveWords] = useState<boolean>(false);

	const [wordsList, setWordsList] = useState<Word[]>(() => {
		const list = localStorage.getItem('lexicon-list');

		return (list !== null) ? JSON.parse(list) : [];
	});

	useEffect(() => {
		localStorage.setItem('lexicon-list', JSON.stringify(wordsList));
	}, [wordsList]);

	return (
		<Box id="lexicon">
			<ShowOffensiveWordsContext.Provider value={{ showOffensiveWords, setShowOffensiveWords }}>
				<LexiconListContext.Provider value={{ wordsList, setWordsList }}>
					<Header />
					<AddWordInput />
					<WordsList />
					<Footer />
				</LexiconListContext.Provider>
			</ShowOffensiveWordsContext.Provider>
		</Box>
	);
};
