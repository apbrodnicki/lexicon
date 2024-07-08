import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Card, CardContent, CardHeader, Dialog, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, styled } from '@mui/material';
import { LexiconListContext } from 'contexts/LexiconListContext';
import { ShowOffensiveWordsContext } from 'contexts/ShowOffensiveWordsContext';
import { capitalizeFirstLetter } from 'helper';
import type { Word } from 'models/models';
import React, { useContext, useState } from 'react';
// TODO:
// Add option to choose which definition shows up on base list
// Remove duplicate entries when adding new word
export const WordsList = (): React.JSX.Element => {
	const { showOffensiveWords } = useContext(ShowOffensiveWordsContext);
	const { wordsList, setWordsList } = useContext(LexiconListContext);

	const [openId, setOpenId] = useState<string>('');

	const alphabetizedWords = wordsList.sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));

	const openDialog = (wordId: string): void => {
		setOpenId(wordId);
	};

	const removeWord = (event: React.MouseEvent<HTMLButtonElement>, word: Word): void => {
		event.stopPropagation();
		setWordsList(wordsList.filter((currentWord) => currentWord.id !== word.id));
	};

	const StyledListItemButton = styled(ListItemButton)(() => ({
		'&:hover': {
			boxShadow: `
				0px 3px 3px -2px rgba(0, 0, 0, 0.2),
				0px 3px 4px 0px rgba(0, 0, 0, 0.14),
				0px 1px 8px 0px rgba(0, 0, 0, 0.12)
			`
		}
	}));

	return (
		<Box
			display='flex'
			justifyContent='center'
			flex={1}
		>
			<List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2 }}>
				{alphabetizedWords.map((word: Word, index: number) => (
					<ListItem key={index} sx={{ maxWidth: '75%', filter: showOffensiveWords ? 'none' : word.offensive ? 'blur(3px)' : 'none' }}>
						<StyledListItemButton onClick={() => { openDialog(word.id); }}>
							<ListItemText
								primary={`${capitalizeFirstLetter(word.id)} (${word.speechPart})`}
								sx={{ mx: 5 }}
							/>
							<ListItemText
								key={index}
								primary={capitalizeFirstLetter(word.definitions[0])}
								sx={{ mx: 5, textAlign: 'left' }}
							/>
							<IconButton onClick={(event) => { removeWord(event, word); }}>
								<RemoveIcon />
							</IconButton>
						</StyledListItemButton>
						<Dialog open={openId === word.id} onClose={() => { setOpenId(''); }}>
							<Box display='flex' justifyContent='space-between'>
								<DialogTitle>{capitalizeFirstLetter(word.id)}</DialogTitle>
								<IconButton onClick={() => { setOpenId(''); }} sx={{ px: 3, py: 2 }}>
									<CloseIcon />
								</IconButton>
							</Box>
							<Card>
								<CardHeader title={word.definitions.length > 1 ? 'Definitions' : 'Definition'} />
								{word.definitions.map((definition, index) => {
									if (word.definitions.length > 1) {
										return (
											<CardContent key={index} sx={{ display: 'flex' }}>
												<Box mr={2}>
													<Typography>
														{index + 1}
													</Typography>
												</Box>
												<Typography>
													{definition}
												</Typography>
											</CardContent>
										);
									} else {
										return (
											<CardContent key={index} sx={{ display: 'flex' }}>
												<Typography>
													{definition}
												</Typography>
											</CardContent>
										);
									}
								})}
							</Card>
							<Card>
								<CardHeader title={word.stems.length > 1 ? 'Stems' : 'Stem'} />
								{word.stems.map((stem: string, index: number) => (
									<CardContent key={index}>
										<Typography>
											{stem}
										</Typography>
									</CardContent>
								))}
							</Card>
						</Dialog>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
