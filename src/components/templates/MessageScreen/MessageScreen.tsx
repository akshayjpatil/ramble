import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import { AppBar, Avatar, Box, IconButton, List } from '@mui/material';
import { getCookie } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { USER_EMAIL_COOKIE } from '../../../constants/cookie.constant';
import { ChatList, useChat } from '../../../hooks/useChat';
import { useSocket } from '../../../hooks/useSocket';
import { useContactUser } from '../../../hooks/useUser';
import { Contact, IMsg } from '../../../types/contact.type';
import { stringAvatar } from '../../../util/imageProcessors';
import { OnlineBadge } from '../../atoms/OnlineBadge';
import { TextField } from '../../atoms/TextField';
import { Message } from '../../molecules/Message';
import { DefaultLayout } from '../../organisms/DefaultLayout';

type MessageScreenProps = { host: string; email: string };

const validationSchema = Yup.object().shape({
	message: Yup.string().required('Did you forget to type?'),
});

type FormData = {
	message: string;
};

export const MessageScreen: NextPage<MessageScreenProps> = ({
	host,
	email,
}: MessageScreenProps) => {
	const { contactUser } = useContactUser({ email });
	const { socket, socketId, connected, disconnectSocket } = useSocket(host);
	const userEmail = getCookie(USER_EMAIL_COOKIE);
	const { chatList, setChatList, getChatKey } = useChat();
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(validationSchema),
		reValidateMode: 'onBlur',
	});
	const contactList = useMemo(
		() => (chatList as ChatList)[`${email}`] as Contact,
		[chatList, email]
	);
	const avatarProps = stringAvatar(contactUser.name, contactUser.profileImage);

	useEffect((): any => {
		// update chat on new message dispatched
		socket.on(getChatKey(email), (message: IMsg) => {
			(chatList as ChatList)[`${email}`].messages?.push(message);
			setChatList(chatList);
		});
	}, [chatList, email, getChatKey, host, setChatList, socket]);

	const sendMessage = useCallback(async () => {
		await handleSubmit(async (data) => {
			if (data.message) {
				// build message obj
				const message: IMsg = {
					sender: userEmail as string,
					message: data.message as string,
				};

				// dispatch message to other users
				await fetch(`/api/chat/${getChatKey(email)}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(message),
				}).then(() => {
					contactList.messages?.push(message);
					contactList.truncatedLastMessage = data.message;
					(chatList as ChatList)[`${email}`] = contactList;
					setChatList(chatList as ChatList);
				});
				reset();
			}
		})();
	}, [
		chatList,
		contactList,
		email,
		getChatKey,
		handleSubmit,
		reset,
		setChatList,
		userEmail,
	]);

	return (
		<DefaultLayout
			back
			title={contactList?.name || contactUser.name}
			titleIcon={<Avatar component={'span'} {...avatarProps} />}
			titleAdornment={<OnlineBadge online={contactUser?.online as boolean} />}
			disconnectSocket={disconnectSocket}
			socketId={socketId}
		>
			<List sx={{ width: '100%', bgcolor: 'background.paper', mb: 10 }}>
				{contactList?.messages &&
					(contactList?.messages as IMsg[]).map((chat: IMsg, index: number) => (
						<Message
							key={index}
							message={chat.message}
							opponent={chat.sender !== userEmail}
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
		email: (context.params?.email as string) || '',
	},
});
