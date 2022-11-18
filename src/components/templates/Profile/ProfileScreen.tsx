import { Avatar, Stack, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export type ProfileScreenProps = {};

export const ProfileScreen = (props: ProfileScreenProps) => {
	const { data } = useSession();
	return (
		<DefaultLayout back title={'Profile'}>
			<Stack alignItems={'center'}>
				<Avatar
					alt='profile image'
					src={`${data?.user?.image}`}
					sx={{ width: 150, height: 150 }}
				/>
			</Stack>
			<Typography variant='h3' textAlign={'center'}>
				{data?.user?.name}
			</Typography>
			<Typography variant='subtitle1' textAlign={'center'}>
				{data?.user?.email}
			</Typography>
		</DefaultLayout>
	);
};
