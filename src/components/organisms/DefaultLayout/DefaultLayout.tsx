import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	NoSsr,
	Toolbar,
	Typography,
} from '@mui/material';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Socket } from 'socket.io-client';

import { USER_EMAIL_COOKIE } from '../../../constants/cookie.constant';
import { ChatList, useChat } from '../../../hooks/useChat';
import { useUser } from '../../../hooks/useUser';
import { IMsg } from '../../../types/contact.type';
import { User } from '../../../types/user.type';
import { isOnIOS } from '../../../util/checkers';
import { OnlineBadge } from '../../atoms/OnlineBadge';

export type DefaultLayoutProps = {
	title: string;
	titleIcon?: React.ReactNode;
	titleAdornment?: React.ReactNode;
	back?: boolean;
	home?: boolean;
	children: React.ReactNode;
	connectSocket: () => Promise<void>;
	disconnectSocket: () => Promise<void>;
	connected: boolean;
	socketId: string;
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};
export const DefaultLayout = ({
	children,
	home = false,
	back = false,
	title,
	titleIcon,
	titleAdornment,
	connectSocket,
	disconnectSocket,
	connected,
	socketId,
	socket,
}: DefaultLayoutProps) => {
	const { status, data } = useSession();
	const { user, updateUser } = useUser();
	const router = useRouter();
	const { chatList, setChatList, getChatKey } = useChat();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	// Setup the `beforeunload` event listener
	const setupBeforeUnloadListener = () => {
		const eventName = isOnIOS() ? 'pagehide' : 'beforeunload';
		window.addEventListener(eventName, async (ev) => {
			ev.preventDefault();
			await disconnectSocket();
			return await updateUser({ online: false } as User);
		});
	};

	useEffectOnce(() => {
		if (!connected) connectSocket();
		const updateLastSeen = async () => {
			await updateUser({
				online: true,
				profileImage: data?.user?.image,
				socketId,
			} as User);
		};
		socket.on('new-message', (message: IMsg) => {
			for (const [key, _value] of Object.entries(chatList as ChatList)) {
				if (message.chatKey === getChatKey(key)) {
					(chatList as ChatList)[`${key}`].messages?.push(message);
					(chatList as ChatList)[`${key}`].newMessage = true;
				} else if (message.chatKey.includes(user.email)) {
					(chatList as ChatList)[`${key}`] = {
						name: 'Unknown',
						email: message.sender,
						messages: [message],
						newMessage: true,
					};
				}
				setChatList(chatList);
			}
		});
		if (status === 'authenticated') {
			updateLastSeen();
			setupBeforeUnloadListener();
		}
	});

	useEffect(() => {
		switch (status) {
			case 'authenticated':
				setCookie(USER_EMAIL_COOKIE, data.user?.email);
				break;
			case 'unauthenticated':
				router.replace({ pathname: '/api/auth/signin' });
				break;
			default:
				break;
		}
	}, [data, router, status]);

	const handleSignOut = useCallback(() => {
		signOut();
	}, []);
	if (typeof window === 'undefined') {
		return <></>;
	}

	return (
		<NoSsr>
			<Box flexGrow={1}>
				<Container disableGutters maxWidth={false} sx={{ paddingTop: 10 }}>
					<AppBar position='fixed' sx={{ mb: 2 }}>
						<Toolbar>
							{back && (
								<IconButton color='inherit' onClick={() => router.back()}>
									<ArrowBackIcon />
								</IconButton>
							)}

							<Typography
								variant='h6'
								component={'div'}
								sx={{
									flexGrow: 1,
									display: 'flex',
									alignItems: 'center',
									'.MuiAvatar-root': {
										marginRight: 2,
									},
									'.MuiBadge-root': {
										marginLeft: 2,
									},
								}}
							>
								{titleIcon}
								{title}
								{titleAdornment}
							</Typography>

							{home && (
								<IconButton
									color='inherit'
									aria-controls={open ? 'user-menu' : undefined}
									aria-haspopup='true'
									aria-expanded={open ? 'true' : undefined}
									onClick={handleMenuClick}
								>
									<OnlineBadge online={user?.online as boolean}>
										<Avatar alt='profile image' src={`${data?.user?.image}`} />
									</OnlineBadge>
								</IconButton>
							)}
						</Toolbar>
					</AppBar>
					<Menu
						id='user-menu'
						aria-labelledby='user-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleMenuClose}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								'&:before': {
									content: '""',
									display: 'block',
									position: 'absolute',
									top: 0,
									right: 25,
									width: 10,
									height: 10,
									bgcolor: 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0,
								},
							},
						}}
					>
						<MenuItem onClick={() => router.push({ pathname: '/profile' })}>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText>{'Profile'}</ListItemText>
						</MenuItem>
						<MenuItem onClick={handleSignOut}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText>{'Sign-out'}</ListItemText>
						</MenuItem>
					</Menu>
					{children}
				</Container>
			</Box>
		</NoSsr>
	);
};
