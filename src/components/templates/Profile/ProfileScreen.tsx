import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { Avatar, Button, Stack } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useUser } from '../../../hooks/useUser';
import { DefaultLayout } from '../../organisms/DefaultLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '../../atoms/TextField';
import { User } from '../../../types/user.type';

export type ProfileScreenProps = {};

const validationSchema = Yup.object().shape({
	name: Yup.string().required('What should your friends call you?'),
});

type FormData = {
	name: string;
	email: string;
};

export const ProfileScreen = (props: ProfileScreenProps) => {
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
		<DefaultLayout back title={'Profile'}>
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
					Save
				</Button>
			</Stack>
		</DefaultLayout>
	);
};
