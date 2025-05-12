import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import NotFound from "../../components/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../theme";

describe("NotFound Component", () => {
  test("renders the not found message", () => {
    render(
      <ThemeProvider theme={THEME}>
        <NotFound />
      </ThemeProvider>
    );
    expect(
      screen.getByText(
        "Uh oh! Looks like this page doesn't exist or can't be found."
      )
    ).toBeInTheDocument();
  });
});
