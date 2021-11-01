module.exports = {
  "*.{ts,tsx,css}": ["prettier . --write"],
  "*.{ts,tsx}": [
    "eslint . --cache --fix --ext .tsx --ext .ts",
    () => "yarn tsc",
    () => "yarn jest",
  ],
};
