import { List } from '@mui/material';

import { ChatList } from '../../../hooks/useChat';
import { ContactItem, ContactItemProps } from '../../molecules/ContactItem';

export type ContactListProps = {
	chatList: ChatList;
};

const buildChatList = (chatList: ChatList) => {
	const nodes: React.ReactNode[] = [];
	for (const [key, value] of Object.entries(chatList)) {
		nodes.push(<ContactItem key={key} {...(value as ContactItemProps)} />);
	}
	return nodes;
};

export const ContactList = ({ chatList }: ContactListProps) => {
	return (
		<List sx={{ width: '100%', bgcolor: 'background.paper' }} disablePadding>
			{buildChatList(chatList)}
		</List>
	);
};
