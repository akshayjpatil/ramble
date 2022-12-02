export type Contact = {
	name: string;
	email: string;
	truncatedLastMessage?: string;
	messages?: IMsg[];
	online?: boolean;
};

export type IMsg = {
	sender: string;
	message: string;
};

export type Message = IMsg & { chatKey: string };
