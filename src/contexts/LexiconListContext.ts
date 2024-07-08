import type { Word } from 'models/models';
import type React from 'react';
import { createContext } from 'react';

interface LexiconListContextProps {
	wordsList: Word[],
	setWordsList: React.Dispatch<React.SetStateAction<Word[]>>
}

export const LexiconListContext = createContext<LexiconListContextProps>({
	wordsList: [],
	setWordsList: () => {}
});
