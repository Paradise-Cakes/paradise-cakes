import React from "react";
import {
	Box,
	Button,
	TextField
} from "@mui/material";
import { useFormik } from "formik";

export default function ConfirmationCodeForm() {
	const formik = useFormik({
		initialValues: {
			confirmationCode: "",
		},
		onSubmit: (values) => {
			console.log(values);
		}
	});

	return (
		<Box
			component="form"
			sx={{paddingTop: "0.5rem", paddingBottom: "0.5rem"}}
			onSubmit={formik.handleSubmit}
		>
			<TextField 
				fullWidth
				inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength:6 }}
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
        value={formik.values.confirmationCode}
        onChange={(e) => formik.setFieldValue("confirmationCode")}
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
	)
}