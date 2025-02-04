// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0284c7",
        secondary: "#7e22ce",
        success: "#16a34a",
        error: "#dc2626",
        warning: "#ca8a04",
      },
      spacing: {
        18: "4.5rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
        display: ["Montserrat", ...fontFamily.sans],
      },
      fontSize: {
        h1: ["2rem", "2.5rem"],
        h2: ["1.5rem", "2rem"],
        body: ["1rem", "1.5rem"],
        small: ["0.875rem", "1.25rem"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
