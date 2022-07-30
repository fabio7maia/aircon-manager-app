module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}", "./node_modules/react-xp-ui/dist/**/*.js"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
