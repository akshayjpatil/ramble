import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import { AppBar, Box, IconButton, List, Stack } from '@mui/material';
import { getCookie } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { USER_EMAIL_COOKIE } from '../../../constants/cookie.constant';
import { ChatList, useChat } from '../../../hooks/useChat';
import { useSocket } from '../../../hooks/useSocket';
import { TextField } from '../../atoms/TextField';
import { DefaultLayout } from '../../organisms/DefaultLayout';

interface IMsg {
	email: string;
	message: string;
}

type NewMessageScreenProps = { host: string };

const validationSchema = Yup.object().shape({
	name: Yup.string().required(`Who's your new friend?`),
	email: Yup.string().required('Who would you like to message?'),
	message: Yup.string().required('Did you forget to type?'),
});

export const NewMessageScreen: NextPage<NewMessageScreenProps> = ({
	host,
}: NewMessageScreenProps) => {
	const router = useRouter();
	const userEmail = getCookie(USER_EMAIL_COOKIE);
	const { connected, disconnectSocket } = useSocket(host);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IMsg & { name: string }>({
		resolver: yupResolver(validationSchema),
		reValidateMode: 'onBlur',
	});

	const { chatList, setChatList, getChatKey } = useChat();

	const sendMessage = useCallback(async () => {
		await handleSubmit(async (data) => {
			// build message obj
			const message: IMsg = {
				email: userEmail as string,
				message: data.message as string,
			};
			// dispatch message to other users
			await fetch(`/api/chat/${getChatKey(data.email)}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(message),
			}).then(() => {
				(chatList as ChatList)[`${data.email}`] = {
					name: data.name,
					email: data.email,
					truncatedLastMessage: data.message,
					messages: [
						{ sender: userEmail as string, message: data.message as string },
					],
				};

				return setChatList(chatList as ChatList);
			});

			return router.back();
		})();
	}, [chatList, getChatKey, handleSubmit, router, setChatList, userEmail]);

	return (
		<DefaultLayout
			back
			title={'New Message'}
			disconnectSocket={disconnectSocket}
		>
			<Stack component={'form'} spacing={1} px={2}>
				<TextField
					placeholder='Name?'
					sx={{ width: '100%' }}
					control={control}
					label={'Name'}
					name={'name'}
					error={!!errors.name}
					errorText={errors.name?.message as string}
				/>
				<TextField
					placeholder='Email?'
					sx={{ width: '100%' }}
					control={control}
					label={'Email'}
					name={'email'}
					error={!!errors.email}
					errorText={errors.email?.message as string}
				/>
				<List sx={{ width: '100%', bgcolor: 'background.paper' }} />
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
					<Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
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
			</Stack>
		</DefaultLayout>
	);
};

export const getServerSideProps: GetServerSideProps<
	NewMessageScreenProps
> = async (context) => ({
	props: {
		host: context.req.headers.host || '',
	},
});
