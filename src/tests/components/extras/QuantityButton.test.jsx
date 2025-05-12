import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuantityButton from "../../../components/extras/QuantityButton";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../context/IngredientsContext";

const mockUpdateCartItemQuantity = vi.fn();
const mockSetQuantity = vi.fn((fn) => {
  if (typeof fn === "function") {
    fn(1); // simulate previous value
  }
});

const cartItem = {
  id: "1 - medium",
  name: "Chocolate Cake",
  size: "medium",
  price: 15,
};

vi.mock("../../../store/useCartStore", () => ({
  useCartStore: () => ({
    updateCartItemQuantity: mockUpdateCartItemQuantity,
  }),
}));

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={undefined}>
            <QuantityButton
              quantity={1}
              setQuantity={mockSetQuantity}
              cartItem={cartItem}
            />
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("QuantityButton Component", () => {
  beforeEach(() => {
    mockUpdateCartItemQuantity.mockClear();
  });

  test("renders the quantity button with initial quantity", () => {
    renderComponent();

    const quantityDisplay = screen.getByText("1");

    expect(quantityDisplay).toBeInTheDocument();
  });

  test("increments the quantity when the increment button is clicked", async () => {
    renderComponent();

    const incrementButton = screen.getByTestId("quantity-inc");
    await userEvent.click(incrementButton);

    expect(mockSetQuantity).toHaveBeenCalled();
    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith(cartItem.id, 1);
  });

  test("decrements the quantity when the decrement button is clicked", async () => {
    renderComponent();

    const decrementButton = screen.getByTestId("quantity-dec");
    await userEvent.click(decrementButton);

    expect(mockSetQuantity).toHaveBeenCalled();
    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith(cartItem.id, -1);
  });
});
