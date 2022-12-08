import MessageIcon from '@mui/icons-material/Message';
import { Fab } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

import { ChatList, useChat } from '../../../hooks/useChat';
import { useSocket } from '../../../hooks/useSocket';
import { ContactList } from '../../organisms/ContactList';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export type HomeScreenProps = {
	host: string;
};

export const Home: NextPage<HomeScreenProps> = ({ host }: HomeScreenProps) => {
	const socketProps = useSocket(host);
	const router = useRouter();
	const { chatList } = useChat();

	return (
		<DefaultLayout title='Messages' home {...socketProps}>
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

export const getServerSideProps: GetServerSideProps<HomeScreenProps> = async (
	context
) => ({
	props: {
		host: context.req.headers.host || '',
	},
});
