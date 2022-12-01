import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import { USER_EMAIL_COOKIE } from '../constants/cookie.constant';
import { User } from '../types/user.type';

const getUser = async (emailId: string) =>
	await fetch('/api/users/' + emailId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());

const updateUser = async ({ email, user }: { email: string; user: User }) =>
	await fetch(`/api/users/${email}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...user, lastSeen: `${Date.now()}` } as User),
	})
		.then((res) => res.json())
		.catch((error) => {
			console.error(error);
		});

export const useUser = () => {
	const userEmail = getCookie(USER_EMAIL_COOKIE);
	const queryClient = useQueryClient();

	const userQueryKey = ['user', userEmail];

	const { data: user } = useQuery<User, Error>({
		queryKey: userQueryKey,
		queryFn: () => getUser(userEmail as string),
		initialData: {} as User,
		placeholderData: {} as User,
	});

	const mutation = useMutation<User, Error, User>({
		mutationKey: userQueryKey,
		mutationFn: (user: User) =>
			updateUser({ email: userEmail as string, user }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userQueryKey });
		},
		onError: (error) => {
			console.error('unable to update user', `${error}`);
		},
	});

	return {
		user,
		isLoading: queryClient.isFetching() || queryClient.isMutating(),
		updateUser: mutation.mutateAsync,
	};
};
