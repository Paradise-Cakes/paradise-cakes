import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useGetDesserts } from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { Box, Container } from "@mui/system";
import { Button, useTheme, CircularProgress } from "@mui/material";
import { GiFlour } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { BsCake2 } from "react-icons/bs";
import { HomeContainer } from "./HomeStyles";

export default function Home() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;
  const theme = useTheme();
  const [value, setValue] = useState("cake");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    const scrollAmount = 800; // Adjust this value as needed
    if (scrollContainerRef.current) {
      const { scrollRight, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const maxScrollRight = scrollWidth - clientWidth;
      const newScrollRight = Math.min(
        scrollRight + scrollAmount,
        maxScrollRight
      );
      scrollContainerRef.current.scrollTo({
        left: newScrollRight,
        behavior: "smooth",
      });
    }
  };
  const handleScrollRight = () => {
    const scrollAmount = 800; // Adjust this value as needed
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const newScrollLeft = Math.min(scrollLeft + scrollAmount, maxScrollLeft);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const [isRightButtonVisible, setIsRightButtonVisible] = useState(true);
  const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);

  const checkRightScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      // If scrollLeft + clientWidth >= scrollWidth, we are at the end
      if (scrollLeft + clientWidth >= scrollWidth) {
        setIsRightButtonVisible(false);
      } else {
        setIsRightButtonVisible(true);
      }
    }
  };

  const checkLeftScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      if (scrollLeft === 0) {
        setIsLeftButtonVisible(false);
      } else {
        setIsLeftButtonVisible(true);
      }
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener(
        "scroll",
        checkRightScrollPosition
      );
      scrollContainerRef.current.addEventListener(
        "scroll",
        checkLeftScrollPosition
      );
    }
    // Cleanup the event listener on component unmount
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          checkRightScrollPosition
        );
      }
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          checkLeftScrollPosition
        );
      }
    };
  }, []);

  return (
    <HomeContainer maxWidth={false}>
      <Grid className="home-grid-container-1" container>
        <Grid className="home-grid-item-1" item container xl={8}>
          <Grid className="home-grid-item-img-1" item>
            <img src={"https://placehold.co/1200x1600"} />
          </Grid>
          <Grid className="home-grid-item-img-2" item>
            <img src={"https://placehold.co/1200x1600"} />
          </Grid>
        </Grid>
        <Grid className="home-grid-item-2" item container xl={4}>
          <Box className="home-grid-item-2-box">
            <h1 className="home-hero-heading">Desserts Made from Scratch</h1>
            <h4 className="home-hero-subheading">
              The perfect dessert everytime, made for you. Place an order today!
            </h4>
            <Button
              className="home-hero-cta-button"
              color="primary"
              variant="contained"
            >
              Order Now
            </Button>
          </Box>
        </Grid>
      </Grid>
      <h2 className="home-section-title">Why order from paradise cakes?</h2>
      <Grid
        className="home-grid-container-2"
        container
        justifyContent={"space-evenly"}
      >
        <Grid item>
          <Box className="home-feature-box">
            <GiFlour style={{ width: "50px", height: "50px" }} />
            <h3 className="home-feature-title">Homemade</h3>
            <h4 className="home-feature-description">
              All my desserts are made from scratch with high quality
              ingredients.
            </h4>
          </Box>
        </Grid>
        <Grid item>
          <Box className="home-feature-box">
            <MdDeliveryDining style={{ width: "50px", height: "50px" }} />
            <h3 className="home-feature-title">Local Delivery</h3>
            <h4 className="home-feature-description">
              Delivery is available in the greater Austin, TX area.
            </h4>
          </Box>
        </Grid>
        <Grid item>
          <Box className="home-feature-box">
            <BsCake2 style={{ width: "50px", height: "50px" }} />
            <h3 className="home-feature-title">Customized Desserts</h3>
            <h4 className="home-feature-description">
              Personalize your cake to suit any occasion or preference!
            </h4>
          </Box>
        </Grid>
      </Grid>
    </HomeContainer>
  );
}
