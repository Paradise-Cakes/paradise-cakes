import React, { useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AccountContext } from "../../../context/AccountContext";
import { confirmationCodeSchema } from "../../../schema";
import { usePostConfirmationCode } from "../../../hooks/auth/AuthHook";

export default function ConfirmationCodeForm() {
  const { setConfirmationCodeModalOpen, email } = useContext(AccountContext);
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
      <TextField
        fullWidth
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 }}
        label="Verification Code"
        sx={{
          margin: "1rem 0",
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.5rem",

            "& fieldset": {
              border: "2px solid black",
            },
            "&.Mui-focused fieldset": {
              border: "2px solid black",
            },
          },
        }}
        value={formik.values.confirmation_code}
        onChange={(e) =>
          formik.setFieldValue("confirmation_code", e.target.value)
        }
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          height: "45px",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: "800",
        }}
        type="submit"
      >
        Confirm
      </Button>
    </Box>
  );
}
