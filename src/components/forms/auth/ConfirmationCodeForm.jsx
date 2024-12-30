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
import {
  usePostConfirmSignUp,
  usePostSignIn,
} from "../../../hooks/auth/AuthHook";
import { MuiOtpInput } from "mui-one-time-password-input";
import _, { set } from "lodash";
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
  const { email, password } = useAuthStore();
  const { closeConfirmationCodeModal, openLoggedInModal } = useModalStore();
  const postConfirmSignUpQuery = usePostConfirmSignUp();
  const postSignInQuery = usePostSignIn();
  const theme = useTheme();

  const {
    mutateAsync: postConfirmSignUp,
    isLoading: isPostConfirmSignUpLoading,
    error: postConfirmSignUpError,
  } = postConfirmSignUpQuery;

  const {
    mutateAsync: postSignIn,
    isLoading: isPostSignInLoading,
    error: postSignInError,
  } = postSignInQuery;

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
        await postConfirmSignUp({
          confirmationCode: values.confirmation_code,
          username: email,
          password: password,
        });
        await postSignIn({
          username: email,
          password: password,
        });
        closeConfirmationCodeModal();
        openLoggedInModal();
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
