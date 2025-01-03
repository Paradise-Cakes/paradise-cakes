// import "@testing-library/jest-dom";

// Mock import.meta.env
global.process.env = {
  ...process.env,
  VITE_DEPLOY_ENV: "test",
  VITE_COGNITO_USER_POOL_ID: "mock-user-pool-id",
  VITE_COGNITO_APP_CLIENT_ID: "mock-app-client-id",
};

// Optional: Explicitly mock import.meta.env
if (!global.import) {
  global.import = {
    meta: {
      env: global.process.env,
    },
  };
}
