import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../../schema";
import LoadingButton from "../../extras/LoadingButton";
import { usePostForgotPassword } from "../../../hooks/auth/AuthHook";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../store/useModalStore";

export default function ForgotPasswordForm() {
  const { closeForgotPasswordModal, openSentResetPassswordEmailModal } =
    useModalStore();
  const theme = useTheme();
  const postForgotPasswordQuery = usePostForgotPassword();
  const {
    mutateAsync: postForgotPassword,
    isLoading: isPostForgotPasswordLoading,
    error: postForgotPasswordError,
  } = postForgotPasswordQuery;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    validate: async (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "email required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await postForgotPassword({
          username: values.email,
        });
        closeForgotPasswordModal();
        openSentResetPassswordEmailModal();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box
      component={"form"}
      sx={{ paddingBottom: "1.5rem" }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
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
          "& .MuiInputBase-input": { fontFamily: "Montserrat" },
        }}
      />
      <LoadingButton isLoading={isPostForgotPasswordLoading}>
        Reset My Password
      </LoadingButton>
    </Box>
  );
}
