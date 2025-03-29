import React from "react";
import {
  Grid,
  Typography,
  Box,
  Hidden,
  useTheme,
  Skeleton,
  Container,
} from "@mui/material";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { margin } from "@mui/system";

export default function Carousel({ images, areImagesLoading }) {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  // const old = () => {
  //   return (
  //     <Grid item container sx={{ userSelect: "none" }}>
  //       <Hidden lgDown>
  //         <Grid
  //           md={1.5}
  //           lg={1.8}
  //           item
  //           sx={{
  //             display: "flex",
  //             justifyContent: "start",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             marginRight: "24px",
  //           }}
  //         >
  //           {!areImagesLoading
  //             ? images?.map((i, index) => (
  //                 <img
  //                   key={i.image_id}
  //                   src={i.url}
  //                   style={{
  //                     borderRadius: "12px",
  //                     margin: "8px",
  //                     cursor: "pointer",
  //                     aspectRatio: "1/1",
  //                     width: "100%",
  //                     border:
  //                       index === currentImageIndex
  //                         ? `5px solid ${theme.palette.error.main}`
  //                         : "",
  //                   }}
  //                   width={"100px"}
  //                   height={"100px"}
  //                   onClick={() => handleImageChange(index)}
  //                 />
  //               ))
  //             : images?.map((i, index) => (
  //                 <Skeleton
  //                   key={i.url}
  //                   variant="rectangular"
  //                   width="100%"
  //                   sx={{ pt: "100%", margin: "8px", borderRadius: "12px" }}
  //                 />
  //               ))}
  //         </Grid>
  //       </Hidden>
  //       <Grid
  //         md={8}
  //         lg={8}
  //         item
  //         sx={{
  //           position: "relative",
  //         }}
  //         justifyContent="center"
  //       >
  //         {!areImagesLoading ? (
  //           <img
  //             src={images[currentImageIndex]?.url}
  //             style={{
  //               borderRadius: "12px",
  //               aspectRatio: "1/1",
  //               width: "100%",
  //               height: "100%",
  //             }}
  //             alt="dessert"
  //           />
  //         ) : (
  //           <Skeleton
  //             variant="rectangular"
  //             width="100%"
  //             sx={{ pt: "100%", borderRadius: "12px" }}
  //           />
  //         )}
  //         {images?.length > 1 && (
  //           <Box>
  //             <RiArrowRightSLine
  //               style={{
  //                 width: "64px",
  //                 height: "64px",
  //                 position: "absolute",
  //                 top: "50%",
  //                 right: "0px",
  //                 color: theme.palette.primary.main,
  //                 cursor: "pointer",
  //               }}
  //               onClick={() => {
  //                 handleImageChange((currentImageIndex + 1) % images.length);
  //               }}
  //             />
  //             <RiArrowLeftSLine
  //               style={{
  //                 width: "64px",
  //                 height: "64px",
  //                 position: "absolute",
  //                 top: "50%",
  //                 left: "0px",
  //                 color: theme.palette.primary.main,
  //                 cursor: "pointer",
  //               }}
  //               onClick={() => {
  //                 handleImageChange(
  //                   (currentImageIndex - 1 + images.length) % images.length
  //                 );
  //               }}
  //             />
  //           </Box>
  //         )}
  //       </Grid>
  //     </Grid>
  //   );
  // };

  return (
    <Container mt={6} maxWidth="false">
      <Grid container justifyContent="space-between">
        <Hidden lgDown>
          <Grid item lg={1.5} justifyContent={"center"}>
            {!areImagesLoading
              ? images?.map((i, index) => (
                  <Box
                    key={i.image_id}
                    onClick={() => handleImageChange(index)}
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      position: "relative",
                      margin: "8px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      overflow: "hidden",
                      border:
                        index === currentImageIndex
                          ? `5px solid ${theme.palette.error.main}`
                          : "1px solid transparent",
                    }}
                  >
                    <img
                      src={i.url}
                      alt={`Image ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </Box>
                ))
              : images?.map((i, index) => (
                  <Box
                    key={i.url}
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      position: "relative",
                      margin: "8px",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                      }}
                    />
                  </Box>
                ))}
          </Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              position: "relative",
              margin: "8px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {!areImagesLoading ? (
              <img
                src={images[currentImageIndex]?.url}
                alt="dessert"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                }}
              />
            )}
            {images?.length > 1 && (
              <Box>
                <RiArrowRightSLine
                  style={{
                    width: "64px",
                    height: "64px",
                    position: "absolute",
                    top: "50%",
                    right: "0px",
                    color: theme.palette.primary.main,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleImageChange((currentImageIndex + 1) % images.length);
                  }}
                />
                <RiArrowLeftSLine
                  style={{
                    width: "64px",
                    height: "64px",
                    position: "absolute",
                    top: "50%",
                    left: "0px",
                    color: theme.palette.primary.main,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleImageChange(
                      (currentImageIndex - 1 + images.length) % images.length
                    );
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
