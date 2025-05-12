import { vi, describe, test, expect, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ViewDesserts from "../../../components/admin/ViewDesserts";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "../../../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { debug } from "vitest-preview";

const getDessertsMock = vi.fn();
const deleteDessertMock = vi.fn();
const patchDessertMock = vi.fn();

vi.mock("../../../hooks/dessert/DessertHook", () => ({
  useGetDesserts: () => getDessertsMock(),
  useDeleteDessert: () => ({
    mutateAsync: deleteDessertMock,
    isLoading: false,
    error: null,
  }),
  usePatchDessert: () => ({
    mutateAsync: patchDessertMock,
    isLoading: false,
    error: null,
  }),
}));

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={THEME}>
          <ViewDesserts />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("ViewDesserts Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    getDessertsMock.mockReturnValue({
      data: [
        {
          dessert_id: "DESSERT-1",
          name: "Chocolate Cake",
          description: "A delicious chocolate cake",
          dessert_type: "cake",
          created_at: 1734004800,
          last_updated_at: 1734004800,
          visible: true,
          images: [
            {
              image_id: "IMAGE-1",
              url: "https://example.com/chocolate-cake.jpg",
            },
          ],
        },
        {
          dessert_id: "DESSERT-2",
          name: "Vanilla Cake",
          description: "A delicious vanilla cake",
          dessert_type: "cake",
          created_at: 1734004800,
          last_updated_at: 1734004800,
          visible: true,
          images: [
            {
              image_id: "IMAGE-2",
              url: "https://example.com/vanilla-cake.jpg",
            },
          ],
        },
      ],
    });

    patchDessertMock.mockResolvedValue({ data: {} });
    deleteDessertMock.mockResolvedValue({ data: {} });
  });

  test("renders the ViewDesserts component", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: /my desserts/i })).toBeVisible();
  });

  test("displays the list of desserts", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /chocolate cake/i })
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: /vanilla cake/i })
    ).toBeVisible();
  });

  test("displays hidden desserts", async () => {
    getDessertsMock.mockReturnValue({
      data: [
        {
          dessert_id: "DESSERT-1",
          name: "Chocolate Cake",
          description: "A delicious chocolate cake",
          dessert_type: "cake",
          created_at: 1734004800,
          last_updated_at: 1734004800,
          visible: false,
          images: [
            {
              image_id: "IMAGE-1",
              url: "https://example.com/chocolate-cake.jpg",
            },
          ],
        },
      ],
    });

    renderComponent();

    const hiddenTab = screen.getByRole("tab", {
      name: /hidden/i,
    });
    await userEvent.click(hiddenTab);

    expect(
      screen.getByRole("heading", { name: /chocolate cake/i })
    ).toBeVisible();
  });

  test("displays visible desserts", async () => {
    getDessertsMock.mockReturnValue({
      data: [
        {
          dessert_id: "DESSERT-1",
          name: "Chocolate Cake",
          description: "A delicious chocolate cake",
          dessert_type: "cake",
          created_at: 1734004800,
          last_updated_at: 1734004800,
          visible: true,
          images: [
            {
              image_id: "IMAGE-1",
              url: "https://example.com/chocolate-cake.jpg",
            },
          ],
        },
      ],
    });

    renderComponent();

    const visibleTab = screen.getByRole("tab", {
      name: /visible/i,
    });
    await userEvent.click(visibleTab);

    expect(
      screen.getByRole("heading", { name: /chocolate cake/i })
    ).toBeVisible();
  });

  test("displays other dessert types", async () => {
    getDessertsMock.mockReturnValue({
      data: [
        {
          dessert_id: "DESSERT-1",
          name: "Chocolate Cake",
          description: "A delicious chocolate cake",
          dessert_type: "cake",
          created_at: 1734004800,
          last_updated_at: 1734004800,
          visible: true,
          images: [
            {
              image_id: "IMAGE-1",
              url: "https://example.com/chocolate-cake.jpg",
            },
          ],
        },
        {
          dessert_id: "DESSERT-2",
          name: "Vanilla Cupcakes",
          description: "Creamy vanilla cupcakes",
          dessert_type: "cupcake",
          created_at: 1734004800,
          last_updated_at: 1734004800,
          visible: true,
          images: [
            {
              image_id: "IMAGE-1",
              url: "https://example.com/vanilla-cupcake.jpg",
            },
          ],
        },
      ],
    });

    renderComponent();

    const cupcakesTab = screen.getByRole("tab", {
      name: /cupcakes/i,
    });
    await userEvent.click(cupcakesTab);

    expect(
      screen.getByRole("heading", { name: /vanilla cupcakes/i })
    ).toBeVisible();
  });
});
