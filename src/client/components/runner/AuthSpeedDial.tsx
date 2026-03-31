import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useState } from 'react';

interface AuthSpeedDialProps {
	setAuthDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SpeedDialActionInterface {
	icon: React.JSX.Element;
	name: 'Login' | 'Logout';
}

type ActionName = SpeedDialActionInterface['name'];

export const AuthSpeedDial = ({ setAuthDialogOpen }: AuthSpeedDialProps): React.JSX.Element => {
	const [atSmBreakpoint, setAtSmBreakpoint] = useState<boolean>(false);

	const match = window.matchMedia('(min-width: 600px)');
	match.addEventListener('change', (e) => {
		if (!e.matches) {
			return setAtSmBreakpoint(true);
		}

		return setAtSmBreakpoint(false);
	});

	const speedDialActions: SpeedDialActionInterface[] = [
		{ icon: <LogoutIcon color='secondary' />, name: 'Logout' },
		{ icon: <LoginIcon color='secondary' />, name: 'Login' }
	];

	const onClick = (name: ActionName) => {
		if (name === 'Login') {
			setAuthDialogOpen(true);
		} else if (name === 'Logout') {
			console.log('logout');
		}
	};

	return (
		<SpeedDial
			ariaLabel='Auth SpeedDial'
			icon={<SpeedDialIcon />}
			direction={atSmBreakpoint ? 'down' : 'left'}
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
					onClick={() => onClick(action.name)}
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
