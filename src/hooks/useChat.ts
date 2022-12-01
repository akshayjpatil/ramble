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
		sendChatKey: useCallback(
			(toEmail: string) => `${userEmail}-TO-${toEmail}`,
			[userEmail]
		),
		recieveChatKey: useCallback(
			(toEmail: string) => `${toEmail}-To-${userEmail}`,
			[userEmail]
		),
	};
};

export const getSenderEmail = (key: string) => {
	return key.split('-')[0];
};

export const getRecieverEmail = (key: string) => {
	return key.split('-')[2];
};
