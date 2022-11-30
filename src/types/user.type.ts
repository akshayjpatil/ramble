import { ObjectId } from 'mongodb';

export type User = {
	_id?: ObjectId;
	name: string;
	email: string;
	status?: string;
	lastSeen?: string;
};
