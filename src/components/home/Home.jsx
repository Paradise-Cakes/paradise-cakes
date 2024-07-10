import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  useGetDesserts,
  useGetDisplayImages,
} from "../../hooks/dessert/DessertHook";
import _ from "lodash";
import { border, Box, Container } from "@mui/system";
import { Button, useTheme, CircularProgress } from "@mui/material";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dessert from "../dessert/Dessert";
import { GiFlour } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { BsCake2 } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

function CustomTabPanel(props) {
  const { children, value, dessertType, ...other } = props;

  return (
    <Container
      sx={{
        marginTop: "3.5rem",
        marginBottom: "3.5rem",
        display: value === dessertType ? "block" : "none",
      }}
      maxWidth="false"
      role="tabpanel"
      id={`simple-tabpanel-${dessertType}`}
      aria-labelledby={`simple-tab-${dessertType}`}
      {...other}
    >
      {value === dessertType && children}
    </Container>
  );
}

export default function Home() {
  const getDessertsQuery = useGetDesserts();
  const {
    data: desserts,
    isLoading: isGetDessertsLoading,
    isSuccess: isGetDessertsSuccess,
  } = getDessertsQuery;
  const getDisplayImagesQuery = useGetDisplayImages();
  const {
    data: displayImages,
    isLoading: isGetDisplayImagesLoading,
    isSuccess: isGetDisplayImagesSuccess,
  } = getDisplayImagesQuery;
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
    <Container maxWidth="false">
      <Box>
        <Grid
          container
          sx={{
            flexWrap: { md: "wrap", lg: "nowrap" },
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            item
            container
            sx={{
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            xl={8}
            display={"flex"}
            flexWrap={"nowrap"}
          >
            <Grid item sx={{ marginRight: "1rem" }}>
              <img
                src={"https://placehold.co/1200x1600"}
                style={{
                  borderRadius: "1rem",
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item>
              <img
                src={"https://placehold.co/1200x1600"}
                style={{
                  borderRadius: "1rem",
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xl={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <h1
                style={{
                  fontSize: "3rem",
                  marginBottom: "0",
                  textAlign: "center",
                  marginRight: "1rem",
                }}
              >
                Desserts Made from Scratch
              </h1>
              <h3
                style={{
                  marginTop: ".5rem",
                  fontSize: "1.25rem",
                  textAlign: "center",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                The perfect dessert everytime, made for you. Place an order
                today!
              </h3>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  borderRadius: "1rem",
                  fontSize: "1.25rem",
                  display: "block",
                  margin: "0 auto",
                  width: "10rem",
                }}
              >
                Order Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: "4rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            marginBottom: "2.5rem",
          }}
        >
          Why order from paradise cakes?
        </h2>
        <Grid container justifyContent={"space-evenly"}>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "250px",
              }}
            >
              <GiFlour style={{ width: "50px", height: "50px" }} />
              <h3>Homemade</h3>
              <h4 style={{ textAlign: "center", marginTop: "0" }}>
                All my desserts are made from scratch with high quality
                ingredients.
              </h4>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "250px",
              }}
            >
              <MdDeliveryDining style={{ width: "50px", height: "50px" }} />
              <h3>Local Delivery</h3>
              <h4 style={{ textAlign: "center", marginTop: "0" }}>
                Delivery is available in the greater Austin, TX area.
              </h4>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "250px",
              }}
            >
              <BsCake2 style={{ width: "50px", height: "50px" }} />
              <h3>Customized Desserts</h3>
              <h4 style={{ textAlign: "center", marginTop: "0" }}>
                Personalize your cake to suit any occasion or preference!
              </h4>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ position: "relative" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            marginTop: "5rem",
            marginBottom: "2.5rem",
          }}
        >
          Some of my work
        </h2>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
          ref={scrollContainerRef}
        >
          {_.map(displayImages, (image) => (
            <img
              key={image}
              src={image}
              style={{
                border: "1px solid black",
                borderRadius: "1rem",
                margin: "0 0.5rem",
              }}
            />
          ))}
          {isRightButtonVisible && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                position: "absolute",
                opacity: "0.8",
                right: "0",
                top: "40%",
              }}
              onClick={handleScrollRight}
            >
              <FaAngleRight style={{ width: "50px", height: "50px" }} />
            </Button>
          )}
          {isLeftButtonVisible && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                position: "absolute",
                opacity: "0.8",
                left: "0",
                top: "40%",
              }}
              onClick={handleScrollLeft}
            >
              <FaAngleLeft style={{ width: "50px", height: "50px" }} />
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            marginTop: "5rem",
            marginBottom: "2.5rem",
          }}
        >
          Shop my bestsellers
        </h2>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          spacing={3}
          width={"100%"}
        >
          {_.map(_.shuffle(_.slice(desserts, 0, 3)), (d) => (
            <Grid key={d.dessert_id} item xs={8} sm={3} md={3} lg={3} xl={3}>
              <Dessert
                id={d.dessert_id}
                name={d.name}
                description={d.description}
                image_url={d.images[0]?.url}
              />
            </Grid>
          ))}
        </Grid>
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        ></Box>
      </Box>
      {/* <h2 style={{ textAlign: "center", marginBottom: "-1rem" }}>
        The perfect dessert every time, made for you.
      </h2>
      <h2 style={{ textAlign: "center" }}>Place an order today!</h2> */}
      {/* <Button
        id="order-now-btn"
        color="primary"
        variant="contained"
        sx={{
          margin: "0 auto",
          display: "block",
          fontSize: "1rem",
          textAlign: "left",
          width: "8rem",
          borderRadius: "2rem",
        }}
      >
        <Box display="flex" justifyContent={"space-between"}>
          <span style={{ color: "white" }}>Order now</span>
          <FaRegArrowAltCircleRight
            id="order-now-arrow"
            style={{
              width: "1.25rem",
              height: "1.25rem",
              color: "white",
              position: "relative",
              top: "0.2rem",
              right: "0.5rem",
            }}
          />
        </Box>
      </Button> */}
      {/* <Box>
        <h2 style={{ textAlign: "center" }}>What I make</h2>
      </Box> */}
      {/* <Box>
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          sx={{
            ".MuiTabs-indicator": {
              display: "none", // Remove the underline
            },
          }}
        >
          {_.map(
            _.sortBy(_.uniqBy(desserts, "dessert_type"), (d) => d.dessert_type),
            (dessert) => (
              <Tab
                key={dessert.dessert_type}
                label={dessert.dessert_type + "s"}
                value={dessert.dessert_type}
                sx={{
                  fontSize: "1rem",
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "1rem",
                  margin: "0 1rem",
                  "&.Mui-selected": {
                    color: "white",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            )
          )}
        </Tabs>
      </Box> */}
      {/* {isGetDessertsLoading ? (
        <CircularProgress sx={{ display: "block", margin: "5rem auto" }} />
      ) : (
        <Box>
          {_.map(_.uniqBy(desserts, "dessert_type"), (dessert) => (
            <CustomTabPanel value={value} dessertType={dessert.dessert_type}>
              <Grid container spacing={10} justifyContent={"center"}>
                {_.filter(desserts, { dessert_type: value })?.map((d) => (
                  <Grid key={d?.dessert_id} item xl={3}>
                    <Dessert
                      id={d?.dessert_id}
                      name={d?.name}
                      description={d?.description}
                      image_url={d?.images[0]?.url}
                    />
                  </Grid>
                ))}
              </Grid>
            </CustomTabPanel>
          ))}
        </Box>
      )} */}
    </Container>
  );
}
