import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Skeleton, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDeleteDessert } from "../../hooks/dessert/DessertHook";

export default function Dessert({
  id,
  name,
  description,
  image_url,
  isCoverImageLoaded,
  inAdminView = false,
}) {
  const deleteDessertQuery = useDeleteDessert(id);
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
      }}
      onClick={() => navigate(`/desserts/cakes/${id}/${name}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={image_url}
          sx={{ maxWidth: "100%", height: "auto" }}
        />
        <CardContent
          sx={{
            fontWeight: "800",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {name?.toUpperCase()}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {inAdminView && (
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
            onClick={(event) => navigate(`/admin/edit-dessert/${id}`)}
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
