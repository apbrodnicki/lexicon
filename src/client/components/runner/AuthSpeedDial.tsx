import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useState } from 'react';

export const AuthSpeedDial = (): React.JSX.Element => {
	const [atSmBreakpoint, setAtSmBreakpoint] = useState<boolean>(false);

	const match = window.matchMedia('(min-width: 600px)');
	match.addEventListener('change', (e) => {
		if (!e.matches) {
			return setAtSmBreakpoint(true);
		}

		return setAtSmBreakpoint(false);
	});
	const speedDialActions = [
		{ icon: <LogoutIcon color='secondary' />, name: 'Logout' },
		{ icon: <LoginIcon color='secondary' />, name: 'Login' }
	];

	return (
		<SpeedDial
			ariaLabel='Auth SpeedDial'
			icon={<SpeedDialIcon />}
			direction={atSmBreakpoint ? 'down' : 'left'}
			color='primary'
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
							top: atSmBreakpoint ? '13px' : '43px',
							right: atSmBreakpoint ? '36px' : ''
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
