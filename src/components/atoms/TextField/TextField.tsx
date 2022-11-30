import {
	TextFieldProps as MuiTextFieldProps,
	TextField as MuiTextField,
	Typography,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type TextFieldProps = Omit<MuiTextFieldProps, 'variant'> & {
	name: string;
	control: Control<any, any>;
	label: string;
	errorText?: string | undefined;
	multiline?: boolean;
};

export const TextField = ({
	name,
	control,
	label,
	errorText,
	multiline = false,
	...textFieldProps
}: TextFieldProps) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field: { onChange, value } }) => (
				<>
					<MuiTextField
						onChange={onChange}
						value={value}
						label={label}
						variant={'outlined'}
						multiline={multiline}
						helperText={errorText}
						{...textFieldProps}
					/>
				</>
			)}
		/>
	);
};
