import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { signInSchema } from "../../../schema";
import LoadingButton from "../../extras/LoadingButton";
import { usePostSignIn } from "../../../hooks/auth/AuthHook";

export default function SignInForm() {
  const postSignInQuery = usePostSignIn();

  const {
    mutateAsync: postSignIn,
    isLoading: isPostSignInLoading,
    error: postSignInError,
  } = postSignInQuery;

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
    onSubmit: (values) => {
      console.log(values);
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
        type="password"
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
      />
      {/* <Button
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
        Sign In
      </Button> */}
      <LoadingButton isLoading={isPostSignInLoading}>Sign In</LoadingButton>
    </Box>
  );
}
