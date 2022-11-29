import { HttpException } from 'next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next/types';
import type { User } from '../../types/user.type';
import { connectToDb } from '../mongodb';

const USER_ALREADY_FOUND_ERROR_STATUS = 409;
const USER_NOT_FOUND_ERROR_STATUS = 404;

export class UserAlreadyFoundException extends HttpException {
	public constructor({
		message = 'User already exists',
	}: { message?: string | undefined } = {}) {
		super(USER_ALREADY_FOUND_ERROR_STATUS, message);
	}
}
export class UserNotFoundException extends HttpException {
	public constructor({
		message = 'User Not Found',
	}: { message?: string | undefined } = {}) {
		super(USER_NOT_FOUND_ERROR_STATUS, message);
	}
}

export const UserErrorHandler = (
	error: UserAlreadyFoundException | UserNotFoundException,
	req: NextApiRequest,
	res: NextApiResponse
) => {
	switch (error.statusCode) {
		case USER_ALREADY_FOUND_ERROR_STATUS:
			res
				.status(USER_ALREADY_FOUND_ERROR_STATUS)
				.json({ message: error.message });
		case USER_NOT_FOUND_ERROR_STATUS:
			res.status(USER_NOT_FOUND_ERROR_STATUS).json({ message: error.message });
	}
};

class UserService {
	async getUser(email: string): Promise<User> {
		const db = await connectToDb();
		return (await db.collection('users').findOne({ email })) as unknown as User;
	}
	async addUser(user: User): Promise<User | undefined> {
		const db = await connectToDb();
		const data = await db.collection('users').findOne({ email: user.email });
		if (data) throw new UserAlreadyFoundException();
		if (!!user)
			return (await db.collection('users').insertOne(user)) as unknown as User;
	}
	async updateUser(email: string, user: User): Promise<User | undefined> {
		const db = await connectToDb();
		if (!!user)
			return (await db
				.collection('users')
				.findOneAndUpdate(
					{ email: email },
					{ $set: user },
					{ upsert: true }
				)) as unknown as User;
	}
}

export const userService = new UserService();
