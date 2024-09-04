/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: require("./src/utils/themes")
  },
  plugins: [require("daisyui")]
};
