import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomOrderForm from "../../../../components/forms/custom-order/CustomOrderForm";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../../theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../../context/IngredientsContext";

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={undefined}>
            <CustomOrderForm />
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("CustomOrderForm Component", () => {
  test("renders the custom order form", () => {
    renderComponent();

    expect(
      screen.getByText(
        "Please fill out the form below to place a custom order. Please allow 2-3 days for a response."
      )
    ).toBeInTheDocument();
  });
});
