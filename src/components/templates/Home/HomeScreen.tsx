import MessageIcon from '@mui/icons-material/Message';
import { Fab } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

import { ChatList, useChat } from '../../../hooks/useChat';
import { ContactList } from '../../organisms/ContactList';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export const Home = () => {
	const router = useRouter();
	const { chatList } = useChat();
	return (
		<DefaultLayout title='Messages' home>
			<ContactList chatList={chatList as ChatList} />
			<Fab
				aria-label={'new-message'}
				color='secondary'
				sx={{ position: 'absolute', right: 20, bottom: 20 }}
				onClick={() => router.push('/new')}
			>
				<MessageIcon color='action' />
			</Fab>
		</DefaultLayout>
	);
};
