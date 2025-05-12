import { vi, describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Cart from "../../../../components/navigation/cart/Cart";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../../../src/theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../../../src/context/DrawerContext";
import { IngredientsContext } from "../../../../../src/context/IngredientsContext";
import { AuthContext } from "../../../../../src/context/AuthContext";
import { debug } from "vitest-preview";

const mockNavigate = vi.fn();
const mockCartOpen = true;
const mockOpenCart = vi.fn();
const mockCloseCart = vi.fn();
let mockCart = [
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
  },
];

vi.mock("../../../../store/useCartStore", () => ({
  useCartStore: () => ({
    cartOpen: mockCartOpen,
    openCart: mockOpenCart,
    closeCart: mockCloseCart,
    cart: mockCart,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // preserve other exports
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider value={{}}>
            <AuthContext.Provider
              value={{
                user: { id: "user123", role: "user" },
                isLoggedIn: true,
                login: vi.fn(),
                logout: vi.fn(),
              }}
            >
              <IngredientsContext.Provider value={undefined}>
                <Cart />
              </IngredientsContext.Provider>
            </AuthContext.Provider>
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("Cart Component", () => {
  test("handles closing the cart", async () => {
    renderComponent(true);

    const closeButton = screen.getByTestId("close-cart");
    await userEvent.click(closeButton);

    expect(mockCloseCart).toHaveBeenCalled();

    renderComponent(false);
  });

  test("handles entering zip code", async () => {
    renderComponent(true);

    const zipCodeInput = within(screen.getByTestId("zip-code")).getByRole(
      "textbox"
    );
    await userEvent.type(zipCodeInput, "12345");

    expect(zipCodeInput.value).toBe("12345");
  });

  test("handles navigating to the shop page", async () => {
    mockCart = [];
    renderComponent(true);

    const shopButton = screen.getByTestId("shop-all-button");
    await userEvent.click(shopButton);

    expect(mockNavigate).toHaveBeenCalledWith("/shop");
  });
});
