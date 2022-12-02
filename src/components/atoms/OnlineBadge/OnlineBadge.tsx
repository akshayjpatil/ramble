import { Badge, BadgeProps, styled } from '@mui/material';

export type OnlineBadgeProps = BadgeProps & { online: boolean };

export const OnlineBadge = ({ children, online }: OnlineBadgeProps) => {
	const StyledBadge = styled(Badge)(({ theme }) => ({
		'& .MuiBadge-badge': {
			opacity: 100,
			backgroundColor: online ? '#44b700' : '#BEBEBE',
			color: online ? '#44b700' : '#BEBEBE',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: 'ripple 1s infinite ease-in-out',
				border: '0.5px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}));

	return (
		<StyledBadge
			overlap='circular'
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			variant='dot'
		>
			{children}
		</StyledBadge>
	);
};
