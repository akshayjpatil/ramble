import * as React from 'react';
import { AppBar, IconButton, Paper, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export const Message = () => {
	return (
		<DefaultLayout>
			<Paper>
				{
					// TODO: messages
				}
			</Paper>
			<AppBar
				position='fixed'
				color='default'
				sx={{
					top: 'auto',
					bottom: 0,
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<TextField sx={{ flexGrow: 1, border: 'none' }} />
				<IconButton color='inherit'>
					<SendIcon />
				</IconButton>
			</AppBar>
		</DefaultLayout>
	);
};
