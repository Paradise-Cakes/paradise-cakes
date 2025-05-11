import { vi, describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Navbar from "../../../components/navigation/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../context/DrawerContext";
import { IngredientsContext } from "../../../context/IngredientsContext";
import { AuthContext } from "../../../context/AuthContext";
import { debug } from "vitest-preview";

const mockProtectedNavigate = vi.fn();
const mockProtectedAdminNavigate = vi.fn();
const mockOpenCart = vi.fn();
const mockCart = [
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

vi.mock("../../../../src/hooks/ProtectedNavigateHook", () => ({
  __esModule: true,
  useProtectedNavigate: () => mockProtectedNavigate,
  useProtectedAdminNavigate: () => mockProtectedAdminNavigate,
}));

const mockSetDrawerOpen = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // preserve other exports
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../store/useCartStore", () => ({
  useCartStore: () => ({
    openCart: mockOpenCart,
    cart: mockCart,
  }),
}));

function renderComponent(drawerOpen, isAuthenticated, isAdmin) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider
            value={{ drawerOpen: drawerOpen, setDrawerOpen: mockSetDrawerOpen }}
          >
            <AuthContext.Provider
              value={{ isAuthenticated, isAdmin, user: {} }}
            >
              <Navbar />
            </AuthContext.Provider>
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("Navbar Component", () => {
  test("handles going to the home page when logo is clicked", async () => {
    renderComponent(true, false, false);

    const logo = screen.getByRole("img", { name: /app-logo-1/i });
    await userEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("handles opening and closing the drawer", async () => {
    renderComponent(false, false, false);

    const menuButtonOpen = screen.getByTestId("menu-button-open");
    await userEvent.click(menuButtonOpen);

    expect(mockSetDrawerOpen).toHaveBeenCalledWith(true);

    renderComponent(true, false, false);

    const menuButtonClose = screen.getByTestId("menu-button-close");
    await userEvent.click(menuButtonClose);

    expect(mockSetDrawerOpen).toHaveBeenCalledWith(false);
  });

  test("handles navigating to the account page", async () => {
    renderComponent(false, true, false);

    const accountButton = screen.getByTestId("account-button");
    await userEvent.click(accountButton);

    expect(mockProtectedNavigate).toHaveBeenCalledWith("/account");
  });

  test("handles navigating to the admin page", async () => {
    renderComponent(false, true, true);

    const adminButton = screen.getByTestId("admin-button");
    await userEvent.click(adminButton);

    expect(mockProtectedAdminNavigate).toHaveBeenCalledWith("/admin/home");
  });

  test("handles opening the cart", async () => {
    renderComponent(false, false, false);

    const cartButton = screen.getByTestId("cart-button");
    await userEvent.click(cartButton);

    expect(mockOpenCart).toHaveBeenCalled();
  });
});
