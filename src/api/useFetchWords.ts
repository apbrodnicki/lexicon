import { filterWordsData } from 'helper';
import type { Word } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchWord } from './fetchWord';

interface useFetchWordsProps {
	wordsList: string[],
	setIsLoadingWords: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchWords = (props: useFetchWordsProps): Word[] => {
	const [words, setWords] = useState<Word[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				props.setIsLoadingWords(true);
				const promises = props.wordsList.map(async (word: string) => await fetchWord(word));
				const wordsData = await Promise.all(promises);
				const filteredWords = wordsData.map(filterWordsData);
				setWords(filteredWords);
			} catch (error) {
				console.log('Error fetching words ->', error);
			} finally {
				props.setIsLoadingWords(false);
			}
		};

		void fetchData();
	}, [props.wordsList]);

	return words;
};
