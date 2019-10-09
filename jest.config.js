module.exports = {
  notify: true,
  testMatch: ["**/specs/**/*.js?(x)", "**/?(*.)(spec|test).js?(x)"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"]
};
