module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    "arrow-parens": 0,
    eqeqeq: "error",
    "newline-after-import": 0,
    "no-console": 0,
    "comma-dangle": 0,
    quotes: [1, "double"]
  },
};
