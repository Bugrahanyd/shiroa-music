import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        turquoise: {
          DEFAULT: "#00CED1",
          soft: "#5FE0E5"
        },
        brand: {
          black: "#0C0C0C",
          white: "#FFFFFF",
          blue: "#003366"
        }
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-orbitron)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
