import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function Dessert({ id, name, title, description, image }) {
  const navigate = useNavigate();
  return (
    <Card
      key={id}
      name={name}
      sx={{
        borderRadius: "12px",
        margin: { xs: "0 auto", xxl: "24px 8px" },
        minWidth: { xxl: "500px" },
        display: { xxl: "flex" },
        flexDirection: { xxl: "column" },
        justifyContent: { xxl: "center" },
        alignItems: { xxl: "center" },
      }}
      onClick={() => navigate(`/desserts/cakes/${id}/${name}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
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
            {title.toUpperCase()}
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
