import { ObjectId } from 'mongodb';

import { Contact } from './contact.type';

export type User = {
	_id?: ObjectId;
	name: string;
	profileImage?: string;
	email: string;
	status?: string;
	lastSeen?: string;
	contacts: Contact[];
	online?: boolean;
	socketId?: string;
};
