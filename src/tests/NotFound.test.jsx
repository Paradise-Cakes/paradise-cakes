import { render, screen, fireEvent } from "@testing-library/react";
import NotFound from "../components/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../main";

describe("NotFound Component", () => {
  test("renders the not found message", () => {
    render(
      <ThemeProvider theme={THEME}>
        <NotFound />
      </ThemeProvider>
    );
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});
