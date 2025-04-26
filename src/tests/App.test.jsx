import { vi, describe, test, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";
import { DrawerProvider } from "../context/DrawerContext";
import { IngredientsProvider } from "../context/IngredientsContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { THEME } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useModalStore } from "../store/useModalStore";
import { debug } from "vitest-preview";

const createMockModalStore = (overrides = {}) => ({
  signInModalOpen: false,
  signUpModalOpen: false,
  confirmationCodeModalOpen: false,
  loggedInModalOpen: false,
  forgotPasswordModalOpen: false,
  resetPasswordModalOpen: false,
  sentResetPassswordEmailModalOpen: false,
  resetPasswordParams: null,
  openSignInModal: vi.fn(),
  closeSignInModal: vi.fn(),
  openSignUpModal: vi.fn(),
  closeSignUpModal: vi.fn(),
  openConfirmationCodeModal: vi.fn(),
  closeConfirmationCodeModal: vi.fn(),
  openLoggedInModal: vi.fn(),
  closeLoggedInModal: vi.fn(),
  openForgotPasswordModal: vi.fn(),
  closeForgotPasswordModal: vi.fn(),
  openResetPasswordModal: vi.fn(),
  closeResetPasswordModal: vi.fn(),
  openSentResetPassswordEmailModal: vi.fn(),
  closeSentResetPassswordEmailModal: vi.fn(),
  setResetPasswordParams: vi.fn(),
  closeAllModals: vi.fn(),
  ...overrides, // Allow per-test overrides
});

vi.mock("../store/useModalStore", () => ({
  useModalStore: vi.fn(),
}));

function renderComponent() {
  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <DrawerProvider>
            <ThemeProvider theme={THEME}>
              <IngredientsProvider>
                <App />
              </IngredientsProvider>
            </ThemeProvider>
          </DrawerProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe("App Component", () => {
  beforeEach(() => {
    useModalStore.mockImplementation(() => createMockModalStore());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the app homepage", () => {
    renderComponent();

    expect(screen.getByText(/desserts made from scratch/i)).toBeInTheDocument();
  });

  test("opens reset password modal if reset=true in url params", async () => {
    const openResetPasswordModal = vi.fn();
    const setResetPasswordParams = vi.fn();

    useModalStore.mockImplementation(() =>
      createMockModalStore({
        openResetPasswordModal,
        setResetPasswordParams,
      })
    );

    render(
      <MemoryRouter
        initialEntries={["/some-page?reset=true&username=testuser&code=1234"]}
      >
        <QueryClientProvider client={new QueryClient()}>
          <AuthProvider>
            <DrawerProvider>
              <ThemeProvider theme={THEME}>
                <IngredientsProvider>
                  <App />
                </IngredientsProvider>
              </ThemeProvider>
            </DrawerProvider>
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(openResetPasswordModal).toHaveBeenCalled();
    expect(setResetPasswordParams).toHaveBeenCalledWith({
      username: "testuser",
      code: "1234",
    });
  });

  test("renders UnderConstruction if not a dev environment", () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { ...originalLocation, hostname: "production.com" };

    renderComponent();
    debug();

    expect(
      screen.getByText(
        /This page is under construction. Please check back later./i
      )
    ).toBeInTheDocument();

    window.location = originalLocation; // restore
  });
});
