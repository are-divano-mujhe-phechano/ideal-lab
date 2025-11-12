/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Poppins", "sans-serif"] },
      colors: {
        teal: { 700: "#0f766e", 800: "#115e59", 900: "#134e4a" },
        orange: { 600: "#e8542e", 700: "#c74220" },
        beige: "#faf6f2",
      },
    },
  },
  plugins: [],
};

