import React from "react";
import { Hidden, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Section({ title, description, items }) {
  return (
    <Grid item container spacing={2}>
      <Grid item md={2} sm={12} xxl={12}>
        <Typography
          variant="h4"
          fontWeight={1000}
          sx={{
            paddingBottom: "8px",
            paddingTop: "24px",
            textAlign: { md: "left", xs: "center", xxl: "center" },
          }}
        >
          {title.toUpperCase()}
        </Typography>
        <Typography
          sx={{ textAlign: { md: "left", xs: "center", xxl: "center" } }}
        >
          {description}
        </Typography>
      </Grid>
      <Box
        sx={{
          overflowX: "auto",
          display: { xs: "none", xxl: "flex" },
          width: "100%",
          flex: "1 0 auto",
          "&::-webkit-scrollbar": {
            height: "12px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#807E75",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#CDCBBC",
            borderRadius: "20px",
            border: "3px solid #CDCBBC",
          },
        }}
      >
        {items?.map((item, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: "12px",
              minWidth: "500px",
              margin: "24px 8px",
            }}
          >
            <CardActionArea>
              <CardMedia component="img" image={item.image} />
              <CardContent
                sx={{
                  fontWeight: "800",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.title.toUpperCase()}
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
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Grid
        item
        container
        xs={12}
        md={10}
        xxl={12}
        spacing={2}
        justifyContent={"center"}
        sx={{ border: "1px solid black", display: { xxl: "none" } }}
      >
        {items?.map((item, index) => (
          <Grid
            key={index}
            item
            sx={{ textAlign: "center" }}
            xs={12}
            sm={6}
            md={4}
            justifyContent={"center"}
          >
            <Card
              sx={{
                borderRadius: "12px",
                margin: "0 auto",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={item.image}
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
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.title.toUpperCase()}
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
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
