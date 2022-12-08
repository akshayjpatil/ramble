import type { IMsg, Message } from '../../types/contact.type';
import { connectToDb } from '../mongodb';

class ChatService {
	public async sendMessage(message: IMsg) {
		const db = await connectToDb();
		return (await db
			.collection('messages')
			.insertOne({ ...message })) as unknown as Message;
	}
	public async getNewMessages(email: string) {
		const db = await connectToDb();
		return (await db
			.collection('messages')
			.find({ chatKey: `/${email}/i` })) as unknown as Message[];
	}
}

export const chatService = new ChatService();
