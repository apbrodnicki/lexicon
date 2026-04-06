import { createContext } from 'react';

interface AuthContextProps {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	userId: number;
	setUserId: React.Dispatch<React.SetStateAction<number>>;
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	userId: 0,
	setUserId: () => {},
	username: '',
	setUsername: () => {}
});
