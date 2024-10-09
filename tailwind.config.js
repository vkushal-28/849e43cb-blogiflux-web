import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "12px",
      base: "14px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "28px",
      "4xl": "38px",
      "5xl": "50px",
    },

    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        gelasio: ["'Roboto'", "serif"],
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        white: "#FFFFFF",
        black: "#0d1117",
        grey: "#eceeef",
        lblGrey: "#d7d7d7",
        "dark-grey": "#1f2328",
        red: "#FF4E4E",
        transparent: "transparent",
        twitter: "#1DA1F2",
        purple: "#8B46FF",
      },
      dark: {
        white: "#0d1117",
        black: "#F3F3F3",
        grey: "#212830",
        lblGrey: "#414141",
        // grey: "#2A2A2A",
        "dark-grey": "#9198a1",
        red: "#ff5d5d",
        transparent: "transparent",
        twitter: "#0E71A8",
        purple: "#582C8E",
      },
    }),
  ],
};
