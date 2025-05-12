import { describe, test, vi } from "vitest";

describe("Amplify config", () => {
  test("should configure Amplify with environment variables", async () => {
    vi.stubGlobal("import.meta", {
      env: {
        VITE_COGNITO_USER_POOL_ID: "test-pool-id",
        VITE_COGNITO_APP_CLIENT_ID: "test-app-client-id",
      },
    });

    await import("../amplifyConfig");
  });
});
