import { useCallback, useState } from 'react';
import { connect } from 'socket.io-client';

export const useSocket = (host: string) => {
	// connected flag
	const [connected, setConnected] = useState<boolean>(false);
	const [socketId, setsocketId] = useState<string>('');
	// connect to socket server
	const socket = connect(host, {
		path: '/api/socket',
	});

	const connectSocket = async () => {
		// log socket connection
		socket.on('connect', async () => {
			console.log('SOCKET CONNECTED!', socket.id);
			setConnected(true);
			setsocketId(socket.id);
		});
	};

	const disconnectSocket = useCallback(async () => {
		await (await socket).disconnect();
	}, [socket]);

	return {
		socket,
		socketId,
		connected,
		connectSocket,
		disconnectSocket,
	};
};
