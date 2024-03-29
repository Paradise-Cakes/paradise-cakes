import React, { useContext } from "react";
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

export default function SignUpForm() {
  const { setConfirmationCodeModalOpen, setSignUpModalOpen, setEmail } =
    useContext(AccountContext);
  const postSignUpQuery = usePostSignUp();

  const {
    mutateAsync: postSignUp,
    isLoading: isPostSignUpLoading,
    error: postSignUpError,
  } = postSignUpQuery;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // receiveEmails: false,
    },
    validationSchema: signUpSchema,
    validate: async (values) => {
      const errors = {};

      if (!values.email) {
        errors.name = "email required";
      }
      if (!values.password) {
        errors.description = "password required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await postSignUp({
          signUp: values,
        }).then((response) => {
          setConfirmationCodeModalOpen(true);
          setSignUpModalOpen(false);
          setEmail(values.email);
        });
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
        label="email"
        type="email"
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
        type="password"
        value={formik.values.password}
        onChange={(e) => formik.setFieldValue("password", e.target.value)}
      />
      {/*      <FormGroup>
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

      <Button
        variant="contained"
        fullWidth
        sx={{
          height: "45px",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: "800",
          marginTop: "1.5rem",
        }}
        type="submit"
      >
        Sign Up
      </Button>
    </Box>
  );
}
