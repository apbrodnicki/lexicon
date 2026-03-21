import { Button, ListItemButton, styled } from '@mui/material';

export const StyledButton = styled(Button)(() => ({
	textTransform: 'none',
	color: 'black',
	flex: 1
}));

export const StyledListItemButton = styled(ListItemButton)(() => ({
	'&:hover': {
		boxShadow: `
				0px 3px 3px -2px rgba(0, 0, 0, 0.2),
				0px 3px 4px 0px rgba(0, 0, 0, 0.14),
				0px 1px 8px 0px rgba(0, 0, 0, 0.12)
			`
	}
}));
