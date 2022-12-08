import type { IMsg } from '../../types/contact.type';
import { connectToDb } from '../mongodb';

class ChatService {
	public async sendMessage(message: IMsg) {
		const db = await connectToDb();
		return (await db
			.collection('messages')
			.insertOne({ ...message })) as unknown as IMsg;
	}
	public async getNewMessages(email: string) {
		const db = await connectToDb();
		const data = await db
			.collection('messages')
			.find({
				chatKey: new RegExp(email),
			})
			.toArray();
		return data as unknown as IMsg[];
	}

	public async deleteMessages(email: string) {
		const db = await connectToDb();
		const data = await db.collection('messages').deleteMany({
			chatKey: new RegExp(email),
		});
		return data as unknown as IMsg;
	}
}

export const chatService = new ChatService();
