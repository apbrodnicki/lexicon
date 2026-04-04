import { createContext } from 'react';

interface UserContextProps {
	userId: number;
	setUserId: React.Dispatch<React.SetStateAction<number>>;
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps>({
	userId: 0,
	setUserId: () => {},
	username: '',
	setUsername: () => {}
});
