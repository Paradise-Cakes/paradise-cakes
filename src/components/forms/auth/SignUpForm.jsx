import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { AccountContext } from "../../../context/AccountContext";
import { signUpSchema } from "../../../schema";
import { usePostSignUp } from "../../../hooks/auth/AuthHook";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import LoadingButton from "../../extras/LoadingButton";

export default function SignUpForm() {
  const { setConfirmationCodeModalOpen, setSignUpModalOpen, setEmail } =
    useContext(AccountContext);
  const postSignUpQuery = usePostSignUp();
  const [passwordType, setPasswordType] = useState("password");

  const {
    mutateAsync: postSignUp,
    isLoading: isPostSignUpLoading,
    error: postSignUpError,
  } = postSignUpQuery;

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      // receiveEmails: false,
    },
    validationSchema: signUpSchema,
    validate: async (values) => {
      const errors = {};
      if (!values.first_name) {
        errors.first_name = "first name required";
      }
      if (!values.last_name) {
        errors.last_name = "last name required";
      }
      if (!values.email) {
        errors.email = "email required";
      }
      if (!values.password) {
        errors.password = "password required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await postSignUp({
          signUp: values,
        });
        setConfirmationCodeModalOpen(true);
        setSignUpModalOpen(false);
        setEmail(values.email);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box
      component={"form"}
      sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        fullWidth
        label="first name"
        onBlur={formik.handleBlur}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
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
        value={formik.values.first_name}
        onChange={(e) => formik.setFieldValue("first_name", e.target.value)}
      />
      <TextField
        fullWidth
        label="last name"
        onBlur={formik.handleBlur}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
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
        value={formik.values.last_name}
        onChange={(e) => formik.setFieldValue("last_name", e.target.value)}
      />
      <TextField
        fullWidth
        label="email"
        type="email"
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
        }}
        value={formik.values.email}
        onChange={(e) => formik.setFieldValue("email", e.target.value)}
      />
      <TextField
        fullWidth
        label="password"
        type={passwordType}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
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
      {/* <FormGroup>
        <FormControlLabel
          sx={{ alignItems: "flex-start", marginTop: "1rem" }}
          control={
            <Checkbox
              sx={{ padding: "0 6px" }}
              checked={formik.values.receiveEmails}
              onChange={(e) =>
                formik.setFieldValue("receiveEmails", e.target.checked)
              }
            />
          }
          label="By creating an account, you agree to receive emails about your order. You can unsubscribe at any time."
        />
      </FormGroup> */}
      <LoadingButton isLoading={isPostSignUpLoading}>Sign Up</LoadingButton>
    </Box>
  );
}
