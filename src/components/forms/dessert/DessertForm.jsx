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
  Autocomplete,
  Grid,
} from "@mui/material";
import { IoAddCircle } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

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
      image_urls: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const theme = useTheme();
  const onDrop = (acceptedFiles) => {
    // Assuming you want to keep previous files and add new ones
    const newFiles = formik.values.image_urls.concat(acceptedFiles);
    formik.setFieldValue("image_urls", newFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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

  const handleRemovePrice = (index) => (e) => {
    if (formik.values.prices.length > 1) {
      const updatedPrices = formik.values.prices.filter(
        (item, i) => i !== index && item
      );
      formik.setFieldValue("prices", updatedPrices);
    }
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
    <Grid
      container
      component={"form"}
      sx={{
        margin: "0 auto",
        justifyContent: { xs: "center", lg: "space-between" },
      }}
      onSubmit={formik.handleSubmit}
      display={"flex"}
    >
      <Grid item lg={3} md={6} sm={8} xs={12}>
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
            onChange={(e) =>
              formik.setFieldValue("dessert_type", e.target.value)
            }
          >
            <MenuItem value={"cake"}>Cake</MenuItem>
            <MenuItem value={"cupcake"}>Cupcake</MenuItem>
            <MenuItem value={"cookie"}>Cookie</MenuItem>
            <MenuItem value={"pie"}>Pie</MenuItem>
          </Select>
        </FormControl>
        <Autocomplete
          sx={{ marginTop: "1rem" }}
          multiple
          id="ingredients"
          freeSolo
          options={[]}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Ingredients" />
          )}
        />
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
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <FormControl
                sx={{
                  marginTop: "1rem",
                  width: "150px",
                  marginRight: "1.5rem",
                }}
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
                onClick={handleRemovePrice(index)}
              />
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid
        item
        container
        lg={9}
        md={12}
        sm={12}
        sx={{
          display: "flex",
          marginTop: "2rem",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          {...getRootProps()}
          sx={{
            border: "2px dashed black",
            width: "400px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[500],
            },
            marginRight: "2rem",
            marginLeft: "2rem",
            marginBottom: "2rem",
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="h6">Drag and drop an image here</Typography>
          <IoAddCircle style={{ width: "50px", height: "50px" }} />
        </Grid>
        <Grid
          item
          display={"flex"}
          flexWrap={"wrap"}
          alignContent={"flex-start"}
          sx={{ width: "400px", height: "400px" }}
        >
          {formik.values.image_urls.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `5px dashed ${theme.palette.warning.main}`,
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h6" textAlign={"center"}>
                Upload images to display here
              </Typography>
            </Box>
          ) : (
            formik.values.image_urls.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  borderRadius: "12px",
                  marginRight: "1rem",
                  width: "150px",
                  height: "150px",
                  marginBottom: "5rem",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: "150px", height: "150px", display: "block" }}
                />
                <IoCloseCircleSharp
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    width: "30px",
                    height: "30px",
                    color: theme.palette.error.main,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const newFiles = formik.values.image_urls.filter(
                      (item, i) => i !== index && item
                    );
                    formik.setFieldValue("image_urls", newFiles);
                  }}
                />
                <FormControl fullWidth>
                  <Select
                    labelId="img-order-label"
                    value={index}
                    sx={{ marginTop: "0.5rem" }}
                    onChange={(e) => {
                      const newIndex = e.target.value;
                      const newFiles = formik.values.image_urls.map((item, i) =>
                        i === index
                          ? formik.values.image_urls[newIndex]
                          : i === newIndex
                          ? file
                          : item
                      );
                      formik.setFieldValue("image_urls", newFiles);
                    }}
                  >
                    {formik.values.image_urls.map((_, i) => (
                      <MenuItem key={i} value={i}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))
          )}
        </Grid>
      </Grid>
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
    </Grid>
  );
}
