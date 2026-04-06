import { login } from '@client/api/auth/login';
import { logout } from '@client/api/auth/logout';
import { register } from '@client/api/auth/register';
import { validate } from '@client/api/auth/validate';
import type { SnackbarContextProps } from '@client/contexts/SnackbarContext';
import type { User } from '@shared/models/models';

interface HandleAuthNoCredentialProps {
	action: 'Logout' | 'Validate';
}

interface HandleAuthCredentialProps {
	action: 'Login' | 'Register';
	username: string;
	password: string;
}

interface HandleAuthSharedProps {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	setUserId: React.Dispatch<React.SetStateAction<number>>;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
	setSnackbarColor: React.Dispatch<React.SetStateAction<'success' | 'info' | 'warning' | 'error'>>;
}

type HandleAuthProps = (HandleAuthNoCredentialProps | HandleAuthCredentialProps) & HandleAuthSharedProps;

export const handleAuth = async ({
	action,
	setIsAuthenticated,
	setUserId,
	setUsername,
	setIsLoading,
	setSnackbarOpen,
	setSnackbarMessage,
	setSnackbarColor,
	...rest
}: HandleAuthProps): Promise<boolean> => {
	const { username, password } = rest as HandleAuthCredentialProps;
	let message = '';
	let user: User;
	let success = false;
	let snackbarColor = 'success' as SnackbarContextProps['snackbarColor'];

	try {
		setIsLoading(true);

		switch (action) {
			case 'Login': {
				({ message, user } = await login(username, password));

				setIsAuthenticated(true);
				setUserId(user.userId);
				setUsername(user.username);
				break;
			}
			case 'Register':
				({ message } = await register(username, password));
				break;
			case 'Logout':
				({ message } = await logout());

				setIsAuthenticated(false);
				setUserId(0);
				setUsername('');
				break;
			case 'Validate':
				try {
					({ message, user } = await validate());

					setIsAuthenticated(true);
					setUserId(user.userId);
					setUsername(user.username);
				} catch (error) {
					message = String(error);
					snackbarColor = 'info';
				}
				break;
		}

		success = true;
	} catch (error) {
		message = String(error);
		snackbarColor = 'error';
	} finally {
		setIsLoading(false);
		setSnackbarOpen(true);
		setSnackbarMessage(message);
		setSnackbarColor(snackbarColor);
	}

	return success;
};
