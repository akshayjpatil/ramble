import { Body, createHandler, Param, Post, Res } from 'next-api-decorators';

import { chatService } from '../../../lib/chat/chat.service';
import { userService } from '../../../lib/user/user.service';
import type { IMsg } from '../../../types/contact.type';
import type { NextApiResponseServerIO } from '../../../types/response.type';

class Chathandler {
	@Post('/:sendChatKey')
	public async emitMessageToContact(
		@Body() message: IMsg,
		@Res() res: NextApiResponseServerIO,
		@Param('sendChatKey') sendChatKey: string
	) {
		const emails = sendChatKey.split(',');
		const allOnline = await userService.checkIfUsersOnline(
			emails[0],
			emails[1]
		);
		if (allOnline) await res?.socket?.server?.io?.emit(sendChatKey, message);
		else {
			await chatService
				.sendMessage(sendChatKey, message as IMsg)
				// eslint-disable-next-line no-console
				.catch((e) => console.error(e));
		}
		return await res.status(201).json(message);
	}
}

export default createHandler(Chathandler);
