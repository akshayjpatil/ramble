import { stringToColor } from './converters';

export const stringAvatar = (name: string, image: string | undefined) => {
	if (image)
		return {
			src: `${image}`,
		};
	return {
		sx: {
			bgcolor: stringToColor(name || ''),
		},
		children: `${name?.split('')[0]}`,
	};
};
