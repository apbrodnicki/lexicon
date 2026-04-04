import { LexiconListContext } from '@client/contexts/LexiconListContext';
import { ShowOffensiveWordsContext } from '@client/contexts/ShowOffensiveWordsContext';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { capitalizeFirstLetter } from '@shared/helper';
import type { Word } from '@shared/models/database';
import React, { useContext, useState } from 'react';
import { StyledIconButton, StyledListItemButton } from './custom/Styles';

export const WordsList = (): React.JSX.Element => {
	const { showOffensiveWords } = useContext(ShowOffensiveWordsContext);
	const { wordsList, setWordsList } = useContext(LexiconListContext);

	const [openId, setOpenId] = useState<string>('');

	const alphabetizedWords = wordsList.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));

	const removeWord = (event: React.MouseEvent<HTMLButtonElement>, word: Word): void => {
		event.stopPropagation();
		setWordsList(wordsList.filter(w => w.wordId !== word.wordId));
	};

	return (
		<Box
			display='flex'
			flex={1}
		>
			<List sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				m: 2,
				width: '100%'
			}}>
				{alphabetizedWords.map((word: Word, index: number) => (
					<ListItem
						key={index}
						sx={{
							width: '100%',
							filter: showOffensiveWords ? 'none' : word.offensive ? 'blur(4px)' : 'none'
						}}
					>
						<StyledListItemButton
							onClick={() => openId !== word.wordId ? setOpenId(word.wordId) : setOpenId('')}
							sx={{
								display: 'flex',
								flexDirection: 'column'
							}}
						>
							<Box display={'flex'} width={'90%'} my={2}>
								<ListItemText
									primary={word.word}
									secondary={word.speechPart}
									slotProps={{
										primary: {
											variant: 'h6'
										}
									}}
								/>
								<StyledIconButton
									color='secondary'
									size='large'
									onClick={(event) => { removeWord(event, word); }}
								>
									<RemoveIcon />
								</StyledIconButton>
							</Box>
							{openId === word.wordId && (
								<>
									<Typography variant='subtitle1' textAlign={'left'} width={'80%'}>
										Definitions
									</Typography>
									{word.definitions.map((definition, index) => (
										<Box
											key={index}
											width={'100%'}
											display={'flex'}
											alignItems={'center'}
											my={2}
										>
											<CircleIcon sx={{ mr: 8 }} />
											<ListItemText
												primary={capitalizeFirstLetter(definition)}
												sx={{ width: '85%' }}
											/>
										</Box>
									))}
									<Typography variant='subtitle1' textAlign={'left'} width={'80%'}>
										Stems
									</Typography>
									{word.stems.map((stem, index) => (
										<Box
											key={index}
											width={'100%'}
											display={'flex'}
											alignItems={'center'}
											my={2}
										>
											<CircleIcon sx={{ mr: 8 }} />
											<ListItemText
												primary={capitalizeFirstLetter(stem)}
												sx={{ width: '85%' }}
											/>
										</Box>
									))}
								</>
							)}
						</StyledListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
