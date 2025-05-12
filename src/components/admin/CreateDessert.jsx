import React from "react";
import {
  Box,
  Typography,
  Container,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import DessertForm from "../forms/dessert/DessertForm";
import { usePostDessert } from "../../hooks/dessert/DessertHook";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

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
          return {
            file_name: image.name,
            file_type: image.type,
            position: index,
          };
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
    <Container maxWidth="false">
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
          sx={{ marginBottom: "1rem", marginRight: "auto", marginLeft: "2rem" }}
        >
          <MuiLink
            color="inherit"
            underline="hover"
            component={RouterLink}
            to={"/admin/home"}
          >
            Admin Dashboard
          </MuiLink>
          <MuiLink
            color="inherit"
            underline="hover"
            component={RouterLink}
            to={"/admin/desserts"}
          >
            My Desserts
          </MuiLink>
          <MuiLink
            underline="hover"
            color="text.primary"
            component={RouterLink}
            to={"/admin/desserts/create"}
            aria-current="page"
          >
            New Dessert
          </MuiLink>
        </Breadcrumbs>
        <DessertForm
          onSubmitForm={createDessert}
          isLoading={isPostDessertLoading}
        />
      </Box>
    </Container>
  );
}
