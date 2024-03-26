import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";

export default function SignInForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        Sign In
      </Button>
    </Box>
  );
}
