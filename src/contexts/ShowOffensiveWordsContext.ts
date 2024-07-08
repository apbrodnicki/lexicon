import type React from 'react';
import { createContext } from 'react';

interface ShowOffensiveWordsContextProps {
	showOffensiveWords: boolean,
	setShowOffensiveWords: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShowOffensiveWordsContext = createContext<ShowOffensiveWordsContextProps>({
	showOffensiveWords: false,
	setShowOffensiveWords: () => {}
});
