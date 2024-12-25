import React, { useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { confirmationCodeSchema } from "../../../schema";
import { usePostConfirmSignUp } from "../../../hooks/auth/AuthHook";
import { MuiOtpInput } from "mui-one-time-password-input";
import _, { set } from "lodash";
import { useAppStore } from "../../../store/useAppStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useModalStore } from "../../../store/useModalStore";

export function matchIsNumeric(text) {
  const isNumber = typeof text === "number";
  const isString = _.isString(text);
  return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
}
const validateChar = (value, index) => {
  return matchIsNumeric(value);
};

export default function ConfirmationCodeForm() {
  const { setUser } = useAppStore();
  const { email, password } = useAuthStore();
  const { closeConfirmationCodeModal, openLoggedInModal } = useModalStore();
  const postConfirmSignUpQuery = usePostConfirmSignUp();
  const theme = useTheme();

  const {
    mutateAsync: postConfirmSignUp,
    isLoading: isPostConfirmSignUpLoading,
    error: postConfirmSignUpError,
  } = postConfirmSignUpQuery;

  const formik = useFormik({
    initialValues: {
      confirmation_code: "",
    },
    validationSchema: confirmationCodeSchema,
    validate: async (values) => {
      const errors = {};

      if (!values.confirmation_code) {
        errors.confirmation_code = "confirmation code required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await postConfirmSignUp({
          userCreds: {
            confirmation_code: values.confirmation_code,
            email: email,
            password: password,
          },
        });
        closeConfirmationCodeModal();
        openLoggedInModal();
        setUser({
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          loggedIn: true,
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box
      component="form"
      sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
    >
      {isPostConfirmSignUpLoading && (
        <CircularProgress sx={{ display: "block", margin: "1rem auto" }} />
      )}
      {postConfirmSignUpError && (
        <Typography
          marginBottom={"1rem"}
          sx={{ color: theme.palette.error.main }}
          textAlign={"center"}
        >
          Something went wrong. Please try again later.
        </Typography>
      )}
      <MuiOtpInput
        value={formik.values.confirmation_code}
        onChange={(value) => {
          formik.setFieldValue("confirmation_code", value);
        }}
        length={6}
        autoFocus
        onComplete={formik.handleSubmit}
        validateChar={validateChar}
        TextFieldsProps={{
          type: "tel",
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={formik.handleSubmit}
        sx={{ marginTop: "1rem" }}
        type="submit"
      >
        Confirm
      </Button>
    </Box>
  );
}
