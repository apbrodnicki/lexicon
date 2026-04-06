import { login } from '@client/api/auth/login';
import { register } from '@client/api/auth/register';
import { AuthContext } from '@client/contexts/AuthContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import { UserContext } from '@client/contexts/UserContext';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import type { GenericResponse, LoginResponse } from '@shared/models/responses';
import { useContext, useState } from 'react';
import { BookLoader } from '../loader/BookLoader';

interface AuthDialogProps {
	authDialogOpen: boolean;
	setAuthDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthDialog = ({ authDialogOpen, setAuthDialogOpen }: AuthDialogProps): React.JSX.Element => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const { setUserId, setUsername } = useContext(UserContext);
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [action, setAction] = useState<'login' | 'register'>('login');
	const [usernameValue, setUsernameValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [usernameInputTouched, setUsernameInputTouched] = useState<boolean>(false);
	const [passwordInputTouched, setPasswordInputTouched] = useState<boolean>(false);

	const handleClose = (): void => {
		setAuthDialogOpen(false);
		setUsernameValue('');
		setPasswordValue('');
		setUsernameInputTouched(false);
		setPasswordInputTouched(false);
	};

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
		let message = '';

		try {
			event.preventDefault();

			let response: LoginResponse | GenericResponse;

			setIsLoading(true);

			if (action === 'login') {
				response = await login(usernameValue, passwordValue);

				setIsAuthenticated(true);
				setUserId((response as LoginResponse).user.userId);
				setUsername((response as LoginResponse).user.username);
			} else {
				response = await register(usernameValue, passwordValue);
			}

			message = response.message;

			handleClose();
			setSnackbarColor('success');
		} catch (error) {
			message = String(error);

			setSnackbarColor('error');
		} finally {
			setIsLoading(false);
			setSnackbarOpen(true);
			setSnackbarMessage(message);
		}
	};

	return (
		<Dialog
			open={authDialogOpen}
			onClose={handleClose}
			slotProps={{
				paper: {
					className: 'note-card'
				}
			}}
			sx={{
				'& .MuiPaper-root': {
					bgcolor: 'primary.main',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minWidth: '300px',
					minHeight: '200px'
				}
			}}
		>
			{!isLoading ? (
				<Box component={'form'} onSubmit={handleSubmit}>
					<DialogTitle>Login</DialogTitle>
					<DialogContent sx={{
						display: 'flex',
						flexDirection: 'column'
					}}>
						<TextField
							value={usernameValue}
							id='username'
							label='Username'
							variant='standard'
							color='secondary'
							required
							error={usernameInputTouched && usernameValue.length < 1}
							onChange={(e) => setUsernameValue(e.target.value)}
							onFocus={() => setUsernameInputTouched(true)}
							sx={{
								m: 1
							}}
						/>
						<TextField
							value={passwordValue}
							type='password'
							id='password'
							label='Password'
							variant='standard'
							color='secondary'
							required
							error={passwordInputTouched && passwordValue.length < 1}
							onChange={(e) => setPasswordValue(e.target.value)}
							onFocus={() => setPasswordInputTouched(true)}
							sx={{
								m: 1
							}}
						/>
						<Button
							type='submit'
							variant='outlined'
							color='secondary'
							onClick={() => setAction('login')}
							sx={{
								m: 1
							}}
						>
							Login
						</Button>
					</DialogContent>
					<Divider>or</Divider>
					<DialogContent sx={{
						display: 'flex',
						flexDirection: 'column'
					}}>
						<Button
							type='submit'
							variant='outlined'
							color='secondary'
							onClick={() => setAction('register')}
							sx={{
								m: 1
							}}
						>
							Register
						</Button>
					</DialogContent>
				</Box>
			) : (
				<BookLoader />
			)}
		</Dialog>
	);
};
