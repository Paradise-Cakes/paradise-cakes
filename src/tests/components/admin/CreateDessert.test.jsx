import { vi, describe, test, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CreateDessert from "../../../components/admin/CreateDessert";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsProvider } from "../../../context/IngredientsContext";
import userEvent from "@testing-library/user-event";
import { debug } from "vitest-preview";
import axios from "axios";

vi.mock("axios");

const postDessertMock = vi.fn();

const mockConsoleError = vi
  .spyOn(console, "error")
  .mockImplementation(() => {});

vi.mock("../../../hooks/dessert/DessertHook", () => ({
  usePostDessert: () => ({
    mutateAsync: postDessertMock,
    isLoading: false,
    error: null,
  }),
}));

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsProvider>
            <CreateDessert />
          </IngredientsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

async function fillDessertForm(options) {
  const includeMultipleImages = options?.includeMultipleImages || false;

  const dessertNameInput = screen.getByLabelText(/name/i);
  await userEvent.type(dessertNameInput, "Chocolate Cake");

  const dessertDescriptionInput = screen.getByLabelText(/description/i);
  await userEvent.type(dessertDescriptionInput, "Delicious chocolate cake");

  const dessertTypeInput = screen.getByLabelText(/dessert type/i);
  await userEvent.click(dessertTypeInput);
  await userEvent.click(screen.getByRole("option", { name: "Cake" }));

  const dessertIngredients = screen.getByLabelText(/ingredients/i);
  await userEvent.type(dessertIngredients, "Flour{enter}");
  await userEvent.type(dessertIngredients, "Sugar{enter}");
  await userEvent.type(dessertIngredients, "Cocoa{enter}");
  await userEvent.type(dessertIngredients, "Eggs{enter}");
  await userEvent.type(dessertIngredients, "Butter{enter}");

  const dessertSizesInput = within(
    screen.getByTestId("dessert-size-select-0")
  ).getByRole("combobox");
  await userEvent.click(dessertSizesInput);
  await userEvent.click(screen.getByRole("option", { name: "6 inch" }));

  const dessertPriceInput = screen.getByLabelText(/price/i);
  await userEvent.type(dessertPriceInput, "20.25");

  const dessertImagesInput = screen.getByTestId("image-upload-input");
  const file = new File(["image"], "dessert.jpg", { type: "image/jpeg" });
  await userEvent.upload(dessertImagesInput, file);

  const dessertTagsInput = screen.getByText(/on sale/i);
  await userEvent.click(dessertTagsInput);

  if (includeMultipleImages) {
    const file2 = new File(["image"], "dessert2.jpg", { type: "image/jpeg" });
    await userEvent.upload(dessertImagesInput, file2);
  }

  await userEvent.click(screen.getByText(/on sale/i));
}

describe("CreateDessert Component", () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the create dessert form", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /new dessert/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  test("calls postDessert on form submission with data", async () => {
    postDessertMock.mockResolvedValue({
      data: {
        images: [
          {
            upload_url: "https://example.com/upload-url",
          },
        ],
      },
    });

    renderComponent();
    await fillDessertForm();

    const createButton = screen.getByTestId("create-edit-submit-button");
    await userEvent.click(createButton);

    expect(postDessertMock).toHaveBeenCalled();
  });

  test("logs error if uploading image to S3 upload url fails", async () => {
    postDessertMock.mockResolvedValue({
      data: {
        images: [
          {
            upload_url: "https://example.com/upload-url",
          },
          {
            upload_url: "https://example.com/upload-url-2",
          },
        ],
      },
    });

    axios.put = vi
      .fn()
      .mockResolvedValueOnce({}) // First upload succeeds
      .mockRejectedValueOnce(new Error("Upload failed")); // Second upload fails

    renderComponent();
    await fillDessertForm({ includeMultipleImages: true });

    const createButton = screen.getByTestId("create-edit-submit-button");
    await userEvent.click(createButton);

    expect(mockConsoleError).toHaveBeenCalledWith(
      "Upload error:",
      expect.any(Error)
    );

    expect(mockConsoleError).not.toHaveBeenCalledWith(
      "Error during submission:",
      expect.anything()
    );
  });

  test("logs error if postDessert fails", async () => {
    postDessertMock.mockRejectedValue(new Error("Post dessert failed"));

    renderComponent();
    await fillDessertForm();

    const createButton = screen.getByTestId("create-edit-submit-button");
    await userEvent.click(createButton);

    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error during submission:",
      expect.any(Error)
    );

    expect(mockConsoleError).not.toHaveBeenCalledWith(
      "Upload Error:",
      expect.anything()
    );
  });
});
