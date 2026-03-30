import { LexiconListContext } from '@client/contexts/LexiconListContext';
import { ShowOffensiveWordsContext } from '@client/contexts/ShowOffensiveWordsContext';
import '@client/css/app.css';
import '@client/css/legal-pad.css';
import { Box } from '@mui/material';
import type { Word } from '@shared/models/models';
import React, { useEffect, useState } from 'react';
import { AddWordInput } from './AddWordInput';
import { RevealSwitch } from './RevealSwitch';
import { Footer } from './runner/Footer';
import { Header } from './runner/Header';
import { WordsList } from './WordsList';

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
		<Box id='lexicon' className='page-layout legal-pad'>
			<ShowOffensiveWordsContext.Provider value={{ showOffensiveWords, setShowOffensiveWords }}>
				<LexiconListContext.Provider value={{ wordsList, setWordsList }}>
					<Header />
					<AddWordInput />
					<RevealSwitch />
					<WordsList />
					<Footer />
				</LexiconListContext.Provider>
			</ShowOffensiveWordsContext.Provider>
		</Box>
	);
};
