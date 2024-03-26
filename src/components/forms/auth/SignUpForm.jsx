import React from "react";
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

export default function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      receiveEmails: false,
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
      <FormGroup>
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
      </FormGroup>
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
