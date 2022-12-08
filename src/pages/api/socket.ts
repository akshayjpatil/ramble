import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { chatService } from '../../lib/chat/chat.service';
import { connectToDb } from '../../lib/mongodb';
import { IMsg } from '../../types/contact.type';
import { NextApiResponseServerIO } from '../../types/response.type';
import { User } from '../../types/user.type';

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = async (_req: NextApiRequest, res: NextApiResponseServerIO) => {
	let io: ServerIO<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
	if (!res.socket.server.io) {
		console.log('New Socket.io server...');
		// adapt Next's net Server to http Server
		const httpServer: NetServer = res.socket.server as any;
		io = new ServerIO(httpServer, {
			path: '/api/socket',
		});
		// append SocketIO server to Next.js socket server response
		res.socket.server.io = io;
	}
	const db = connectToDb();
	const changeStream = (await db)
		.collection('users')
		.watch([], { fullDocument: 'updateLookup' });
	changeStream.on('change', async (next) => {
		// process any change event
		switch (next.operationType) {
			case 'insert':
				// console.log('inserted fields:', next.fullDocument.message);
				// io.emit('new Message');
				break;
			case 'update':
				const updatedTuple: User = next.fullDocument as User;
				if (updatedTuple.online) {
					const newMessages: IMsg[] = await chatService.getNewMessages(
						updatedTuple.email
					);
					newMessages.map(async (message: IMsg) => {
						await res?.socket?.server?.io?.emit('new-message', message);
					});
					await chatService.deleteMessages(updatedTuple.email);
				}
				break;
		}
	});

	res.end();
};

export default handler;
