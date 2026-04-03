import { LexiconListContext } from '@client/contexts/LexiconListContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import type { Word } from '@shared/models/models';
import { useContext, useState } from 'react';

interface ChooseWordsDialogProps {
	words: Word[];
	chooseWordsDialogOpen: boolean;
	setChooseWordsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChooseWordsDialog = ({ words, chooseWordsDialogOpen, setChooseWordsDialogOpen }: ChooseWordsDialogProps): React.JSX.Element => {
	const { wordsList, setWordsList } = useContext(LexiconListContext);
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [selectedWords, setSelectedWords] = useState<Word[]>([]);

	const handleSubmit = (event: React.SyntheticEvent): void => {
		event.preventDefault();

		setChooseWordsDialogOpen(false);
		setWordsList([...wordsList, ...selectedWords]);
		setSnackbarOpen(true);
		setSnackbarMessage(selectedWords.length + ' words added.');
		setSnackbarColor('success');
	};

	const handleChecked = (event: React.ChangeEvent<HTMLInputElement, Element>, word: Word): void => {
		if (event.target.checked) {
			setSelectedWords([...selectedWords, word]);
		} else {
			setSelectedWords(selectedWords.filter(w => w.id !== word.id));
		}
	};

	return (
		<Dialog
			open={chooseWordsDialogOpen}
			onClose={() => setChooseWordsDialogOpen(false)}
			slotProps={{
				paper: {
					className: 'note-card'
				}
			}}
		>
			<DialogTitle>Your query returned multiple results.</DialogTitle>
			<DialogTitle>Please select the ones you wish to save to your Lexicon.</DialogTitle>
			<DialogTitle>Then press `Submit` at the bottom.</DialogTitle>
			<DialogContent>
				<Box component={'form'} onSubmit={handleSubmit}>
					<List>
						{words.map((word, index) => (
							<ListItem key={index} sx={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: { xs: 'column', sm: 'row' }
							}}>
								<Box display={'flex'} width={{ xs: '100%', sm: '33%' }} mr={1}>
									<Checkbox color='secondary' onChange={(event) => handleChecked(event, word)} />
									<ListItemText
										primary={word.word}
										secondary={word.speechPart}
										sx={{ width: { xs: '100%', sm: '25%' } }}
									/>
								</Box>
								<ListItemText
									secondary={word.definitions[0]}
									sx={{
										width: { xs: '100%', sm: '50%' },
										'& .MuiListItemText-secondary': {
											whiteSpace: 'unset',
											textOverflow: 'unset',
											overflow: 'hidden',
											display : '-webkit-box',
											WebkitLineClamp: 2,
											WebkitBoxOrient: 'vertical'
										}
									}}
								/>
							</ListItem>
						))}
					</List>
					<Box display={'flex'} justifyContent={'center'}>
						<Button type='submit' variant='contained' color='secondary' sx={{ width: '50%' }}>Submit</Button>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};
