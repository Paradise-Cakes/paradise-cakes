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
import { AccountContext } from "../../../context/AccountContext";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

export default function SignInForm() {
  const {
    setSignInModalOpen,
    setConfirmationCodeModalOpen,
    setLoggedInModalOpen,
    setEmail,
    setPassword,
    setLoggedIn,
    setFirstName,
    setLastName,
  } = useContext(AccountContext);
  const navigate = useNavigate();
  const postSignInQuery = usePostSignIn();
  const postResendConfirmationCodeQuery = usePostResendConfirmationCode();
  const theme = useTheme();
  const {
    mutateAsync: postSignIn,
    isLoading: isPostSignInLoading,
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
          userCreds: values,
        });
        console.log(response);
        setSignInModalOpen(false);
        setLoggedInModalOpen(true);
        setLoggedIn(true);
        setFirstName(response.data.given_name);
        setLastName(response.data.family_name);
        navigate("/");
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
      {postSignInError && (
        <Typography textAlign={"center"} color="error">
          {postSignInError?.response?.data?.detail ===
          "User is not confirmed" ? (
            <span style={{ color: theme.palette.error.main }}>
              Email has not been confirmed, confirm{" "}
              <span
                style={{ fontWeight: "1000", cursor: "pointer" }}
                onClick={async () => {
                  setSignInModalOpen(false);
                  setConfirmationCodeModalOpen(true);
                  try {
                    await postResendConfirmationCode({
                      email: { email: formik.values.email },
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
            postSignInError?.response?.data?.detail
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
