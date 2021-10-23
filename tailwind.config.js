module.exports = {
  mode: "jit",
  purge: ["./*.html", "./src/**/*.{css}"],
  plugins: [require("@tailwindcss/forms")],
};
