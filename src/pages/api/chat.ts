import { Body, createHandler, Post, Res } from 'next-api-decorators';

import type { NextApiResponseServerIO } from '../../types/response.type';

class Chathandler {
	@Post('/')
	async emitMessage(@Body() message: any, @Res() res: NextApiResponseServerIO) {
		await res?.socket?.server?.io?.emit('message', message);

		// return message
		return await res.status(201).json(message);
	}
}

export default createHandler(Chathandler);
