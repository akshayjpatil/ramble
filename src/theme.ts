import { createTheme } from '@mui/material/styles';
import { Roboto } from '@next/font/google';

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const themeOptions = {
	palette: {
		type: 'light',
		primary: {
			main: '#252f69',
		},
		secondary: {
			main: '#ffd812',
		},
	},
	overrides: {
		MuiButton: {
			root: {
				background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
				border: 0,
				borderRadius: 3,
				boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
				color: 'white',
				height: 48,
				padding: '0 30px',
			},
		},
		MuiSwitch: {
			root: {
				width: 42,
				height: 26,
				padding: 0,
				margin: 8,
			},
			switchBase: {
				padding: 1,
				'&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
					transform: 'translateX(16px)',
					color: '#fff',
					'& + $track': {
						opacity: 1,
						border: 'none',
					},
				},
			},
			thumb: {
				width: 24,
				height: 24,
			},
			track: {
				borderRadius: 13,
				border: '1px solid #bdbdbd',
				backgroundColor: '#fafafa',
				opacity: 1,
				transition:
					'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
			},
		},
	},
	spacing: 8,
	shape: {
		borderRadius: 4,
	},
	props: {
		MuiTooltip: {
			arrow: true,
		},
		MuiButtonBase: {
			disableRipple: true,
		},
	},
};

const theme = createTheme(themeOptions);

export default theme;
