import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DessertDetail from "../../../components/dessert/DessertDetail";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { Query, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IngredientsProvider } from "../../../context/IngredientsContext";

vi.mock("../../../hooks/dessert/DessertHook", () => ({
  useGetDessertById: () => ({
    data: {
      dessert_id: 1,
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
    isLoading: false,
    isSuccess: true,
  }),
}));

describe("DessertDetail Component", () => {
  test("renders the dessert details", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={THEME}>
            <IngredientsProvider>
              <DessertDetail />
            </IngredientsProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/^chocolate cake$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Delicious chocolate cake$/i)).toBeInTheDocument();
  });

  // test("handles toggle size button click", async () => {
  //   render(
  //     <BrowserRouter>
  //       <QueryClientProvider client={new QueryClient()}>
  //         <ThemeProvider theme={THEME}>
  //           <IngredientsProvider>
  //             <DessertDetail />
  //           </IngredientsProvider>
  //         </ThemeProvider>
  //       </QueryClientProvider>
  //     </BrowserRouter>
  //   );

  //   const toggleSizeButton = screen.getByRole("button", {
  //     name: /large/i,
  //   });
  //   screen.debug(toggleSizeButton);
  //   await userEvent.click(toggleSizeButton);

  //   expect(
  //     screen.getByTestId("dessert-detail-add-to-cart-button")
  //   ).toHaveTextContent(/add to cart - $20/i);
  // });
});
