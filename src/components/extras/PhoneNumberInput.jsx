import React from "react";
import { TextField } from "@mui/material";

function formatPhoneNumber(value) {
  // First, strip all characters that are not numbers
  const numbers = value.replace(/[^\d]/g, "");

  // Handle early if empty
  if (numbers.length === 0) return "";

  // If the input is partially complete, don't format
  if (numbers.length < 10) {
    // You can implement partial formatting here if desired
    return numbers;
  }

  // Full formatting for 10 digit numbers
  const areaCode = numbers.substring(0, 3);
  const middle = numbers.substring(3, 6);
  const last = numbers.substring(6);

  return `(${areaCode}) ${middle}-${last}`;
}

export default function PhoneNumberInput({ value, onChange }) {
  const handleChange = (event) => {
    // Format the phone number before passing it to Formik's onChange
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    onChange(formattedPhoneNumber);
  };

  return (
    <TextField
      label="Phone Number"
      value={value}
      onChange={handleChange}
      fullWidth
      inputProps={{
        maxLength: 14,
      }}
    />
  );
}
