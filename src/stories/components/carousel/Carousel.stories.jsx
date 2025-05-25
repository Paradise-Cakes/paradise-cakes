import Carousel from "../../../components/carousel/Carousel";
import { Grid } from "@mui/material";

export default {
  component: Carousel,
};

export const BaseWithImages = {
  args: {
    images: [
      {
        image_id: "IMAGE-1",
        url: "https://picsum.photos/id/237/200",
        position: 1,
        file_name: "image1.jpg",
        file_type: "jpg",
      },
      {
        image_id: "IMAGE-2",
        url: "https://picsum.photos/id/238/200",
        position: 2,
        file_name: "image2.jpg",
        file_type: "jpg",
      },
      {
        image_id: "IMAGE-3",
        url: "https://picsum.photos/id/239/200",
        position: 3,
        file_name: "image3.jpg",
        file_type: "jpg",
      },
    ],
    areImagesLoading: false,
  },
  render: (args) => (
    <Grid container>
      <Grid item lg={3} xs={12} sx={{ marginRight: { xs: "0", lg: "5rem" } }}>
        <Carousel {...args} />
      </Grid>
    </Grid>
  ),
};
