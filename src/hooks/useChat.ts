import { getCookie } from 'cookies-next';
import { useCallback } from 'react';
import { useLocalStorage } from 'react-use';

import { USER_EMAIL_COOKIE } from '../constants/cookie.constant';
import { Contact, IMsg } from '../types/contact.type';

export type ChatProps = { message: IMsg; toEmail: string };
export type ChatList = Record<string, Contact>;

export const useChat = () => {
	const userEmail = getCookie(USER_EMAIL_COOKIE);
	const [chatList, setChatList] = useLocalStorage<ChatList>(
		'chatList',
		{} as ChatList
	);

	return {
		chatList,
		setChatList,
		getChatKey: useCallback(
			(toEmail: string) => [userEmail, toEmail].sort().join(),
			[userEmail]
		),
	};
};
