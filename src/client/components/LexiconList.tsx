import { AuthContext } from '@client/contexts/AuthContext';
import { LexiconListContext } from '@client/contexts/LexiconListContext';
import { ShowOffensiveWordsContext } from '@client/contexts/ShowOffensiveWordsContext';
import { SnackbarContext } from '@client/contexts/SnackbarContext';
import { handleRemoveUserWord } from '@client/services/dictionary/handleRemoveUserWord';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { capitalizeFirstLetter } from '@shared/helper';
import type { Word } from '@shared/models/models';
import React, { useContext, useState } from 'react';
import { StyledIconButton, StyledListItemButton } from './custom/Styles';
import { BookLoader } from './loader/BookLoader';

export const LexiconList = (): React.JSX.Element => {
	const { showOffensiveWords } = useContext(ShowOffensiveWordsContext);
	const { lexiconList, setLexiconList } = useContext(LexiconListContext);
	const { userId } = useContext(AuthContext);
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [openId, setOpenId] = useState<string>('');
	const [removeWordId, setRemoveWordId] = useState<string>('');

	const alphabetizedWords = lexiconList.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));

	const removeWord = async (event: React.MouseEvent<HTMLButtonElement>, word: Word): Promise<void> => {
		event.stopPropagation();
		setRemoveWordId(word.wordId);
		await handleRemoveUserWord({ userId, wordId: word.wordId, lexiconList, setLexiconList, setSnackbarOpen, setSnackbarMessage, setSnackbarColor });
		setRemoveWordId('');
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
					<>
						<ListItem
							key={index}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								filter: showOffensiveWords ? 'none' : word.offensive ? 'blur(4px)' : 'none'
							}}
						>
							{removeWordId === word.wordId ? (
								<BookLoader />
							) : (
								<StyledListItemButton onClick={() => openId !== word.wordId ? setOpenId(word.wordId) : setOpenId('')}>
									<Box display={'flex'} width={'90%'} my={2}>
										<ListItemText
											primary={capitalizeFirstLetter(word.word)}
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
								</StyledListItemButton>
							)}
							{openId === word.wordId && (
								<Box width={'100%'}>
									<Typography variant='subtitle1' ml={'10%'}>
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
									<Typography variant='subtitle1' ml={'10%'}>
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
								</Box>
							)}
						</ListItem>
					</>
				))}
			</List>
		</Box>
	);
};
