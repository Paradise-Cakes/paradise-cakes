import React, { useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AccountContext } from "../../../context/AccountContext";
import { confirmationCodeSchema } from "../../../schema";
import { usePostConfirmationCode } from "../../../hooks/auth/AuthHook";
import { MuiOtpInput } from "mui-one-time-password-input";
import _, { set } from "lodash";

export function matchIsNumeric(text) {
  const isNumber = typeof text === "number";
  const isString = _.isString(text);
  return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
}

const validateChar = (value, index) => {
  console.log("validateChar", value, index);
  return matchIsNumeric(value);
};

export default function ConfirmationCodeForm() {
  const { setConfirmationCodeModalOpen, setLoggedInModalOpen, email } =
    useContext(AccountContext);
  const postConfirmationCodeQuery = usePostConfirmationCode();

  const {
    mutateAsync: postConfirmationCode,
    isLoading: isPostConfirmationCodeLoading,
    error: postConfirmationCodeError,
  } = postConfirmationCodeQuery;

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
        const response = await postConfirmationCode({
          userCreds: { ...values, email: email },
        });
        setConfirmationCodeModalOpen(false);
        setLoggedInModalOpen(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box
      component="form"
      sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
      onSubmit={formik.handleSubmit}
    >
      <MuiOtpInput
        value={formik.values.confirmation_code}
        onChange={(value) => {
          formik.setFieldValue("confirmation_code", value);
        }}
        length={6}
        autoFocus
        onComplete={formik.handleSubmit}
        validateChar={validateChar}
      />
    </Box>
  );
}
