import { ListItem, ListItemText } from '@mui/material';

import theme from '../../../theme';

export type MessageProps = {
	message: string;
	opponent?: boolean;
};
export const Message = ({ message, opponent = false }: MessageProps) => {
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
			<ListItemText
				secondary={message}
				sx={{
					'.MuiListItemText-secondary': {
						...theme.typography.body1,
						color: theme.palette.common.white,
						backgroundColor: opponent ? theme.palette.grey[500] : '#2385FB',
						padding: 1,
						borderRadius: 2,
						display: 'inline-block',
					},
				}}
			/>
		</ListItem>
	);
};
