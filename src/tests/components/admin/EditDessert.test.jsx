import { vi, describe, test, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import EditDessert from "../../../components/admin/EditDessert";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsProvider } from "../../../context/IngredientsContext";
import userEvent from "@testing-library/user-event";
import { debug } from "vitest-preview";
import axios from "axios";
import * as reactRouterDom from "react-router-dom";
import { upload } from "@testing-library/user-event/dist/cjs/utility/upload.js";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

reactRouterDom.useParams.mockReturnValue({ dessertId: "DESSERT-1" });

vi.mock("axios");

const patchDessertMock = vi.fn();

const mockConsoleError = vi
  .spyOn(console, "error")
  .mockImplementation(() => {});

vi.mock("../../../hooks/dessert/DessertHook", () => ({
  usePatchDessert: () => ({
    mutateAsync: patchDessertMock,
    isLoading: false,
    error: null,
  }),
  useGetDessertById: () => ({
    data: {
      dessert_id: "DESSERT-1",
      name: "Chocolate Cake",
      description: "A delicious chocolate cake  ",
      dessert_type: "cake",
      created_at: 1734004800,
      last_updated_at: 1734004800,
      visible: true,
      prices: [
        {
          dessert_id: "DESSERT-1",
          size: "6 inch",
          base_price: 15.0,
          discount: 0.0,
        },
        {
          dessert_id: "DESSERT-1",
          size: "8 inch",
          base_price: 140.0,
          discount: 0.0,
        },
        {
          dessert_id: "DESSERT-1",
          size: "10 inch",
          base_price: 120.0,
          discount: 0.0,
        },
      ],
      ingredients: ["flour", "sugar", "cocoa", "butter", "eggs"],
      images: [
        {
          image_id: "IMAGE-1",
          url: "https://example.com/image1.jpg",
          position: 1,
          file_name: "image1.jpg",
          file_type: "jpg",
        },
      ],
      special_tag: "on sale",
    },
    isLoading: false,
    isSuccess: true,
  }),
}));

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsProvider>
            <EditDessert />
          </IngredientsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("EditDessert Component", () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the edit dessert form", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /edit dessert/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });

  test("calls patchDessert on form submission with data", async () => {
    patchDessertMock.mockResolvedValue({
      data: {
        images: [
          {
            upload_url: "https://example.com/upload-url",
          },
        ],
      },
    });

    renderComponent();

    const dessertTagsInput = screen.getByText(/new!/i);
    await userEvent.click(dessertTagsInput);

    const updateButton = screen.getByTestId("create-edit-submit-button");
    await userEvent.click(updateButton);

    expect(patchDessertMock).toHaveBeenCalled();
  });

  test("handles uploading new image using file input", async () => {
    renderComponent();

    const dessertImagesInput = screen.getByTestId("image-upload-input");
    const file = new File(["image"], "dessert.jpg", { type: "image/jpeg" });
    await userEvent.upload(dessertImagesInput, file);

    expect(dessertImagesInput.files[0]).toEqual(file);

    const updateButton = screen.getByTestId("create-edit-submit-button");
    await userEvent.click(updateButton);

    expect(patchDessertMock).toHaveBeenCalled();
  });

  test("handles uploading image to S3 upload URL", async () => {
    patchDessertMock.mockResolvedValue({
      data: {
        images: [
          {
            iamge_id: "IMAGE-1",
            upload_url: "https://example.com/upload-url",
            url: "https://example.com/image1.jpg",
            position: 1,
            file_name: "image1.jpg",
            file_type: "jpg",
          },
          {
            upload_url: "https://example.com/upload-url-2",
            url: "https://example.com/image2.jpg",
            position: 2,
            file_name: "image2.jpg",
            file_type: "jpg",
          },
        ],
      },
    });

    renderComponent();

    const dessertImagesInput = screen.getByTestId("image-upload-input");
    const file = new File(["image"], "dessert.jpg", { type: "image/jpeg" });
    await userEvent.upload(dessertImagesInput, file);

    const updateButton = screen.getByTestId("create-edit-submit-button");
    await userEvent.click(updateButton);

    expect(axios.put).toHaveBeenCalledWith(
      "https://example.com/upload-url-2",
      file,
      {
        headers: {
          "Content-Type": file.type,
        },
      }
    );
  });

  test("handles error during image upload", async () => {
    patchDessertMock.mockResolvedValue({
      data: {
        images: [
          {
            image_id: "IMAGE-1",
            url: "https://example.com/image1.jpg",
            position: 1,
            file_name: "image1.jpg",
            file_type: "jpg",
            upload_url: "https://example.com/upload-url",
          },
          {
            upload_url: "https://example.com/upload-url-2",
          },
        ],
      },
    });

    axios.put = vi.fn().mockRejectedValueOnce(new Error("Upload failed"));

    renderComponent();

    const dessertImagesInput = screen.getByTestId("image-upload-input");
    const file = new File(["image"], "dessert.jpg", { type: "image/jpeg" });
    await userEvent.upload(dessertImagesInput, file);

    const updateButton = screen.getByTestId("create-edit-submit-button");
    await userEvent.click(updateButton);

    expect(mockConsoleError).toHaveBeenCalledWith(
      "Upload error:",
      expect.any(Error)
    );

    expect(mockConsoleError).not.toHaveBeenCalledWith(
      "Error during submission:",
      expect.anything()
    );
  });
});
