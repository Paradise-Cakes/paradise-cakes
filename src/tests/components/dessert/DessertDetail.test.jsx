import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DessertDetail from "../../../components/dessert/DessertDetail";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../context/IngredientsContext";
import * as reactRouterDom from "react-router-dom";
import { debug } from "vitest-preview";

let mockCart = [];
const mockAddToCart = vi.fn();
const mockOpenCart = vi.fn();

const mockIngredientsContextValue = {
  ingredientsOpen: false,
  setIngredientsOpen: vi.fn(),
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

reactRouterDom.useParams.mockReturnValue({ dessertId: "1" });

vi.mock("../../../store/useCartStore", () => ({
  useCartStore: () => ({
    addToCart: mockAddToCart,
    openCart: mockOpenCart,
    cart: mockCart,
  }),
}));

vi.mock("../../../hooks/dessert/DessertHook", () => ({
  useGetDessertById: () => ({
    data: {
      dessert_id: "1",
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
      special_tag: "FREE",
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
          <IngredientsContext.Provider value={mockIngredientsContextValue}>
            <DessertDetail />
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("DessertDetail Component", () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
    mockOpenCart.mockClear();
    mockCart = [];
  });

  test("renders the dessert details", () => {
    renderComponent();

    expect(screen.getByText(/^chocolate cake$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Delicious chocolate cake$/i)).toBeInTheDocument();
  });

  test("add to cart button updates price based on size of dessert", async () => {
    renderComponent();

    const smallSizeButton = screen.getByRole("button", { name: /small/i });
    const mediumSizeButton = screen.getByRole("button", { name: /medium/i });
    const largeSizeButton = screen.getByRole("button", { name: /large/i });

    await userEvent.click(smallSizeButton);
    expect(screen.getByText("Add to Cart - $10")).toBeInTheDocument();

    await userEvent.click(mediumSizeButton);
    expect(screen.getByText("Add to Cart - $15")).toBeInTheDocument();

    await userEvent.click(largeSizeButton);
    expect(screen.getByText("Add to Cart - $20")).toBeInTheDocument();
  });

  test("handles adding dessert to cart", async () => {
    renderComponent();

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    await userEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: "1 - small",
      dessert_id: "1",
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
      special_tag: "FREE",
      quantity: 1,
      price: 10,
      size: "small",
    });
    expect(mockOpenCart).toHaveBeenCalled();
  });

  test("handles adding same size dessert to cart", async () => {
    mockCart = [
      {
        dessert_id: "1",
        name: "Chocolate Cake",
        description: "Delicious chocolate cake",
        images: [
          {
            image_id: 1,
            url: "https://example.com/chocolate-cake.jpg",
          },
        ],
        prices: [
          { size: "small", base_price: 10 },
          { size: "medium", base_price: 15 },
          { size: "large", base_price: 20 },
        ],
        special_tag: "FREE",
        quantity: 1,
        price: 10,
        size: "small",
      },
    ];
    renderComponent();

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await userEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: "1 - small",
      dessert_id: "1",
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
      special_tag: "FREE",
      quantity: 1,
      price: 10,
      size: "small",
    });
    expect(mockOpenCart).toHaveBeenCalled();
  });

  test("handles opening ingredients modal", async () => {
    renderComponent();

    const ingredientsButton = screen.getByRole("button", {
      name: /ingredients/i,
    });
    await userEvent.click(ingredientsButton);

    expect(mockIngredientsContextValue.setIngredientsOpen).toHaveBeenCalled();
  });

  test("handles adding same dessert but with different size to cart", async () => {
    mockCart = [
      {
        id: "1 - small",
        dessert_id: "1",
        name: "Chocolate Cake",
        description: "Delicious chocolate cake",
        images: [
          {
            image_id: 1,
            url: "https://example.com/chocolate-cake.jpg",
          },
        ],
        prices: [
          { size: "small", base_price: 10 },
          { size: "medium", base_price: 15 },
          { size: "large", base_price: 20 },
        ],
        special_tag: "FREE",
        quantity: 1,
        price: 10,
        size: "small",
      },
    ];
    renderComponent();

    const mediumSizeButton = screen.getByRole("button", { name: /medium/i });
    await userEvent.click(mediumSizeButton);

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await userEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: "1 - medium",
      dessert_id: "1",
      name: "Chocolate Cake",
      description: "Delicious chocolate cake",
      images: [
        {
          image_id: 1,
          url: "https://example.com/chocolate-cake.jpg",
        },
      ],
      prices: [
        { size: "small", base_price: 10 },
        { size: "medium", base_price: 15 },
        { size: "large", base_price: 20 },
      ],
      special_tag: "FREE",
      quantity: 1,
      price: 15,
      size: "medium",
    });
    expect(mockOpenCart).toHaveBeenCalled();
  });
});
