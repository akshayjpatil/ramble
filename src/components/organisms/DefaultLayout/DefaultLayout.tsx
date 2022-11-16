import * as React from 'react';
import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type DefaultLayoutProps = {
	children: React.ReactNode;
};
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
	const { status, data } = useSession();
	const router = useRouter();

	useEffect(() => {
		console.log(data);
		if (status === 'unauthenticated')
			router.replace({ pathname: '/api/auth/signin' });
	}, [status, router]);

	return (
		<Container disableGutters maxWidth={false}>
			<Box flexGrow={1}>
				<AppBar position='static' sx={{ mb: 2 }}>
					<Toolbar>
						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							{`Messages`}
						</Typography>
						<IconButton color='inherit'>
							<Avatar alt='profile image' src={`${data?.user?.image}`} />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
			{children}
		</Container>
	);
};
