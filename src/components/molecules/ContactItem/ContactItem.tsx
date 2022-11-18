import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Contact } from '../../../types/main.types';
import { stringToColor } from '../../../util/converters';

export type ContactItemProps = Contact;

const stringAvatar = (name: string) => {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split('')[0]}`,
	};
};

export const ContactItem = ({
	name,
	truncatedLastMessage: lastMessage,
}: ContactItemProps) => {
	const router = useRouter();

	const handleOnContactClick = useCallback(() => {
		router.push({ pathname: '/message' });
	}, [router]);

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={handleOnContactClick}>
				<ListItemAvatar>
					<Avatar {...stringAvatar(name)} />
				</ListItemAvatar>
				<ListItemText primary={name} secondary={lastMessage} />
			</ListItemButton>
		</ListItem>
	);
};
