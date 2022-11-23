import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import theme from '../../../theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export type MessageProps = {
	username: string;
	message: string;
	opponent?: boolean;
};
export const Message = ({
	username,
	message,
	opponent = false,
}: MessageProps) => {
	return (
		<ListItem
			sx={{
				flexDirection: opponent ? 'row' : 'row-reverse',
				'.MuiListItemText-root': {
					textAlign: opponent ? 'start' : 'right',
					padding: opponent ? '0px 0px 0px 16px' : '0px 16px 0px 0px',
				},
				'.MuiListItemAvatar-root': {
					minWidth: '0px',
				},
			}}
		>
			<ListItemAvatar>
				<Avatar>
					<AccountCircleIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={username}
				secondary={message}
				sx={{
					'.MuiListItemText-primary': {
						...theme.typography.caption,
						color: theme.palette.grey[500],
					},
					'.MuiListItemText-secondary': {
						...theme.typography.body1,
						color: theme.palette.grey[900],
					},
				}}
			/>
		</ListItem>
	);
};
