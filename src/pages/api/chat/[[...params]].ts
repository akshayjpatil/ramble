import { Body, createHandler, Param, Post, Res } from 'next-api-decorators';

import type { NextApiResponseServerIO } from '../../../types/response.type';

class Chathandler {
	@Post('/:sendChatKey')
	public async emitMessageToContact(
		@Body() message: any,
		@Res() res: NextApiResponseServerIO,
		@Param('sendChatKey') sendChatKey: string
	) {
		await res?.socket?.server?.io?.emit(sendChatKey, message);
		// // update user contacts
		// const userEmail = getSenderEmail(sendChatKey);
		// const user = await userService.getUser(userEmail);
		// await userService.updateUser(userEmail, {
		// 	...user,
		// 	contacts: [user?.contacts, {name: ''}],
		// });
		// return message
		return await res.status(201).json(message);
	}
}

export default createHandler(Chathandler);
