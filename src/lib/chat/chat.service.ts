import { IMsg, Message } from '../../types/contact.type';
import { connectToDb } from '../mongodb';

class ChatService {
	public async sendMessage(chatKey: string, message: IMsg) {
		const db = await connectToDb();
		return (await db
			.collection('messages')
			.insertOne({ chatKey, ...message })) as unknown as Message;
	}
}

export const chatService = new ChatService();
