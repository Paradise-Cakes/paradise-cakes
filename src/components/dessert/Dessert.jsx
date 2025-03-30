import React, { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Skeleton, Button, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteDessert,
  usePatchDessert,
} from "../../hooks/dessert/DessertHook";
import { patch } from "@mui/system";

export default function Dessert({
  id,
  name,
  description,
  image_url = "https://placehold.co/400",
  inAdminView = false,
  isLoading = false,
  isVisible = false,
}) {
  const deleteDessertQuery = useDeleteDessert(id);
  const theme = useTheme();
  const {
    mutateAsync: deleteDessert,
    isLoading: isDeleteDessertLoading,
    error: deleteDessertError,
  } = deleteDessertQuery;
  const patchDessertQuery = usePatchDessert(id);
  const {
    mutateAsync: patchDessert,
    isLoading: isPatchDessertLoading,
    error: patchDessertError,
  } = patchDessertQuery;

  const navigate = useNavigate();

  return (
    <Card
      key={id}
      sx={{
        borderRadius: "12px",
        boxShadow: 3,
        position: "relative",
        border: `2px solid ${theme.palette.primary.main}`,
      }}
      onClick={() => navigate(`/desserts/cakes/${id}/${name}`)}
    >
      <CardActionArea>
        {isLoading || isDeleteDessertLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              aspectRatio: "1/1",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <CardMedia
            component="img"
            image={image_url}
            sx={{ aspectRatio: "1/1" }}
          />
        )}
        <CardContent
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            borderTop: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          {isLoading || isDeleteDessertLoading ? (
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1.25rem", width: "80%", mx: "auto" }}
            />
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {name?.toUpperCase()}
            </Typography>
          )}
          {isLoading || isDeleteDessertLoading ? (
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem", width: "60%", mx: "auto" }}
            />
          ) : (
            <Typography
              variant="body"
              component="div"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {inAdminView && !isLoading && (
        <Box
          display={"flex"}
          justifyContent="space-between"
          position={"absolute"}
          width={"100%"}
          sx={{
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          p={2}
          onClick={(event) => event.stopPropagation()}
        >
          <Box display={"flex"} justifyContent={"flex-start"}>
            <Button
              variant="contained"
              color="success"
              sx={{
                marginRight: "1rem",
              }}
              onClick={(event) =>
                navigate(`/admin/desserts/edit-dessert/${id}`)
              }
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteDessert()}
            >
              Remove
            </Button>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isVisible}
                  onChange={async (event) => {
                    try {
                      await patchDessert({
                        dessert: {
                          visible: event.target.checked,
                        },
                      });
                    } catch (error) {
                      console.error(
                        "Failed to update dessert visibility:",
                        error
                      );
                    }
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
              label={isVisible ? "Visible" : "Hidden"}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.25rem",
                  color: isVisible ? "green" : "red",
                },
              }}
            />
          </FormGroup>
        </Box>
      )}
    </Card>
  );
}
