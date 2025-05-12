import { vi, describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CartItem from "../../../../components/navigation/cart/CartIem";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../../../src/theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../../../src/context/DrawerContext";
import { IngredientsContext } from "../../../../../src/context/IngredientsContext";
import { AuthContext } from "../../../../../src/context/AuthContext";
import { debug } from "vitest-preview";

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider value={{}}>
            <IngredientsContext.Provider value={{}}>
              <AuthContext.Provider value={{}}>
                <CartItem
                  id={"DESSERT-1 - 6 inch"}
                  name={"cake"}
                  size={"6 inch"}
                  price={12.0}
                  itemQuantity={2}
                  coverImage={undefined}
                />
              </AuthContext.Provider>
            </IngredientsContext.Provider>
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("CartItem Component", () => {
  test("handles removing a cart item", async () => {
    renderComponent();

    const removeCartItemButton = screen.getByTestId("remove-cart-item");
    await userEvent.click(removeCartItemButton);

    const cartItem = screen.queryByTestId("cart-item");
    expect(cartItem).not.toBeInTheDocument();
  });
});
