import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          deep: "#111827",
        },
        ice: {
          DEFAULT: "#0EA5E9",
          pale: "#E0F2FE",
        },
        emerald: {
          DEFAULT: "#10B981",
          hover: "#059669",
        },
        warm: {
          white: "#FFFDF8",
        },
        slate: {
          bg: "#F8FAFC",
          border: "#E2E8F0",
          muted: "#64748B",
        },
        gold: {
          DEFAULT: "#D97706",
          soft: "#FEF3C7",
        },
      },
      fontFamily: {
        arabic: ["IBM Plex Sans Arabic", "Tajawal", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
      },
    },
  },
  plugins: [],
};

export default config;
