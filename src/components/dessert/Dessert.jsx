import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function Dessert({ id, name, description, image_url }) {
  const navigate = useNavigate();
  return (
    <Card
      key={id}
      sx={{
        borderRadius: "12px",
        boxShadow: 3,
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
            height: "64px",
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
    </Card>
  );
}
