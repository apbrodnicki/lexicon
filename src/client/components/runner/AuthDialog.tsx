import { login } from '@client/api/auth/login';
import { register } from '@client/api/auth/register';
import { AuthContext } from '@client/contexts/AuthContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import type { GenericResponse } from '@shared/models/genericModels';
import type { LoginResponse } from '@shared/models/models';
import { useContext, useState } from 'react';

interface AuthDialogProps {
	authDialogOpen: boolean;
	setAuthDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthDialog = ({ authDialogOpen, setAuthDialogOpen }: AuthDialogProps): React.JSX.Element => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

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
		try {
			event.preventDefault();

			let response: GenericResponse;

			if (action === 'login') {
				response = await login(usernameValue, passwordValue) as LoginResponse;

				setIsAuthenticated(true);
			} else {
				response = await register(usernameValue, passwordValue);
			}

			handleClose();

			setSnackbarOpen(true);
			setSnackbarMessage(response.message);
			setSnackbarColor('success');

		} catch (error) {
			const message = String(error);

			setSnackbarOpen(true);
			setSnackbarMessage(message);
			setSnackbarColor('error');
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
					bgcolor: 'primary.main'
				}
			}}
		>
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
		</Dialog>
	);
};
