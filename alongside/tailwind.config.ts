import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1b22",
        cloud: "#faf7fb",
        bloom: {
          50: "#fdf2f7",
          100: "#fce7f0",
          200: "#fbcfe1",
          300: "#f7a8c8",
          400: "#f072a5",
          500: "#e24585",
          600: "#cf2c6c",
          700: "#ad1f56",
          800: "#8f1d49",
          900: "#771d40",
        },
        calm: {
          50: "#eef6f5",
          100: "#d6ebe8",
          300: "#86c7bf",
          500: "#3f9b90",
          700: "#2c6f67",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
