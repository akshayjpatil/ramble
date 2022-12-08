import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Stack } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSocket } from '../../../hooks/useSocket';
import { useUser } from '../../../hooks/useUser';
import { User } from '../../../types/user.type';
import { TextField } from '../../atoms/TextField';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export type ProfileScreenProps = { host: string };

const validationSchema = Yup.object().shape({
	name: Yup.string().required('What should your friends call you?'),
});

type FormData = {
	name: string;
	email: string;
};

export const ProfileScreen: NextPage<ProfileScreenProps> = ({
	host,
}: ProfileScreenProps) => {
	const { socketId, disconnectSocket } = useSocket(host);
	const { data } = useSession();
	const { user, updateUser } = useUser();
	const {
		reset,
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<FormData>({
		resolver: yupResolver(validationSchema),
		reValidateMode: 'onBlur',
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
	});

	useEffect(() => {
		reset(user);
	}, [reset, user]);

	const submit = useCallback(async () => {
		await handleSubmit(async (data) => {
			if (data) {
				await updateUser({ name: data.name } as User);
			}
		})();
	}, [handleSubmit, updateUser]);

	return (
		<DefaultLayout
			back
			title={'Profile'}
			disconnectSocket={disconnectSocket}
			socketId={socketId}
		>
			<Stack component={'form'} alignItems={'center'} spacing={2} px={2}>
				<Avatar
					alt='profile image'
					src={`${data?.user?.image}`}
					sx={{ width: 150, height: 150 }}
				/>
				<TextField
					name={'name'}
					label={'Name'}
					control={control}
					sx={{ width: '100%' }}
					error={!!errors.name}
					errorText={errors.name?.message as string}
				/>
				<TextField
					name={'email'}
					control={control}
					label={'Email'}
					sx={{ width: '100%' }}
					error={!!errors.email}
					errorText={errors.email?.message as string}
					disabled
				/>
				<Button variant='contained' onClick={submit} disabled={!isDirty}>
					{'Save'}
				</Button>
			</Stack>
		</DefaultLayout>
	);
};

export const getServerSideProps: GetServerSideProps<
	ProfileScreenProps
> = async (context) => ({
	props: {
		host: context.req.headers.host || '',
	},
});
