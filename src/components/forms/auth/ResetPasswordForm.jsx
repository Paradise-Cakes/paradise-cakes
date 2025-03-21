import React from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../../schema";
import LoadingButton from "../../extras/LoadingButton";
import { usePostResetPassword } from "../../../hooks/auth/AuthHook";
import { useModalStore } from "../../../store/useModalStore";

export default function ResetPasswordForm({ username, code }) {
  const { closeResetPasswordModal, openSignInModal } = useModalStore();
  const theme = useTheme();
  const postResetPasswordQuery = usePostResetPassword();
  const {
    mutateAsync: postResetPassword,
    isLoading: isPostResetPasswordLoading,
    error: postResetPasswordError,
  } = postResetPasswordQuery;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    validate: async (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "password required";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "confirm password required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await postResetPassword({
          username: username,
          newPassword: values.password,
          confirmationCode: code,
        });
        closeResetPasswordModal();
        openSignInModal();
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
        id="password"
        name="password"
        label="Password"
        type="password"
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
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
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
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />
      <LoadingButton isLoading={isPostResetPasswordLoading}>
        Reset My Password
      </LoadingButton>
    </Box>
  );
}
