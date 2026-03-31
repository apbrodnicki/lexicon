import { login } from '@client/api/auth/login';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

interface AuthDialogProps {
	authDialogOpen: boolean;
	setAuthDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthDialog = ({ authDialogOpen, setAuthDialogOpen }: AuthDialogProps): React.JSX.Element => {
	const [usernameValue, setUsernameValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [usernameInputTouched, setUsernameInputTouched] = useState<boolean>(false);
	const [passwordInputTouched, setPasswordInputTouched] = useState<boolean>(false);

	const onSubmit = async () => {
		try {
			const response = await login(usernameValue, passwordValue);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Dialog
			open={authDialogOpen}
			onClose={() => setAuthDialogOpen(false)}
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
			<DialogTitle></DialogTitle>
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
					error={usernameInputTouched && usernameValue.length < 1}
					onChange={(e) => setUsernameValue(e.target.value)}
					onFocus={() => setUsernameInputTouched(true)}
				/>
				<TextField
					value={passwordValue}
					id='password'
					label='Password'
					variant='standard'
					color='secondary'
					error={passwordInputTouched && passwordValue.length < 1}
					onChange={(e) => setPasswordValue(e.target.value)}
					onFocus={() => setPasswordInputTouched(true)}
				/>
				<Button type='submit' variant='outlined' color='secondary' onClick={onSubmit}>Login</Button>
			</DialogContent>
		</Dialog>
	);
};
