import { IconButton, ListItemButton, styled } from '@mui/material';

export const StyledListItemButton = styled(ListItemButton)(() => ({
	'&:hover': {
		boxShadow: `
				0px 3px 3px -2px rgba(0, 0, 0, 0.2),
				0px 3px 4px 0px rgba(0, 0, 0, 0.14),
				0px 1px 8px 0px rgba(0, 0, 0, 0.12)
			`
	},
	'@media (max-width: 600px)': {
		boxShadow: `
				0px 3px 3px -2px rgba(0, 0, 0, 0.2),
				0px 3px 4px 0px rgba(0, 0, 0, 0.14),
				0px 1px 8px 0px rgba(0, 0, 0, 0.12)
			`
	}
}));

export const StyledIconButton = styled(IconButton)(() => ({
	borderRadius: 0,
	'&:hover': {
		boxShadow: `
				0px 3px 3px -2px rgba(0, 0, 0, 0.2),
				0px 3px 4px 0px rgba(0, 0, 0, 0.14),
				0px 1px 8px 0px rgba(0, 0, 0, 0.12)
			`
	},
	'@media (max-width: 600px)': {
		boxShadow: `
				0px 3px 3px -2px rgba(0, 0, 0, 0.2),
				0px 3px 4px 0px rgba(0, 0, 0, 0.14),
				0px 1px 8px 0px rgba(0, 0, 0, 0.12)
			`
	}
}));
