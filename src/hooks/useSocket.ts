import { useCallback, useMemo } from 'react';
import { useCookie } from 'react-use';
import { connect } from 'socket.io-client';

export const useSocket = (host: string) => {
	// connected flag
	const [sock, setSocket, _deleteSocket] = useCookie('SOCKET');
	// connect to socket server
	const socket = connect(host, {
		path: '/api/socket',
	});

	const connectSocket = useCallback(async () => {
		// log socket connection
		await socket.on('connect', () => {
			console.log('SOCKET CONNECTED!', socket.id);
			setSocket(JSON.stringify({ connected: true, socketId: socket.id }));
		});
	}, [setSocket, socket]);

	const disconnectSocket = useCallback(async () => {
		socket.disconnect();
	}, [socket]);

	return useMemo(
		() => ({
			socket,
			socketId: `${JSON.parse(`${sock}`)?.socketId}`,
			connected: !!JSON.parse(`${sock}`)?.connected,
			connectSocket,
			disconnectSocket,
		}),
		[connectSocket, disconnectSocket, sock, socket]
	);
};
