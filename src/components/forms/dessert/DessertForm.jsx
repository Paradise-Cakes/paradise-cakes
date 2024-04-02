import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
} from "@mui/material";
import { IoAddCircle } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function DessertForm() {
  const [sizes, setSizes] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      dessert_type: "",
      prices: [
        {
          size: "",
          price: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const theme = useTheme();

  const handleSizeChange = (index) => (e) => {
    const updatedPrices = formik.values.prices.map((item, i) =>
      i === index ? { ...item, size: e.target.value } : item
    );
    formik.setFieldValue("prices", updatedPrices);
  };

  const handlePriceChange = (index) => (e) => {
    const updatedPrices = formik.values.prices.map((item, i) =>
      i === index ? { ...item, price: e.target.value } : item
    );
    formik.setFieldValue("prices", updatedPrices);
  };

  const handleAddPrice = () => {
    formik.setFieldValue("prices", [
      ...formik.values.prices,
      {
        size: "",
        price: "",
      },
    ]);
  };

  useEffect(() => {
    const dessertType = formik.values.dessert_type;
    if (dessertType === "cake") {
      setSizes(["6 inch", "8 inch", "10 inch"]);
    } else if (dessertType === "cupcake") {
      setSizes(["Half Dozen", "Dozen"]);
    } else if (dessertType === "cookie") {
      setSizes(["Dozen"]);
    } else if (dessertType === "pie") {
      setSizes(["9 inch"]);
    }
  }, [formik.values.dessert_type]);

  return (
    <Box
      component={"form"}
      sx={{ maxWidth: "500px" }}
      onSubmit={formik.handleSubmit}
    >
      <TextField fullWidth label={"Name"} sx={{ marginTop: "1rem" }} />
      <TextField
        fullWidth
        label={"Description"}
        multiline
        sx={{ marginTop: "1rem" }}
        rows={4}
      />
      <FormControl fullWidth sx={{ marginTop: "1rem" }}>
        <InputLabel id="dessert-type">Dessert Type</InputLabel>
        <Select
          fullWidth
          label={"Dessert Type"}
          labelId="dessert-type"
          value={formik.values.dessert_type}
          onChange={(e) => formik.setFieldValue("dessert_type", e.target.value)}
        >
          <MenuItem value={"cake"}>Cake</MenuItem>
          <MenuItem value={"cupcake"}>Cupcake</MenuItem>
          <MenuItem value={"cookie"}>Cookie</MenuItem>
          <MenuItem value={"pie"}>Pie</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ marginTop: "1.5rem" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width="fit-content"
        >
          <Typography variant="h5">Sizing and Pricing</Typography>
          <IoAddCircle
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "1rem",
              color: theme.palette.info.main,
              cursor: "pointer",
            }}
            onClick={handleAddPrice}
          />
        </Box>
        {formik.values.prices.map((p, index) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl
              sx={{ marginTop: "1rem", width: "150px", marginRight: "1.5rem" }}
            >
              <InputLabel id="dessert-size">Size</InputLabel>
              <Select
                fullWidth
                label={"Size"}
                labelId="dessert-size"
                value={formik.values.prices[index].size}
                onChange={handleSizeChange(index)}
              >
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={"Price"}
              type="tel"
              sx={{ marginTop: "1rem", width: "150px" }}
              value={formik.values.prices[index].price}
              onChange={handlePriceChange(index)}
            />
            <IoCloseCircleSharp
              style={{
                width: "30px",
                height: "30px",
                color: theme.palette.error.main,
                marginLeft: "1rem",
                cursor: "pointer",
              }}
            />
          </Box>
        ))}
      </Box>
      <Button
        type="submit"
        color="success"
        variant="contained"
        sx={{
          marginTop: "2rem",
          width: "250px",
        }}
      >
        ADD
      </Button>
    </Box>
  );
}
