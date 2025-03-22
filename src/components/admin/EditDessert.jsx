import React from "react";
import { Box, Typography, Container } from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";
import axios from "axios";
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

  const updateDessert = async (values) => {
    try {
      const formattedValues = {
        ...values,
        images: values.images.map((image, index) => {
          if (image instanceof File) {
            return {
              file_name: image.name,
              file_type: image.type,
              position: index,
            };
          }
          return image;
        }),
      };

      const patchResponse = await patchDessert({
        dessert: formattedValues,
      });

      for (let i = 0; i < values.images.length; i++) {
        if (values.images[i] instanceof File) {
          let uploadUrl = patchResponse.data.images[i].upload_url;
          try {
            await axios.put(uploadUrl, values.images[i], {
              headers: {
                "Content-Type": values.images[i].type,
              },
            });
          } catch (uploadError) {
            console.error("Upload error:", uploadError);
          }
        }
      }
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
      >
        <Typography variant="h4" align="center">
          Edit Dessert
        </Typography>
        {!isDessertLoading && (
          <DessertForm
            onSubmitForm={updateDessert}
            dessert={dessert}
            isLoading={isPatchDessertLoading}
          />
        )}
      </Box>
    </Container>
  );
}
