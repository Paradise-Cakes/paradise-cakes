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
  FormGroup,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
} from "@mui/material";
import { IoAddCircle } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { dessertSchema } from "../../../schema";
import _ from "lodash";
import LoadingButton from "../../extras/LoadingButton";

export default function DessertForm({ dessert, onSubmitForm, isLoading }) {
  const [sizes, setSizes] = useState(() => {
    switch (dessert?.dessert_type) {
      case "cake":
        return ["6 inch", "8 inch", "10 inch"];
      case "cupcake":
        return ["Half Dozen", "Dozen"];
      case "cookie":
        return ["Dozen"];
      case "pie":
        return ["9 inch"];
      default:
        return [];
    }
  });
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
      visible: dessert?.visible || false,
      special_tag: dessert?.special_tag || "",
      secondary_special_tag: dessert?.secondary_special_tag || "",
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

  const handleKeyDownIngredient = (event) => {
    const newValue = event.target.value.toUpperCase();
    if (
      newValue?.trim() != "" &&
      !dessertForm.values.ingredients.includes(newValue)
    ) {
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
    switch (dessertForm.values.dessert_type) {
      case "cake":
        setSizes(["6 inch", "8 inch", "10 inch"]);
        break;
      case "cupcake":
        setSizes(["Half Dozen", "Dozen"]);
        break;
      case "cookie":
        setSizes(["Dozen"]);
        break;
      case "pie":
        setSizes(["9 inch"]);
        break;
      default:
        setSizes([]);
    }
    if (dessertForm.values.dessert_type !== dessert?.dessert_type) {
      dessertForm.setFieldValue("prices", [
        {
          size: "",
          base_price: "",
        },
      ]);
    }
  }, [dessertForm.values.dessert_type]);

  return (
    <Grid
      container
      component={"form"}
      sx={{
        padding: "2rem",
      }}
      onSubmit={dessertForm.handleSubmit}
    >
      <Grid item lg={3} sm={12}>
        <TextField
          name="dessert-name"
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
          name="dessert-description"
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
            name="dessert-type"
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
        </FormControl>
        <Autocomplete
          sx={{ marginTop: "1rem" }}
          multiple
          name="ingredients"
          freeSolo
          options={[]}
          inputValue={dessertForm.values.currentInputValue || ""}
          onInputChange={(event, newValue) => {
            dessertForm.setFieldValue("currentInputValue", newValue);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleKeyDownIngredient(e);
            }
          }}
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
                {...getTagProps({ index })}
                key={`${option}-${index}`}
                variant="outlined"
                label={option}
                onDelete={() => handleDeleteIngredient(option)}
              />
            ))
          }
          value={dessertForm.values.ingredients}
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
              data-testid="add-price-button"
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
                  data-testid={`dessert-size-select-${index}`}
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
              </FormControl>
              <TextField
                data-testid={`dessert-price-input-${index}`}
                label={"Price"}
                sx={{ marginTop: "1rem", width: "150px" }}
                value={dessertForm.values.prices[index].base_price}
                onChange={handlePriceChange(index)}
                onBlur={() =>
                  dessertForm.setFieldTouched(`prices[${index}].base_price`)
                }
              />
              <IoCloseCircleSharp
                data-testid={`remove-price-button-${index}`}
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
          <FormGroup sx={{ marginTop: "1rem" }}>
            <FormControlLabel
              control={
                <Switch
                  data-testid="dessert-visible-switch"
                  checked={dessertForm?.values?.visible}
                  onChange={async (event) => {
                    dessertForm.setFieldValue("visible", event.target.checked);
                  }}
                  sx={{
                    "& .MuiSwitch-thumb": {
                      fontSize: "1.25rem",
                      color: "white",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "red",
                    },
                    "& .Mui-checked .MuiSwitch-thumb": {
                      color: "white",
                    },
                    "& .Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "green",
                    },
                  }}
                />
              }
              label={dessertForm?.values?.visible ? "Visible" : "Hidden"}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.25rem",
                  color: dessertForm?.values?.visible ? "green" : "red",
                },
              }}
            />
          </FormGroup>
          <LoadingButton
            isLoading={isLoading}
            isDisabled={!dessertForm.dirty || dessertForm.isSubmitting}
          >
            {dessert ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Grid>
      <Grid
        item
        container
        lg={7}
        sm={12}
        sx={{
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
          <input {...getInputProps()} data-testid="image-upload-input" />
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
                data-testid={`image-preview-${index}`}
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
                  data-testid={`remove-image-button-${index}`}
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
                    data-testid={`image-order-select-${index}`}
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
      <Grid
        item
        lg={2}
        sm={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            margin: "0 auto",
          }}
        >
          <Typography variant="h6">Tags</Typography>
          <FormControl>
            <RadioGroup
              value={dessertForm.values.special_tag}
              onChange={(e) => {
                dessertForm.setFieldValue("special_tag", e.target.value);
              }}
            >
              <FormControlLabel
                value="new!"
                control={<Radio />}
                label="new!"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.25rem" } }}
              />
              <FormControlLabel
                value="on sale"
                control={<Radio />}
                label="on sale"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.25rem" } }}
              />
              <FormControlLabel
                value="best seller"
                control={<Radio />}
                label="best seller"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.25rem" } }}
              />
              <FormControlLabel
                value="almost gone!"
                control={<Radio />}
                label="almost gone!"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.25rem" } }}
              />
              <FormControlLabel
                value="back in stock!"
                control={<Radio />}
                label="back in stock!"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.25rem" } }}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
