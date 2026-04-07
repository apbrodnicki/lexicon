import { login } from '@client/api/auth/login';
import { logout } from '@client/api/auth/logout';
import { register } from '@client/api/auth/register';
import { validate } from '@client/api/auth/validate';
import type { SnackbarContextProps, SnackbarSetProps } from '@client/contexts/SnackbarContext';
import type { User, Word } from '@shared/models/models';

interface HandleAuthValidateProps {
	action: 'Validate';
}

interface HandleAuthLogoutProps {
	action: 'Logout';
	setLexiconList: React.Dispatch<React.SetStateAction<Word[]>>;
}

interface HandleAuthCredentialProps {
	action: 'Login' | 'Register';
	username: string;
	password: string;
}

interface HandleAuthSharedProps extends SnackbarSetProps {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	setUserId: React.Dispatch<React.SetStateAction<number>>;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type HandleAuthProps = (HandleAuthValidateProps | HandleAuthLogoutProps | HandleAuthCredentialProps) & HandleAuthSharedProps;

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
	const { setLexiconList } = rest as HandleAuthLogoutProps;
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
				setLexiconList([]);
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
