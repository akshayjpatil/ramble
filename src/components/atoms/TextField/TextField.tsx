import {
  TextFieldProps as MuiTextFieldProps,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

export type TextFieldProps = Omit<MuiTextFieldProps, "variant"> & {
  name: string;
  control: Control<FieldValues, any>;
  label: string;
  errorText?: string | undefined;
};

export const TextField = ({
  name,
  control,
  label,
  errorText,
  ...textFieldProps
}: TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field: { onChange, value } }) => (
        <>
          <MuiTextField
            onChange={onChange}
            value={value}
            label={label}
            variant={"outlined"}
            helperText={errorText}
            {...textFieldProps}
          />
        </>
      )}
    />
  );
};
