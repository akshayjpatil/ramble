import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { User } from '../types/user.type';

export const useUser = () => {
	const router = useRouter();
	const updateUserLastSeen = useCallback(
		async (email: string): Promise<void> => {
			await fetch(`/api/users/${email}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ lastSeen: `${Date.now()}` }),
			})
				.then((res) => {
					const resp = res.json() as unknown as User;
					if (!resp.name) {
						router.replace({ pathname: '/profile' });
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},
		[router]
	);

	const updateUser = useCallback(async (user: User): Promise<void> => {
		await fetch(`/api/users/${user.email}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...user, lastSeen: `${Date.now()}` } as User),
		})
			.then((res) => console.log(res))
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return {
		updateUserLastSeen,
		updateUser,
	};
};
