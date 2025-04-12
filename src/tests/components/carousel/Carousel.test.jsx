import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Carousel from "../../../components/carousel/Carousel";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";

describe("Carousel Component", () => {
  test("renders the carousel with mini images", () => {
    const images = [
      {
        image_id: 1,
        url: "https://example.com/image1.jpg",
      },
      {
        image_id: 2,
        url: "https://example.com/image2.jpg",
      },
    ];

    render(
      <ThemeProvider theme={THEME}>
        <Carousel images={images} areImagesLoading={false} />
      </ThemeProvider>
    );

    expect(screen.getByAltText("Image 0")).toBeInTheDocument();
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
  });

  test("renders the carousel with skeletons when loading", () => {
    const images = [
      {
        image_id: 1,
        url: "https://example.com/image1.jpg",
      },
      {
        image_id: 2,
        url: "https://example.com/image2.jpg",
      },
    ];

    render(
      <ThemeProvider theme={THEME}>
        <Carousel images={images} areImagesLoading={true} />
      </ThemeProvider>
    );

    screen.getAllByTestId("carousel-mini-image-skeleton").forEach((el) => {
      expect(el).toBeVisible();
    });
    expect(screen.getByTestId("carousel-image-skeleton")).toBeVisible();
  });

  test("renders the carousel with main image", () => {
    const images = [
      {
        image_id: 0,
        url: "https://example.com/image0.jpg",
      },
      {
        image_id: 1,
        url: "https://example.com/image1.jpg",
      },
    ];

    render(
      <ThemeProvider theme={THEME}>
        <Carousel images={images} areImagesLoading={false} />
      </ThemeProvider>
    );

    expect(screen.getByTestId("carousel-image")).toBeVisible();
  });

  test("handles main image change on mini image click", async () => {
    const images = [
      {
        image_id: 0,
        url: "https://example.com/image0.jpg",
      },
      {
        image_id: 1,
        url: "https://example.com/image1.jpg",
      },
    ];

    render(
      <ThemeProvider theme={THEME}>
        <Carousel images={images} areImagesLoading={false} />
      </ThemeProvider>
    );

    await userEvent.click(screen.getByAltText("Image 1"));

    expect(screen.getByTestId("carousel-image")).toHaveAttribute(
      "src",
      "https://example.com/image1.jpg"
    );
  });

  test("handles main image change on R/L arrow click", async () => {
    const images = [
      {
        image_id: 0,
        url: "https://example.com/image0.jpg",
      },
      {
        image_id: 1,
        url: "https://example.com/image1.jpg",
      },
      {
        image_id: 2,
        url: "https://example.com/image2.jpg",
      },
    ];

    render(
      <ThemeProvider theme={THEME}>
        <Carousel images={images} areImagesLoading={false} />
      </ThemeProvider>
    );

    expect(screen.getByTestId("carousel-image")).toHaveAttribute(
      "src",
      "https://example.com/image0.jpg"
    );

    await userEvent.click(screen.getByTestId("carousel-right-arrow"));

    expect(screen.getByTestId("carousel-image")).toHaveAttribute(
      "src",
      "https://example.com/image1.jpg"
    );

    await userEvent.click(screen.getByTestId("carousel-left-arrow"));

    expect(screen.getByTestId("carousel-image")).toHaveAttribute(
      "src",
      "https://example.com/image0.jpg"
    );
  });
});
