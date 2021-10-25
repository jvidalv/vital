const forms = require("@tailwindcss/forms");

module.exports = {
  mode: "jit",
  purge: ["./*.html", "./src/**/*.{css}"],
  plugins: [forms],
};
