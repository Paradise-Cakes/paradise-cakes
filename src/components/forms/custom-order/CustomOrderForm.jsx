import React from "react";
import {
  Typography,
  Box,
  useTheme,
  Grid,
  TextField,
  FormGroup,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { Container } from "@mui/system";
import PhoneNumberInput from "../../extras/PhoneNumberInput";
import { DateTime } from "luxon";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CustomOrderForm() {
  const formik = useFormik({
    initialValues: {
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_phone_number: "",
      description: "",
      delivery_date: null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container>
      <Box px={8} sx={{ paddingTop: { xs: "1rem" } }}>
        <Typography variant="h4" sx={{ textAlign: { xs: "center" } }}>
          Custom Order
        </Typography>
        <Typography variant="h6" sx={{ textAlign: { xs: "center" } }}>
          <i>
            Please fill out the form below to place a custom order. Please allow
            2-3 days for a response.
          </i>
        </Typography>
        <Box
          component={"form"}
          sx={{ maxWidth: "500px", margin: "0 auto" }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            fullWidth
            label="First Name"
            sx={{ marginTop: "1rem" }}
            value={formik.values.customer_first_name}
            onChange={(e) =>
              formik.setFieldValue("customer_first_name", e.target.value)
            }
          />
          <TextField
            fullWidth
            label="Last Name"
            sx={{ marginTop: "1rem" }}
            value={formik.values.customer_last_name}
            onChange={(e) =>
              formik.setFieldValue("customer_last_name", e.target.value)
            }
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            value={formik.values.customer_email}
            onChange={(e) =>
              formik.setFieldValue("customer_email", e.target.value)
            }
          />
          <PhoneNumberInput
            value={formik.values.customer_phone_number}
            onChange={(value) =>
              formik.setFieldValue("customer_phone_number", value)
            }
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={5}
            sx={{ marginTop: "1rem" }}
            inputProps={{
              maxLength: 265,
            }}
            placeholder="Describe the custom order you would like to place. Please include any specific details such as flavor, color, design or food allergies."
          />
          <FormGroup sx={{ marginTop: "1rem" }}>
            <Typography variant="h6" marginBottom="1rem">
              When do you need it by?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label={"Delivery Date"}
                timezone="system"
                value={formik.values.delivery_date}
                onChange={(value) => {
                  formik.setFieldValue("deliveryDate", value);
                }}
              />
            </LocalizationProvider>
          </FormGroup>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{
              marginTop: "1rem",
              width: { xs: "100%", sm: "fit-content" },
              color: "white",
            }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
