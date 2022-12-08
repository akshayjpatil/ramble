export type Contact = {
	name: string;
	email: string;
	truncatedLastMessage?: string;
	messages?: IMsg[];
	online?: boolean;
	newMessage?: boolean;
};

export type IMsg = {
	chatKey: string;
	sender: string;
	message: string;
};
