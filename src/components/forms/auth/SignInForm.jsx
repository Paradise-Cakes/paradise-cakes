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
import { signInSchema } from "../../../schema";
import LoadingButton from "../../extras/LoadingButton";
import {
  usePostSignIn,
  usePostResendConfirmationCode,
} from "../../../hooks/auth/AuthHook";
import { useNavigate } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useModalStore } from "../../../store/useModalStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { first } from "lodash";

export default function SignInForm() {
  const { closeSignInModal, openLoggedInModal, openConfirmationCodeModal } =
    useModalStore();
  const { setEmail, setPassword, clearSensitiveData } = useAuthStore();
  const navigate = useNavigate();
  const postResendConfirmationCodeQuery = usePostResendConfirmationCode();
  const theme = useTheme();
  const postSignInQuery = usePostSignIn();
  const {
    mutateAsync: postSignIn,
    isLoading: isPostSignInLoading,
    isError: isPostSignInError,
    error: postSignInError,
  } = postSignInQuery;
  const [passwordType, setPasswordType] = useState("password");
  const {
    mutateAsync: postResendConfirmationCode,
    isLoading: isPostResendConfirmationCodeLoading,
    error: postResendConfirmationCodeError,
  } = postResendConfirmationCodeQuery;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    validate: async (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "email required";
      }
      if (!values.password) {
        errors.password = "password required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setEmail(values.email);
      setPassword(values.password);
      try {
        const response = await postSignIn({
          username: values.email,
          password: values.password,
        });
        closeSignInModal();
        openLoggedInModal();
        navigate("/");
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  });

  return (
    <Box
      component={"form"}
      sx={{ paddingBottom: "1.5rem" }}
      onSubmit={formik.handleSubmit}
    >
      {postSignInError && (
        <Typography textAlign={"center"} color="error">
          {postSignInError?.message === "UserNotConfirmedException" ? (
            <span style={{ color: theme.palette.error.main }}>
              Email has not been confirmed, confirm{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  closeSignInModal();
                  openConfirmationCodeModal();
                  try {
                    await postResendConfirmationCode({
                      username: formik.values.email,
                    });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                here
              </span>
            </span>
          ) : (
            postSignInError.message
          )}
        </Typography>
      )}
      <TextField
        fullWidth
        label="email"
        type="email"
        onBlur={formik.handleBlur}
        error={
          (formik.touched.email && Boolean(formik.errors.email)) ||
          Boolean(postSignInError)
        }
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
        value={formik.values.email}
        onChange={(e) => formik.setFieldValue("email", e.target.value)}
      />
      <TextField
        fullWidth
        label="password"
        type={passwordType}
        onBlur={formik.handleBlur}
        error={
          (formik.touched.password && Boolean(formik.errors.password)) ||
          Boolean(postSignInError)
        }
        helperText={formik.touched.password && formik.errors.password}
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
        onChange={(e) => formik.setFieldValue("password", e.target.value)}
        InputProps={{
          endAdornment: (
            <Box
              onClick={() =>
                setPasswordType(
                  passwordType === "password" ? "text" : "password"
                )
              }
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {passwordType === "password" ? (
                <GoEyeClosed style={{ fontSize: "1.5rem" }} />
              ) : (
                <GoEye style={{ fontSize: "1.5rem" }} />
              )}
            </Box>
          ),
        }}
      />
      <LoadingButton isLoading={isPostSignInLoading}>Sign In</LoadingButton>
    </Box>
  );
}
