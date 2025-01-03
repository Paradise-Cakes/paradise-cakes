export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/src/tests/__mocks__/svgMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!YOUR_MODULE_TO_TRANSFORM|another_module)/",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files
    "!src/index.js", // Exclude entry point
    "!src/setupTests.js", // Exclude test setup files
    "!src/**/*.test.{js,jsx}", // Exclude test files
    "!src/**/*.stories.{js,jsx}", // Exclude Storybook files if any
    "!src/**/types.{js,ts}", // Exclude types declaration files
  ],
  coverageDirectory: "coverage", // Directory for coverage output
  coverageReporters: ["text", "lcov", "html"], // Multiple report formats
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
