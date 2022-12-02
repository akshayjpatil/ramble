import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useContactUser } from '../../../hooks/useUser';
import { Contact } from '../../../types/contact.type';
import { stringToColor } from '../../../util/converters';
import { OnlineBadge } from '../../atoms/OnlineBadge';

export type ContactItemProps = Contact;

const stringAvatar = (name: string, image: string | undefined) => {
	if (image)
		return {
			src: `${image}`,
		};
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split('')[0]}`,
	};
};

export const ContactItem = ({
	email,
	name,
	truncatedLastMessage: lastMessage,
}: ContactItemProps) => {
	const router = useRouter();
	const { contactUser } = useContactUser({ email });

	const handleOnContactClick = useCallback(() => {
		router.push({ pathname: `/${email}` });
	}, [router, email]);

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={handleOnContactClick}>
				<ListItemAvatar>
					<OnlineBadge online={!!contactUser?.online as boolean}>
						<Avatar {...stringAvatar(name, contactUser.profileImage)} />
					</OnlineBadge>
				</ListItemAvatar>
				<ListItemText primary={name} secondary={lastMessage} />
			</ListItemButton>
		</ListItem>
	);
};
