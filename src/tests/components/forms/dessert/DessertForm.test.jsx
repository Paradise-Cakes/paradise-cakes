import { vi, describe, test, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import DessertForm from "../../../../components/forms/dessert/DessertForm";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../../context/IngredientsContext";
import { debug } from "vitest-preview";

let mockSubmitForm = vi.fn();

const cake = {
  dessert_id: "1",
  name: "Chocolate Cake",
  description: "Delicious chocolate cake",
  dessert_type: "cake",
  images: [
    {
      image_id: 1,
      url: "https://example.com/chocolate-cake.jpg",
    },
  ],
  prices: [
    { size: "6 inch", base_price: 10 },
    { size: "8 inch", base_price: 15 },
    { size: "10 inch", base_price: 20 },
  ],
  special_tag: "FREE",
};

const cupcake = {
  dessert_id: "1",
  name: "Chocolate Cake",
  description: "Delicious chocolate cupcakes",
  dessert_type: "cupcake",
  images: [
    {
      image_id: 1,
      url: "https://example.com/chocolate-cake.jpg",
    },
  ],
  prices: [
    { size: "Half Dozen", base_price: 10 },
    { size: "Dozen", base_price: 15 },
  ],
  special_tag: "FREE",
};

const cookie = {
  dessert_id: "1",
  name: "Chocolate Chip Cookies",
  description: "Delicious chocolate chip cookies",
  dessert_type: "cookie",
  images: [
    {
      image_id: 1,
      url: "https://example.com/chocolate-chip-cookies.jpg",
    },
  ],
  prices: [{ size: "Dozen", base_price: 15 }],
  special_tag: "FREE",
};

const pie = {
  dessert_id: "1",
  name: "Chocolate Pie",
  description: "Delicious chocolate pie",
  dessert_type: "pie",
  images: [
    {
      image_id: 1,
      url: "https://example.com/chocolate-pie.jpg",
    },
  ],
  prices: [{ size: "9 inch", base_price: 10 }],
  special_tag: "FREE",
};

const fakeDessert = {
  dessert_id: "1",
  name: "Chocolate Cake",
  description: "Delicious chocolate cake",
  dessert_type: "fake",
  images: [
    {
      image_id: 1,
      url: "https://example.com/chocolate-cake.jpg",
    },
  ],
  prices: [],
  special_tag: "FREE",
};

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

  let dessertSizesInput = within(
    screen.getByTestId("dessert-size-select-0")
  ).getByRole("combobox");
  await userEvent.click(dessertSizesInput);
  await userEvent.click(screen.getByRole("option", { name: "6 inch" }));

  let dessertPriceInput = within(
    screen.getByTestId("dessert-price-input-0")
  ).getByRole("textbox");
  await userEvent.type(dessertPriceInput, "20.25");

  const addPriceButton = screen.getByTestId("add-price-button");
  await userEvent.click(addPriceButton);

  dessertSizesInput = within(
    screen.getByTestId("dessert-size-select-1")
  ).getByRole("combobox");
  await userEvent.click(dessertSizesInput);
  await userEvent.click(screen.getByRole("option", { name: "8 inch" }));

  dessertPriceInput = within(
    screen.getByTestId("dessert-price-input-1")
  ).getByRole("textbox");
  await userEvent.type(dessertPriceInput, "25.50");

  const dessertImagesInput = screen.getByTestId("image-upload-input");
  const file = new File(["image"], "dessert.jpg", { type: "image/jpeg" });
  await userEvent.upload(dessertImagesInput, file);

  const dessertTagsInput = screen.getByText(/on sale/i);
  await userEvent.click(dessertTagsInput);

  if (includeMultipleImages) {
    const file2 = new File(["image"], "dessert2.jpg", { type: "image/jpeg" });
    await userEvent.upload(dessertImagesInput, file2);

    const file3 = new File(["image"], "dessert3.jpg", { type: "image/jpeg" });
    await userEvent.upload(dessertImagesInput, file3);
  }

  await userEvent.click(screen.getByText(/on sale/i));
  await userEvent.click(screen.getByTestId("dessert-visible-switch"));
}

