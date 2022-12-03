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
import { stringAvatar } from '../../../util/imageProcessors';
import { OnlineBadge } from '../../atoms/OnlineBadge';

export type ContactItemProps = Contact;

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

	const avatarProps = stringAvatar(name, contactUser.profileImage);

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={handleOnContactClick}>
				<ListItemAvatar>
					<OnlineBadge online={!!contactUser?.online as boolean}>
						<Avatar {...avatarProps} />
					</OnlineBadge>
				</ListItemAvatar>
				<ListItemText primary={name} secondary={lastMessage} />
			</ListItemButton>
		</ListItem>
	);
};
