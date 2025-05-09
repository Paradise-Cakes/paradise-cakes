import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingButton from "../../../components/extras/LoadingButton";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsContext } from "../../../context/IngredientsContext";

function renderComponent(isDisabled) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={undefined}>
            <LoadingButton isDisabled={isDisabled}>
              <div>Loading...</div>
            </LoadingButton>
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

function renderComponentDefaults(isLoading) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <IngredientsContext.Provider value={undefined}>
            <LoadingButton isLoading={isLoading}>
              <div>Loading...</div>
            </LoadingButton>
          </IngredientsContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("LoadingButton Component", () => {
  test("renders the loading button", () => {
    renderComponent(false);

    const button = screen.getByRole("button", { name: /Loading.../i });
    expect(button).toBeInTheDocument();
  });

  test("disables the button when isDisabled is true", () => {
    renderComponent(true);

    const button = screen.getByRole("button", { name: /Loading.../i });
    expect(button).toBeDisabled();
  });

  test("enables the button when isDisabled is false", () => {
    renderComponentDefaults(false);

    const button = screen.getByRole("button", { name: /Loading.../i });
    expect(button).not.toBeDisabled();
  });

  test("disables the button when isLoading is true", () => {
    renderComponentDefaults(true);

    const loadingIcon = screen.getByTestId("loading-button");
    expect(loadingIcon).toBeInTheDocument();
  });
});
