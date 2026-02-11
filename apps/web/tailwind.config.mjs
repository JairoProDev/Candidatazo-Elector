/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Patriotic Perú theme
        primary: {
          DEFAULT: "#D91023",
          50: "#FEF2F2",
          100: "#FDE8E8",
          200: "#FBD0D0",
          300: "#F8A9A9",
          400: "#F27474",
          500: "#D91023",
          600: "#C40D1F",
          700: "#A30A19",
          800: "#860814",
          900: "#6B0710",
        },
        secondary: {
          DEFAULT: "#1A1A2E",
          50: "#F0F0F4",
          100: "#E0E0E9",
          200: "#C1C1D3",
          300: "#9898B0",
          400: "#6E6E8D",
          500: "#1A1A2E",
          600: "#161629",
          700: "#121224",
          800: "#0E0E1F",
          900: "#0A0A1A",
        },
        gold: {
          DEFAULT: "#D4A017",
          50: "#FFFDF0",
          100: "#FFF9D6",
          200: "#FFF0A8",
          300: "#FFE47A",
          400: "#F5D04A",
          500: "#D4A017",
          600: "#B8880F",
          700: "#8A650B",
          800: "#5C4407",
          900: "#2E2204",
        },
        peru: {
          red: "#D91023",
          white: "#FFFFFF",
          darkRed: "#8B0000",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#06B6D4",
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
