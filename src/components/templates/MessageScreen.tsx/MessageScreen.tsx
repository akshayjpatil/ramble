import { useCallback, useEffect, useState } from 'react';
import { connect } from 'socket.io-client';
import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { DefaultLayout } from '../../organisms/DefaultLayout';
import { GetServerSideProps, NextPage } from 'next';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '../../atoms/TextField';
import { Message } from '../../molecules/Message';

interface IMsg {
	userId: string;
	msg: string;
}

type MessageScreenProps = { host: string; userId: string };

const validationSchema = Yup.object().shape({
	message: Yup.string().required('Did you forget to type?'),
});

export const MessageScreen: NextPage<MessageScreenProps> = ({
	host,
	userId,
}: MessageScreenProps) => {
	// connected flag
	const [connected, setConnected] = useState<boolean>(false);
	// init chat and message
	const [chat, setChat] = useState<IMsg[]>([]);
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
		reValidateMode: 'onBlur',
	});

	useEffect((): any => {
		// connect to socket server
		const socket = connect(host, {
			path: '/api/socket',
		});

		// log socket connection
		socket.on('connect', () => {
			console.log('SOCKET CONNECTED!', socket.id);
			setConnected(true);
		});

		// update chat on new message dispatched
		socket.on('message', (message: IMsg) => {
			chat.push(message);
			setChat([...chat]);
		});
		reset();
		// socket disconnet onUnmount if exists
		if (socket) return () => socket.disconnect();
	}, [chat, host, reset]);

	const sendMessage = useCallback(async () => {
		await handleSubmit(async (data) => {
			if (data.message) {
				// build message obj
				const message: IMsg = {
					userId,
					msg: data.message as string,
				};

				// dispatch message to other users
				const resp = await fetch('/api/chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(message),
				});
			}
		})();
	}, [handleSubmit, userId]);

	return (
		<DefaultLayout back title={userId}>
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				{chat.map((chat: IMsg, index: number) => (
					<Message
						key={index}
						username={chat.userId}
						message={chat.msg}
						opponent={chat.userId !== userId}
					/>
				))}
			</List>
			<AppBar
				component={'div'}
				position='fixed'
				color='default'
				sx={{
					top: 'auto',
					bottom: 0,
				}}
			>
				{' '}
				<Box
					component={'form'}
					sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
				>
					<TextField
						placeholder='message'
						multiline
						sx={{
							flexGrow: 1,
							'.MuiOutlinedInput-notchedOutline': {
								border: 'none',
							},
						}}
						control={control}
						label={''}
						name={'message'}
						error={!!errors.message}
						errorText={errors.message?.message as string}
					/>
					<IconButton
						color='inherit'
						onClick={sendMessage}
						disabled={!connected}
						sx={{ px: 2 }}
					>
						<SendIcon />
					</IconButton>
				</Box>
			</AppBar>
		</DefaultLayout>
	);
};

export const getServerSideProps: GetServerSideProps<
	MessageScreenProps
> = async (context) => ({
	props: {
		host: context.req.headers.host || '',
		userId: (context.params?.userId as string) || '',
	},
});
