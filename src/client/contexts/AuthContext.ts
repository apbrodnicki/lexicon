import { createContext } from 'react';

interface AuthContextProps {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: false,
	setIsAuthenticated: () => {}
});
