import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';

interface AuthDialogProps {
	authDialogOpen: boolean;
	setAuthDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthDialog = ({ authDialogOpen, setAuthDialogOpen }: AuthDialogProps): React.JSX.Element => {
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
				<TextField id='username' label='username' variant='standard' color='secondary' />
				<TextField id='password' label='password' variant='standard' color='secondary' />
				<Button variant='outlined' color='secondary'>Login</Button>
			</DialogContent>
		</Dialog>
	);
};
