import React from "react";
import Box from "@mui/material/Box";
import Dessert from "../dessert/Dessert";

export default function ImageSlider({ items }) {
  return (
    <Box
      sx={{
        overflowX: "auto",
        position: "relative",
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
      {items?.map((item) => (
        <Dessert
          key={item.dessert_id}
          name={item.name}
          title={item.title}
          price={item.price}
          description={item.description}
          image_url={item?.image_urls[0].uri}
        />
      ))}
    </Box>
  );
}
