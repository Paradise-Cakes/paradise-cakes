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
  Chip,
  FormHelperText,
} from "@mui/material";
import { IoAddCircle } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { dessertSchema } from "../../../schema";
import _ from "lodash";
import LoadingButton from "../../extras/LoadingButton";

export default function DessertForm({ dessert, onSubmitForm, isLoading }) {
  const [sizes, setSizes] = useState([]);
  const dessertForm = useFormik({
    initialValues: {
      name: dessert?.name || "",
      description: dessert?.description || "",
      dessert_type: dessert?.dessert_type || "",
      prices: dessert?.prices || [
        {
          size: "",
          base_price: "",
        },
      ],
      ingredients: dessert?.ingredients || [],
      images: dessert?.images || [],
    },
    validationSchema: dessertSchema,
    onSubmit: async (values) => {
      onSubmitForm(values);
    },
  });

  const theme = useTheme();
  const onDrop = (acceptedFiles) => {
    const newFiles = dessertForm.values?.images?.concat(acceptedFiles);
    dessertForm.setFieldValue("images", newFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleSizeChange = (index) => (e) => {
    const updatedPrices = dessertForm.values.prices.map((item, i) =>
      i === index ? { ...item, size: e.target.value } : item
    );
    dessertForm.setFieldValue("prices", updatedPrices);
  };

  const handlePriceChange = (index) => (e) => {
    const updatedPrices = dessertForm.values.prices.map((item, i) =>
      i === index ? { ...item, base_price: e.target.value } : item
    );
    dessertForm.setFieldValue("prices", updatedPrices);
  };

  const handleAddPrice = () => {
    dessertForm.setFieldValue("prices", [
      ...dessertForm.values.prices,
      {
        size: "",
        base_price: "",
      },
    ]);
  };

  const handleRemovePrice = (index) => (e) => {
    if (dessertForm.values.prices.length > 1) {
      const updatedPrices = dessertForm.values.prices.filter(
        (item, i) => i !== index && item
      );
      dessertForm.setFieldValue("prices", updatedPrices);
    }
  };

  const handleKeyDownIngredient = (event, newValue) => {
    if (
      event.key === "Enter" &&
      newValue &&
      !dessertForm.values.ingredients.includes(newValue)
    ) {
      event.preventDefault();
      dessertForm.setFieldValue("ingredients", [
        ...dessertForm.values.ingredients,
        newValue,
      ]);
    }
  };

  const handleDeleteIngredient = (itemToDelete) => {
    const newItems = dessertForm.values.ingredients.filter(
      (item) => item !== itemToDelete
    );
    dessertForm.setFieldValue("ingredients", newItems);
  };

  useEffect(() => {
    const dessertType = dessertForm.values.dessert_type;
    if (dessertType === "cake") {
      setSizes(["6 inch", "8 inch", "10 inch"]);
    } else if (dessertType === "cupcake") {
      setSizes(["Half Dozen", "Dozen"]);
    } else if (dessertType === "cookie") {
      setSizes(["Dozen"]);
    } else if (dessertType === "pie") {
      setSizes(["9 inch"]);
    }
  }, [dessertForm.values.dessert_type]);

  return (
    <Grid
      container
      component={"form"}
      sx={{
        margin: "0 auto",
        justifyContent: { xs: "center", lg: "space-between" },
        padding: "2rem 0",
      }}
      onSubmit={dessertForm.handleSubmit}
      display={"flex"}
    >
      <Grid item lg={3} md={6} sm={8} xs={12} sx={{ height: "fit-content" }}>
        <TextField
          fullWidth
          label={"Name"}
          sx={{ marginTop: "1rem" }}
          onChange={(e) => dessertForm.setFieldValue("name", e.target.value)}
          onBlur={dessertForm.handleBlur}
          error={dessertForm.touched.name && Boolean(dessertForm.errors.name)}
          helperText={dessertForm.touched.name && dessertForm.errors.name}
          value={dessertForm.values.name}
        />
        <TextField
          fullWidth
          label={"Description"}
          multiline
          sx={{ marginTop: "1rem" }}
          rows={4}
          onChange={(e) =>
            dessertForm.setFieldValue("description", e.target.value)
          }
          onBlur={dessertForm.handleBlur}
          error={
            dessertForm.touched.description &&
            Boolean(dessertForm.errors.description)
          }
          helperText={
            dessertForm.touched.description && dessertForm.errors.description
          }
          value={dessertForm.values.description}
        />
        <FormControl fullWidth sx={{ marginTop: "1rem" }}>
          <InputLabel id="dessert-type">Dessert Type</InputLabel>
          <Select
            fullWidth
            label={"Dessert Type"}
            labelId="dessert-type"
            value={dessertForm.values.dessert_type}
            onChange={(e) =>
              dessertForm.setFieldValue("dessert_type", e.target.value)
            }
            onBlur={dessertForm.handleBlur}
            error={
              dessertForm.touched.dessert_type &&
              Boolean(dessertForm.errors.dessert_type)
            }
          >
            <MenuItem value={"cake"}>Cake</MenuItem>
            <MenuItem value={"cupcake"}>Cupcake</MenuItem>
            <MenuItem value={"cookie"}>Cookie</MenuItem>
            <MenuItem value={"pie"}>Pie</MenuItem>
          </Select>
          {dessertForm.touched.dessert_type &&
            dessertForm.errors.dessert_type && (
              <FormHelperText error>
                {dessertForm.errors.dessert_type}
              </FormHelperText>
            )}
        </FormControl>
        <Autocomplete
          sx={{ marginTop: "1rem" }}
          multiple
          id="ingredients"
          freeSolo
          options={[]}
          getOptionLabel={(option) => option}
          inputValue={dessertForm.values.currentInputValue || ""}
          onInputChange={(event, newValue) => {
            dessertForm.setFieldValue("currentInputValue", newValue);
          }}
          onKeyDown={handleKeyDownIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Ingredients"
              placeholder="Add ingredient"
              error={
                dessertForm.touched.ingredients &&
                Boolean(dessertForm.errors.ingredients)
              }
              helperText={
                dessertForm.touched.ingredients &&
                dessertForm.errors.ingredients
              }
            />
          )}
          onBlur={dessertForm.handleBlur}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                onDelete={() => handleDeleteIngredient(option)}
              />
            ))
          }
          value={dessertForm.values.ingredients}
          onChange={(event, newValue) => {
            dessertForm.setFieldValue("ingredients", newValue);
          }}
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
          {dessertForm.values.prices.map((p, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <FormControl
                sx={{
                  marginTop: "1rem",
                  width: "150px",
                  marginRight: "1.5rem",
                }}
                error={Boolean(
                  dessertForm.touched.prices?.[index]?.size &&
                    dessertForm.errors.prices?.[index]?.size
                )}
              >
                <InputLabel id="dessert-size">Size</InputLabel>
                <Select
                  fullWidth
                  label={"Size"}
                  labelId="dessert-size"
                  value={dessertForm.values.prices[index].size}
                  onChange={handleSizeChange(index)}
                  onBlur={() =>
                    dessertForm.setFieldTouched(`prices[${index}].size`)
                  }
                >
                  {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
                {dessertForm.touched?.prices?.[index]?.size &&
                  dessertForm.errors?.prices?.[index]?.size && (
                    <FormHelperText error>
                      {dessertForm.errors?.prices[index]?.size}
                    </FormHelperText>
                  )}
              </FormControl>
              <TextField
                label={"Price"}
                type="tel"
                sx={{ marginTop: "1rem", width: "150px" }}
                value={dessertForm.values.prices[index].base_price}
                onChange={handlePriceChange(index)}
                onBlur={() =>
                  dessertForm.setFieldTouched(`prices[${index}].base_price`)
                }
                error={Boolean(
                  dessertForm.touched.prices?.[index]?.base_price &&
                    dessertForm.errors.prices?.[index]?.base_price
                )}
                helperText={
                  dessertForm.touched.prices?.[index]?.base_price &&
                  dessertForm.errors.prices?.[index]?.base_price
                }
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
          <LoadingButton isLoading={isLoading} isDisabled={!dessertForm.dirty}>
            {dessert ? "Update" : "Create"}
          </LoadingButton>
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
          justifyContent: "center",
          height: "fit-content",
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
          justifyContent={"space-evenly"}
          alignItems={"space-evenly"}
          padding={"0 10rem"}
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {dessertForm.values?.images?.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  borderRadius: "12px",
                  margin: "1rem",
                }}
              >
                <img
                  src={file?.url || URL.createObjectURL(file)}
                  alt={file?.name || file?.file_name}
                  style={{
                    width: "240px",
                    height: "180px",
                    display: "block",
                  }}
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
                    const newFiles = dessertForm.values?.images?.filter(
                      (item, i) => i !== index && item
                    );
                    dessertForm.setFieldValue("images", newFiles);
                  }}
                />
                <FormControl fullWidth>
                  <Select
                    labelId="img-order-label"
                    value={index}
                    sx={{ marginTop: "0.5rem" }}
                    onChange={(e) => {
                      const newIndex = e.target.value;
                      const newFiles = dessertForm.values?.images?.map(
                        (item, i) =>
                          i === index
                            ? dessertForm.values?.images[newIndex]
                            : i === newIndex
                              ? file
                              : item
                      );
                      dessertForm.setFieldValue("images", newFiles);
                    }}
                  >
                    {dessertForm.values?.images?.map((_, i) => (
                      <MenuItem key={i} value={i}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
