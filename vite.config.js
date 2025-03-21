import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables Jest-like global APIs (e.g., `expect`)
    environment: 'jsdom', // Simulate the browser environment
    setupFiles: './src/setupTests.js', // Setup file for global config
    css: true, // Enable CSS support for components
    coverage: {
      provider: 'istanbul', // Code coverage
      reporter: ['text', 'html', 'lcov']
    }
  }
});
