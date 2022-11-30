import { useCallback, useState, MouseEvent, useEffect } from 'react';
import { useEffectOnce } from 'usehooks-ts';
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
	Toolbar,
	Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUser } from '../../../hooks/useUser';
import { setCookie } from 'cookies-next';
import { USER_EMAIL_COOKIE } from '../../../constants/cookie.constant';
import { User } from '../../../types/user.type';

export type DefaultLayoutProps = {
	title: string;
	back?: boolean;
	home?: boolean;
	children: React.ReactNode;
};
export const DefaultLayout = ({
	children,
	home = false,
	back = false,
	title,
}: DefaultLayoutProps) => {
	const { status, data } = useSession();
	const { user, updateUser } = useUser();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	useEffectOnce(() => {
		const updateLastSeen = async () => {
			await updateUser({} as User);
		};
		if (status === 'authenticated') updateLastSeen();
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

	return (
		<Container disableGutters maxWidth={false}>
			<Box flexGrow={1}>
				<AppBar position='static' sx={{ mb: 2 }}>
					<Toolbar>
						{back && (
							<IconButton color='inherit' onClick={() => router.back()}>
								<ArrowBackIcon />
							</IconButton>
						)}
						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							{title}
						</Typography>
						{home && (
							<IconButton
								color='inherit'
								aria-controls={open ? 'user-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								onClick={handleMenuClick}
							>
								<Avatar alt='profile image' src={`${data?.user?.image}`} />
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
						<ListItemText>Profile</ListItemText>
					</MenuItem>
					<MenuItem onClick={handleSignOut}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText>Sign-out</ListItemText>
					</MenuItem>
				</Menu>
			</Box>
			{children}
		</Container>
	);
};
