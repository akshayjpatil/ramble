import { useEffect, useMemo, useState } from 'react';
import { connect } from 'socket.io-client';

export const useSocket = (host: string) => {
	// connected flag
	const [connected, setConnected] = useState<boolean>(false);
	// connect to socket server
	const socket = useMemo(
		async () =>
			await connect(host, {
				path: '/api/socket',
			}),
		[host]
	);
	useEffect(() => {
		const connectSocket = async () => {
			// log socket connection
			const id = (await socket).id;
			(await socket).on('connect', () => {
				console.log('SOCKET CONNECTED!', id);
				setConnected(true);
			});
		};
		connectSocket();
	}, [socket]);

	return {
		socket,
		connected,
	};
};
