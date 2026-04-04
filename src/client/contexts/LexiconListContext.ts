import type { Word } from '@shared/models/database';
import type React from 'react';
import { createContext } from 'react';

interface LexiconListContextProps {
	wordsList: Word[];
	setWordsList: React.Dispatch<React.SetStateAction<Word[]>>;
}

export const LexiconListContext = createContext<LexiconListContextProps>({
	wordsList: [],
	setWordsList: () => { }
});
