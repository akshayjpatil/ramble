import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types/response.type';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = async (_req: NextApiRequest, res: NextApiResponseServerIO) => {
	if (!res.socket.server.io) {
		console.log('New Socket.io server...');
		// adapt Next's net Server to http Server
		const httpServer: NetServer = res.socket.server as any;
		const io = new ServerIO(httpServer, {
			path: '/api/socket',
		});
		// append SocketIO server to Next.js socket server response
		res.socket.server.io = io;
	}
	res.end();
};

export default handler;