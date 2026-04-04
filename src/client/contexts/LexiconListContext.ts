import type { Word } from '@shared/models/database';
import type React from 'react';
import { createContext } from 'react';

interface LexiconListContextProps {
	lexiconList: Word[];
	setLexiconList: React.Dispatch<React.SetStateAction<Word[]>>;
}

export const LexiconListContext = createContext<LexiconListContextProps>({
	lexiconList: [],
	setLexiconList: () => { }
});
