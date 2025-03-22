import React from "react";
import { Box, Typography, Container, Breadcrumbs, Link } from "@mui/material";
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
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" align="center">
          New Dessert
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginBottom: "1rem", marginRight: "auto" }}
        >
          <Link color="inherit" underline="hover" href="/admin/home">
            Admin Dashboard
          </Link>
          <Link color="inherit" underline="hover" href="/admin/desserts">
            My Desserts
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/admin/desserts/create"
            aria-current="page"
          >
            New Dessert
          </Link>
        </Breadcrumbs>
        <DessertForm
          onSubmitForm={createDessert}
          isLoading={isPostDessertLoading}
        />
      </Box>
    </Container>
  );
}
