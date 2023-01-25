module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  screens: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
  },
  theme: {
    extend: {
      fontFamily: {
        logo: ["Lobster", "cursive"],
        rest: ["Roboto Condensed", "sans-serif"],
        lamb: ["Playbal", "cursive"],
      },
    },
  },

  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
