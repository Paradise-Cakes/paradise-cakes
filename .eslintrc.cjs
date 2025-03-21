module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended", // Add this line
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "import"], // Add "import" here
  rules: {
    // Sorting imports using eslint-plugin-import
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Node.js built-in modules (fs, path)
          "external", // Third-party modules (react, lodash)
          "internal", // Internal project-specific modules
          ["parent", "sibling", "index"], // Relative imports
        ],
        "newlines-between": "always", // Add newline between groups
        alphabetize: {
          order: "asc", // Sort imports alphabetically
          caseInsensitive: true, // Ignore case when sorting
        },
      },
    ],
  },
};
