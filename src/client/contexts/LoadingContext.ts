import { createContext } from 'react';

interface LoadingContextProps {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextProps>({
	isLoading: false,
	setIsLoading: () => {}
});
