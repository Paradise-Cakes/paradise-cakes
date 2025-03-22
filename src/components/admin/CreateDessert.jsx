import React from "react";
import { Box, Typography, Container } from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";
import { usePostDessert } from "../../hooks/dessert/DessertHook";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import fs from "fs";

export default function CreateDessert() {
  const navigate = useNavigate();
  const postDessertQuery = usePostDessert();
  const {
    mutateAsync: postDessert,
    isLoading: isPostDessertLoading,
    error: postDessertError,
  } = postDessertQuery;

  const createDessert = async (values) => {
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
      const postResponse = await postDessert({
        dessert: formattedValues,
      });

      for (let i = 0; i < values.images.length; i++) {
        let uploadUrl = postResponse.data.images[i].upload_url;
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
      navigate("/admin/desserts");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box px={4} sx={{ paddingTop: { xs: "1rem" } }}>
        <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
          New Dessert
        </Typography>
        <DessertForm
          onSubmitForm={createDessert}
          isLoading={isPostDessertLoading}
        />
      </Box>
    </Container>
  );
}
