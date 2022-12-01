export type Contact = {
	name: string;
	email: string;
	truncatedLastMessage?: string;
	messages?: IMsg[];
};

export type IMsg = {
	email: string;
	message: string;
};
