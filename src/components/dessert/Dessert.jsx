import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Skeleton, Button, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDeleteDessert } from "../../hooks/dessert/DessertHook";

export default function Dessert({
  id,
  name,
  description,
  image_url = "https://placehold.co/400",
  inAdminView = false,
  isLoading = false,
}) {
  const deleteDessertQuery = useDeleteDessert(id);
  const theme = useTheme();
  const {
    mutateAsync: deleteDessert,
    isLoading: isDeleteDessertLoading,
    error: deleteDessertError,
  } = deleteDessertQuery;
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
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              aspectRatio: "4/3",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <CardMedia
            component="img"
            image={image_url}
            sx={{ aspectRatio: "4/3" }}
          />
        )}
        <CardContent
          sx={{
            fontWeight: "800",
            fontSize: "1rem",
            textAlign: "center",
            borderTop: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          {isLoading ? (
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
                fontWeight: "bold",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {name?.toUpperCase()}
            </Typography>
          )}
          {isLoading ? (
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
                fontWeight: "400",
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
          width={"100%"}
          justifyContent={"flex-start"}
          position={"absolute"}
          sx={{
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          p={2}
          onClick={(event) => event.stopPropagation()}
        >
          <Button
            variant="contained"
            color="success"
            sx={{
              marginRight: "1rem",
            }}
            onClick={(event) => navigate(`/admin/desserts/edit-dessert/${id}`)}
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
      )}
    </Card>
  );
}
