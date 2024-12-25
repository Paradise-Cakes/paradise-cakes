import React from "react";
import { Box, Typography, Container } from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";
import { usePostDessert } from "../../hooks/dessert/DessertHook";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

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
      const dessertResponse = await postDessert({
        dessert: _.omit(values, ["images"]),
      });

      for (let i = 0; i < values.images.length; i++) {
        const imageResponse = await postDessertImage({
          dessert_id: dessertResponse.data.dessert_id,
          dessertImageData: {
            file_type: values.images[i].type,
            position: i + 1,
          },
        });
        let uploadUrl = imageResponse.data.upload_url;
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
          // isPostLoading={isPostDessertImageLoading}
        />
      </Box>
    </Container>
  );
}
