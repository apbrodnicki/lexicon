import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

export const AuthSpeedDial = (): React.JSX.Element => {
	const speedDialActions = [
		{ icon: <LogoutIcon color='primary' />, name: 'Logout' },
		{ icon: <LoginIcon color='primary' />, name: 'Login' }
	];

	return (
		<SpeedDial
			ariaLabel='Auth SpeedDial'
			icon={<SpeedDialIcon />}
			direction='left'
			sx={{ mr: 2 }}
			color='primary'
		>
			{speedDialActions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
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
							position: 'unset',
							backgroundColor: 'unset',
							boxShadow: 'unset',
						},
						'& .MuiButtonBase-root': {
							backgroundColor: 'green'
						}
					}}
				/>
			))}
		</SpeedDial>
	);
};
