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
import {
  usePostDessertImage,
  usePostDessert,
} from "../../../hooks/dessert/DessertHook";
import { useNavigate } from "react-router-dom";
import { dessertSchema } from "../../../schema";
import _ from "lodash";

export default function DessertForm() {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([]);
  const {
    mutateAsync: postDessertImage,
    isLoading: isPostDessertImageLoading,
    error: postDessertImageError,
  } = usePostDessertImage();
  const {
    mutateAsync: postDessert,
    isLoading: isPostDessertLoading,
    error: postDessertError,
  } = usePostDessert();
  const dessertForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      dessert_type: "",
      prices: [
        {
          size: "",
          base: "",
        },
      ],
      ingredients: [],
      image_urls: [],
    },
    validationSchema: dessertSchema,
    onSubmit: async (values) => {
      try {
        console.log(_.omit(values, ["image_urls"]));
        const response = await postDessert({
          dessert: _.omit(values, ["image_urls"]),
        }).then((res) => {
          for (let i = 0; i < values.image_urls.length; i++) {
            console.log(values.image_urls[i]);
            const formData = new FormData();
            formData.append("file", values.image_urls[i]);
            formData.append("position", i);
            // formData.append("dessert_id", res.data.dessert_id);
            postDessertImage({
              dessertImageData: formData,
              dessert_id: res.data.dessert_id,
            });
          }
        });
        // navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const theme = useTheme();
  const onDrop = (acceptedFiles) => {
    // Assuming you want to keep previous files and add new ones
    const newFiles = dessertForm.values.image_urls.concat(acceptedFiles);
    dessertForm.setFieldValue("image_urls", newFiles);
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
      i === index ? { ...item, base: e.target.value } : item
    );
    dessertForm.setFieldValue("prices", updatedPrices);
  };

  const handleAddPrice = () => {
    dessertForm.setFieldValue("prices", [
      ...dessertForm.values.prices,
      {
        size: "",
        base: "",
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
      }}
      onSubmit={dessertForm.handleSubmit}
      display={"flex"}
    >
      <Grid item lg={3} md={6} sm={8} xs={12}>
        <TextField
          fullWidth
          label={"Name"}
          sx={{ marginTop: "1rem" }}
          onChange={(e) => dessertForm.setFieldValue("name", e.target.value)}
          onBlur={dessertForm.handleBlur}
          error={dessertForm.touched.name && Boolean(dessertForm.errors.name)}
          helperText={dessertForm.touched.name && dessertForm.errors.name}
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
                value={dessertForm.values.prices[index].base}
                onChange={handlePriceChange(index)}
                onBlur={() =>
                  dessertForm.setFieldTouched(`prices[${index}].base`)
                }
                error={Boolean(
                  dessertForm.touched.prices?.[index]?.base &&
                    dessertForm.errors.prices?.[index]?.base
                )}
                helperText={
                  dessertForm.touched.prices?.[index]?.base &&
                  dessertForm.errors.prices?.[index]?.base
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
          {dessertForm.values.image_urls.length === 0 ? (
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
            dessertForm.values.image_urls.map((file, index) => (
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
                    const newFiles = dessertForm.values.image_urls.filter(
                      (item, i) => i !== index && item
                    );
                    dessertForm.setFieldValue("image_urls", newFiles);
                  }}
                />
                <FormControl fullWidth>
                  <Select
                    labelId="img-order-label"
                    value={index}
                    sx={{ marginTop: "0.5rem" }}
                    onChange={(e) => {
                      const newIndex = e.target.value;
                      const newFiles = dessertForm.values.image_urls.map(
                        (item, i) =>
                          i === index
                            ? dessertForm.values.image_urls[newIndex]
                            : i === newIndex
                            ? file
                            : item
                      );
                      dessertForm.setFieldValue("image_urls", newFiles);
                      // dessertForm.handleSubmit(); // Call handleSubmit function here
                    }}
                  >
                    {dessertForm.values.image_urls.map((_, i) => (
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
