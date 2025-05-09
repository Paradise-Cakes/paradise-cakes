import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Ingredients from "../../../components/dessert/Ingredients";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../context/IngredientsContext";
import { before } from "lodash";

const mockSetIngredientsOpen = vi.fn();

const mockIngredientsContextValue = {
  ingredientsOpen: true,
  setIngredientsOpen: mockSetIngredientsOpen,
};

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={mockIngredientsContextValue}>
            <Ingredients ingredients={["eggs", "flour", "wheat"]} />
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("Ingredients Component", () => {
  beforeEach(() => {
    mockSetIngredientsOpen.mockClear();
  });

  test("renders the ingredients for the dessert", () => {
    renderComponent();
    const eggs = screen.getByText("EGGS,");
    expect(eggs).toBeInTheDocument();

    const flour = screen.getByText("FLOUR,");
    expect(flour).toBeInTheDocument();

    const wheat = screen.getByText("WHEAT");
    expect(wheat).toBeInTheDocument();
  });

  test("closes the drawer when clicking the close button", async () => {
    renderComponent();

    const closeButton = screen.getByTestId("close-ingredients");
    await userEvent.click(closeButton);
    expect(mockIngredientsContextValue.setIngredientsOpen).toHaveBeenCalledWith(
      false
    );
  });

  test("ignores close drawer on keydown events", async () => {
    renderComponent();

    await userEvent.keyboard("{Tab}");
    expect(
      mockIngredientsContextValue.setIngredientsOpen
    ).not.toHaveBeenCalled();
  });
});
