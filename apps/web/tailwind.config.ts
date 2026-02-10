import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D5BFF",
          50: "#EBF0FF",
          100: "#D6E0FF",
          200: "#ADC1FF",
          300: "#85A2FF",
          400: "#5C83FF",
          500: "#2D5BFF",
          600: "#0037E6",
          700: "#002AB3",
          800: "#001D80",
          900: "#00104D",
        },
        secondary: {
          DEFAULT: "#7C3AED",
          50: "#F5F0FF",
          100: "#EDE5FF",
          200: "#D4BFFF",
          300: "#B794F6",
          400: "#9F6CEE",
          500: "#7C3AED",
          600: "#6425D0",
          700: "#4C1D9E",
          800: "#37156E",
          900: "#230E47",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#06B6D4",
        // Political spectrum
        spectrum: {
          left: "#DC2626",
          centerLeft: "#F97316",
          center: "#A855F7",
          centerRight: "#3B82F6",
          right: "#1E40AF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        micro: "100px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.1)",
        card: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)",
        hover: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
        modal: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
