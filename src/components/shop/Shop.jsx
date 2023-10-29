import React from "react";
import Section from "./Section";
import Grid from "@mui/material/Grid";

export default function Shop() {
  const cakeItems = [
    {
      title: "carrot cake",
      description:
        "A delightful, moist dessert bursting with the natural sweetness of carrots, complemented by warm spices and a luscious cream cheese frosting.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "chocolate cake",
      description:
        "Decadent, moist, and rich in flavor, chocolate cake is a delightful dessert that satisfies with its indulgent cocoa-infused layers and velvety smooth frosting.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "red velvet cake",
      description:
        "Rich and moist with a hint of cocoa, tinted red, and topped with smooth cream cheese frosting.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "classic vanilla cake",
      description:
        " A timeless classic with a simple, elegant flavor, perfect for any occasion.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "galaxy cake",
      description:
        "Embark on a cosmic journey with our stunning cake that's out of this world, with swirls of color and a taste that's truly stellar.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "strawberry ganache cake",
      description:
        "Indulge in a harmonious blend of rich, velvety chocolate ganache and the vibrant sweetness of fresh strawberries in every slice.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "lemon blueberry cake",
      description:
        "A refreshing, zesty lemon cake with a burst of blueberries in every bite.",
      image: "https://place-hold.it/1000/666",
    },
  ];
  const cupcakeItems = [
    {
      title: "vanilla cupcakes",
      description:
        "Made with a moist vanilla cake and topped with a smooth vanilla buttercream frosting.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "chocolate cupcakes",
      description:
        "Made with a moist chocolate cake and topped with a smooth chocolate buttercream frosting.",
      image: "https://place-hold.it/1000/666",
    },
    {
      title: "strawberry cupcakes",
      description:
        "Bursting with fresh, fruity flavor, our strawberry-infused treats are a delightful twist on classic cupcakes.",
      image: "https://place-hold.it/1000/666",
    },
  ];
  return (
    <Grid
      container
      sx={{
        px: { xs: 2, sm: 12, md: 24, xl: 36, xxl: 0 },
        py: { xs: 6, sm: 12, md: 24, xxl: 12 },
      }}
      spacing={5}
      justifyContent={"center"}
    >
      <Section
        title="cakes"
        description="Indulge in my delectable selection of freshly baked cakes, made with
          the finest ingredients and crafted with care."
        items={cakeItems}
      />
      <Section
        title="cupcakes"
        description="Explore our delectable cupcake collection: From classic flavors to creative concoctions, each bite is a miniature delight."
        items={cupcakeItems}
      />
    </Grid>
  );
}
