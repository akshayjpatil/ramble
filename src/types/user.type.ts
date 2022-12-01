import { ObjectId } from 'mongodb';

import { Contact } from './contact.type';

export type User = {
	_id?: ObjectId;
	name: string;
	email: string;
	status?: string;
	lastSeen?: string;
	contacts: Contact[];
};