function renderComponent(dessert) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={undefined}>
            <DessertForm dessert={dessert} onSubmitForm={mockSubmitForm} />
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("DessertForm Component", () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the appropriate size select options based on dessert type", async () => {
    renderComponent(cake);

    const dessertTypeInput = screen.getByLabelText(/dessert type/i);
    await userEvent.click(dessertTypeInput);
    await userEvent.click(screen.getByRole("option", { name: "Cake" }));

    const dessertSizesInput = within(
      screen.getByTestId("dessert-size-select-0")
    ).getByRole("combobox");
    await userEvent.click(dessertSizesInput);
    expect(screen.getByRole("option", { name: "6 inch" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "8 inch" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "10 inch" })).toBeInTheDocument();

    renderComponent(cupcake);

    await userEvent.click(dessertTypeInput);
    await userEvent.click(screen.getByRole("option", { name: "Cupcake" }));

    await userEvent.click(dessertSizesInput);
    expect(
      screen.getByRole("option", { name: "Half Dozen" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Dozen" })).toBeInTheDocument();

    renderComponent(cookie);

    await userEvent.click(dessertTypeInput);
    await userEvent.click(screen.getByRole("option", { name: "Cookie" }));

    await userEvent.click(dessertSizesInput);
    expect(screen.getByRole("option", { name: "Dozen" })).toBeInTheDocument();

    renderComponent(pie);

    await userEvent.click(dessertTypeInput);
    await userEvent.click(screen.getByRole("option", { name: "Pie" }));

    await userEvent.click(dessertSizesInput);
    expect(screen.getByRole("option", { name: "9 inch" })).toBeInTheDocument();

    renderComponent(fakeDessert);

    await userEvent.click(dessertTypeInput);
    expect(dessertSizesInput.innerText).toBe(undefined);
  });

  test("handles submitting the form", async () => {
    renderComponent();

    await fillDessertForm();

    const submitButton = screen.getByRole("button", { name: /create/i });
    await userEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalled();
  }, 6500);

  test("handles removing a price", async () => {
    renderComponent();

    await fillDessertForm();

    const removePriceButton = screen.getByTestId("remove-price-button-1");
    await userEvent.click(removePriceButton);

    expect(
      screen.queryByTestId("dessert-size-select-1")
    ).not.toBeInTheDocument();
  });

  test("handles adding a price", async () => {
    renderComponent();

    await fillDessertForm();

    const addPriceButton = screen.getByTestId("add-price-button");
    await userEvent.click(addPriceButton);

    expect(screen.getByTestId("dessert-size-select-2")).toBeInTheDocument();
  });

  test("handles not adding same ingredient to list", async () => {
    renderComponent();

    const dessertIngredients = screen.getByLabelText(/ingredients/i);
    await userEvent.type(dessertIngredients, "flour{enter}");

    expect(
      screen.queryByRole("button", { name: "flour" })
    ).not.toBeInTheDocument();
  });

  test("handles deleting an ingredient from the list", async () => {
    renderComponent();

    const dessertIngredients = screen.getByLabelText(/ingredients/i);
    await userEvent.type(dessertIngredients, "flour{enter}");

    const flourChip = screen.getByText("FLOUR").closest(".MuiChip-root");
    const deleteFlourChipButton = within(flourChip).getByTestId("CancelIcon");

    await userEvent.click(deleteFlourChipButton);

    expect(
      screen.queryByRole("button", { name: "flour" })
    ).not.toBeInTheDocument();
  });

  test("handles removing an image", async () => {
    renderComponent();

    await fillDessertForm({ includeMultipleImages: true });
    const removeImageButton = screen.getByTestId("remove-image-button-2");
    await userEvent.click(removeImageButton);

    expect(screen.queryByTestId("image-preview-2")).not.toBeInTheDocument();
  });

  test("handles repositioning an image", async () => {
    renderComponent();

    await fillDessertForm({ includeMultipleImages: true });

    const dessertImagePositionSelect = within(
      screen.getByTestId("image-order-select-1")
    ).getByRole("combobox");
    await userEvent.click(dessertImagePositionSelect);
    await userEvent.click(screen.getByRole("option", { name: "1" }));

    const imagePreview = within(
      screen.getByTestId("image-preview-0")
    ).getByRole("img");

    expect(imagePreview).toHaveAttribute("alt", "dessert2.jpg");
  });

  test("handles trying to delete the first size and price", async () => {
    renderComponent();

    const dessertTypeInput = screen.getByLabelText(/dessert type/i);
    await userEvent.click(dessertTypeInput);
    await userEvent.click(screen.getByRole("option", { name: "Cake" }));

    let dessertSizesInput = within(
      screen.getByTestId("dessert-size-select-0")
    ).getByRole("combobox");
    await userEvent.click(dessertSizesInput);
    await userEvent.click(screen.getByRole("option", { name: "6 inch" }));

    let dessertPriceInput = within(
      screen.getByTestId("dessert-price-input-0")
    ).getByRole("textbox");
    await userEvent.type(dessertPriceInput, "20.25");

    const removePriceButton = screen.getByTestId("remove-price-button-0");
    await userEvent.click(removePriceButton);

    expect(screen.getByTestId("dessert-size-select-0")).toBeInTheDocument();
  });

  test("handles not adding empty space ingredients to list", async () => {
    renderComponent();

    const dessertIngredients = screen.getByLabelText(/ingredients/i);
    await userEvent.type(dessertIngredients, " {enter}");

    expect(screen.queryByRole("button", { name: " " })).not.toBeInTheDocument();
  });
});
