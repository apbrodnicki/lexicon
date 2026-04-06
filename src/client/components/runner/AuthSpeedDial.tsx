import { logout } from '@client/api/auth/logout';
import { AuthContext } from '@client/contexts/AuthContext';
import { LoadingContext } from '@client/contexts/LoadingContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useContext } from 'react';

interface AuthSpeedDialProps {
	setAuthDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SpeedDialActionInterface {
	icon: React.JSX.Element;
	name: 'Login' | 'Logout';
}

type Action = SpeedDialActionInterface['name'];

export const AuthSpeedDial = ({ setAuthDialogOpen }: AuthSpeedDialProps): React.JSX.Element => {
	const { setIsLoading } = useContext(LoadingContext);
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const speedDialActions: SpeedDialActionInterface[] = [];

	if (isAuthenticated) {
		speedDialActions.push({ icon: <LogoutIcon color='secondary' />, name: 'Logout' });
	} else {
		speedDialActions.push({ icon: <LoginIcon color='secondary' />, name: 'Login' });
	}

	const handleClick = async (action: Action) => {
		if (action === 'Login') {
			setAuthDialogOpen(true);
		} else if (action === 'Logout') {
			if (!isAuthenticated) {
				return;
			}

			let message = '';

			try {
				setIsLoading(true);

				const response = await logout();

				message = response.message;

				setIsAuthenticated(false);
				setSnackbarColor('success');
			} catch (error) {
				message = String(error);

				setSnackbarColor('error');
			} finally {
				setIsLoading(false);
				setSnackbarOpen(true);
				setSnackbarMessage(message);
			}
		}
	};

	return (
		<SpeedDial
			ariaLabel='Auth SpeedDial'
			icon={<SpeedDialIcon />}
			direction={'down'}
			color='primary.main'
			sx={{
				position: 'fixed',
				top: '16px',
				right: '16px'
			}}
		>
			{speedDialActions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					onClick={() => handleClick(action.name)}
					slotProps={{
						tooltip: {
							open: true,
							title: action.name
						},
					}}
					sx={{
						mx: 1,
						display: 'flex',
						flexDirection: 'column-reverse',
						'& .MuiSpeedDialAction-staticTooltipLabel': {
							backgroundColor: 'unset',
							boxShadow: 'unset',
							top: '13px',
							right: '36px',
							color: 'secondary.main'
						},
						'& .MuiButtonBase-root': {
							backgroundColor: 'primary.main'
						}
					}}
				/>
			))}
		</SpeedDial>
	);
};
