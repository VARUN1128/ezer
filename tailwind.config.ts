import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      colors: {
        background: "#101010",
        surface: {
          DEFAULT: "#1C1B19",
          muted: "#151413",
          light: "#24221F",
          border: "#2E2B26",
          hover: "#282622"
        },
        gold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#F5C45E",
          500: "#F5C45E", // primary gold
          600: "#D99C32", // secondary gold
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        primary: {
          DEFAULT: "#F5C45E",
          foreground: "#101010",
        },
        secondary: {
          DEFAULT: "#D99C32",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#262421",
          foreground: "#B8B5B0",
        },
        success: {
          DEFAULT: "#35A66A",
          foreground: "#FFFFFF",
        },
        danger: {
          DEFAULT: "#E05252",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      boxShadow: {
        gold: "0 0 25px -5px rgba(245, 196, 94, 0.2)",
        "gold-lg": "0 0 40px -5px rgba(245, 196, 94, 0.35)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
