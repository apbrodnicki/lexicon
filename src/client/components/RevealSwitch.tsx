import { ShowOffensiveWordsContext } from '@client/contexts/ShowOffensiveWordsContext';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useContext } from 'react';

export const RevealSwitch = (): React.JSX.Element => {
	const { setShowOffensiveWords } = useContext(ShowOffensiveWordsContext);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setShowOffensiveWords(event.target.checked);
	};

	return (
		<FormGroup sx={{ alignItems: 'center' }}>
			<FormControlLabel control={<Switch color='secondary' onChange={handleChange} />} label='Reveal offensive words' />
		</FormGroup>
	);
};
