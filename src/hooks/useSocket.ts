import { useCallback, useEffect, useState } from 'react';
import { connect } from 'socket.io-client';

export const useSocket = (host: string) => {
	// connected flag
	const [connected, setConnected] = useState<boolean>(false);
	// connect to socket server
	const socket = connect(host, {
		path: '/api/socket',
	});
	useEffect(() => {
		const connectSocket = async () => {
			// log socket connection
			const id = socket.id;
			socket.on('connect', () => {
				console.log('SOCKET CONNECTED!', id);
				setConnected(true);
			});
		};
		connectSocket();
	}, [socket]);

	const disconnectSocket = useCallback(async () => {
		socket.disconnect();
	}, [socket]);

	return {
		socket,
		connected,
		disconnectSocket,
	};
};
