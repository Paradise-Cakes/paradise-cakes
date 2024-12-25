import React from "react";
import { Box, Typography, Container } from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";
import {
  usePatchDessert,
  useGetDessertById,
} from "../../hooks/dessert/DessertHook";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDessert() {
  const { dessertId } = useParams();
  const navigate = useNavigate();
  const getDessertByIdQuery = useGetDessertById(dessertId);
  const patchDessertQuery = usePatchDessert(dessertId);
  const {
    data: dessert,
    isLoading: isDessertLoading,
    error: dessertError,
  } = getDessertByIdQuery;
  const {
    mutateAsync: patchDessert,
    isLoading: isPatchDessertLoading,
    error: patchDessertError,
  } = patchDessertQuery;
  const {
    data: postDessertImage,
    isLoading: isPostDessertImageLoading,
    error: postDessertImageError,
  } = postDessertImageQuery;
  const updateDessert = async (values) => {
    try {
      await patchDessert({
        dessert: values,
      });
      navigate("/admin/desserts");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <Typography variant="h4" align="center">
          Edit Dessert
        </Typography>
        {!isDessertLoading && (
          <DessertForm
            onSubmitForm={updateDessert}
            dessert={dessert}
            isPatchLoading={isPatchDessertLoading}
          />
        )}
      </Box>
    </Container>
  );
}
