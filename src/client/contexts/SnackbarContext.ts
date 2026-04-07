import { createContext } from 'react';

export interface SnackbarSetProps {
	setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
	setSnackbarColor: React.Dispatch<React.SetStateAction<'success' | 'info' | 'warning' | 'error'>>;
}
export interface SnackbarContextProps extends SnackbarSetProps {
	snackbarOpen: boolean;
	snackbarMessage: string;
	snackbarColor: 'success' | 'info' | 'warning' | 'error';
}

export const SnackbarContext = createContext<SnackbarContextProps>({
	snackbarOpen: false,
	setSnackbarOpen: () => {},
	snackbarMessage: '',
	setSnackbarMessage: () => {},
	snackbarColor: 'info',
	setSnackbarColor: () => {}
});
