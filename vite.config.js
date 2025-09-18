import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["src"],
        additionalData: (source, filename) => {
          // Normalize path separators
          const f = String(filename || "").replace(/\\/g, "/");
          // Skip injecting into the source file to avoid a module loop
          if (f.endsWith("/src/styles/breakpoints.scss")) {
            return source;
          }
          return `@use "styles/breakpoints.scss" as *;\n${source}`;
        },
      },
    },
  },
  test: {
    globals: true, // Enables Jest-like global APIs (e.g., `expect`)
    environment: "jsdom", // Simulate the browser environment
    setupFiles: "./src/setupTests.js", // Setup file for global config
    css: true, // Enable CSS support for components
    coverage: {
      provider: "istanbul", // Code coverage
      reporter: ["text", "html", "lcov"],
      exclude: [
        "src/main.jsx",
        "src/tests/**",
        ".eslintrc.cjs",
        /** Skipping these for now until auth is more solid */
        "src/components/account/**",
        "src/components/extras/PhoneNumberInput.jsx",
        "src/components/forms/auth/**",
        "src/components/navigation/auth/**",
        "src/context/AuthContext.jsx",
        "src/guards/AuthGuard.jsx",
        "src/hooks/auth/AuthHook.jsx",
        "src/hooks/ProtectedNavigateHook.jsx",
        "src/store/useAuthStore.js",
        "src/store/useModalStore.js",
      ],
    },
  },
});
