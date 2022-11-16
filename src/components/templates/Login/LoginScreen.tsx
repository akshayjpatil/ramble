import { Button, Container, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "../../atoms/TextField";
import { useState } from "react";

export type LoginScreenProps = {};

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(new RegExp("[0-9]{7}"), "Please enter a valid phone number"),
  password: Yup.string().required("Password is a required field"),
});

export const LoginScreen = (props: LoginScreenProps) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onBlur",
  });
  const [spinning, toggleSpinning] = useState(false);

  const handleLoginClick = handleSubmit((data: any) => {
    toggleSpinning(!spinning);
    // Todo: Add login action here
    console.log("clicked on login", data);
    router.replace({ pathname: "/" });
    toggleSpinning(!spinning);
  });

  return (
    <Container maxWidth={false} disableGutters sx={{ py: 20 }}>
      <form>
        <Stack spacing={3} padding={3}>
          <TextField
            name={`phoneNumber`}
            label={`Phone number`}
            type={"number"}
            control={control}
            error={!!errors.phoneNumber}
            errorText={errors.phoneNumber?.message as string}
          />
          <TextField
            name={`password`}
            label={`Password`}
            type={"password"}
            control={control}
            error={!!errors.password}
            errorText={errors.password?.message as string}
          />
          <Button variant={"text"}>{`Forgot password?`}</Button>
          <LoadingButton
            loading={spinning}
            onClick={handleLoginClick}
            variant={"contained"}
          >{`Login`}</LoadingButton>
        </Stack>
      </form>
    </Container>
  );
};
