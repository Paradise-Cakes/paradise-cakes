import { vi, describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Section from "../../../components/shop/Section";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../../src/theme";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { DrawerContext } from "../../../../src/context/DrawerContext";
import { IngredientsContext } from "../../../../src/context/IngredientsContext";
import { AuthContext } from "../../../../src/context/AuthContext";
import { debug } from "vitest-preview";

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <DrawerContext.Provider value={{}}>
            <IngredientsContext.Provider value={{}}>
              <AuthContext.Provider value={{}}>
                <Section
                  title={"Cakes"}
                  items={[
                    {
                      id: "DESSERT-1 - 6 inch",
                      name: "cake",
                      size: "6 inch",
                      price: 12.0,
                      coverImage: undefined,
                    },
                  ]}
                  isSectionLoading={true}
                />
              </AuthContext.Provider>
            </IngredientsContext.Provider>
          </DrawerContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("Section Component", () => {
  test("renders the section", () => {
    renderComponent();

    const section = screen.getByText("CAKES");
    expect(section).toBeInTheDocument();
  });
});
