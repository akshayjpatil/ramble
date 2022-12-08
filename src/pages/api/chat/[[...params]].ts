import { Body, createHandler, Post, Res } from 'next-api-decorators';

import { chatService } from '../../../lib/chat/chat.service';
import { userService } from '../../../lib/user/user.service';
import type { IMsg } from '../../../types/contact.type';
import type { NextApiResponseServerIO } from '../../../types/response.type';

class Chathandler {
	@Post('/')
	public async emitMessageToContact(
		@Body() message: IMsg,
		@Res() res: NextApiResponseServerIO
	) {
		const emails = message.chatKey.split(',');
		const allOnline = await userService.checkIfUsersOnline(
			emails[0],
			emails[1]
		);
		if (allOnline) {
			const response = await res?.socket?.server?.io?.emit(
				'new-message',
				message
			);
			console.log(message, response);
		} else {
			await chatService
				.sendMessage(message as IMsg)
				// eslint-disable-next-line no-console
				.catch((e) => console.error(e));
		}
		return await res.status(201).json(message);
	}
}

export default createHandler(Chathandler);
