import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff7ed",
          100: "#ffedd5",
          400: "#ff8a33",
          500: "#ff6b00",
          600: "#e85f00"
        },
        leaf: {
          50: "#ecfdf5",
          100: "#d1fae5",
          400: "#27c98b",
          500: "#00a86b",
          600: "#008a59"
        },
        ink: { 900: "#111814", 950: "#08100c" }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "Manrope",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 20px 60px -28px rgba(17, 24, 20, .28)",
        glow: "0 18px 60px -20px rgba(255,107,0,.52)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 70% 25%, rgba(255,107,0,.18), transparent 32%), radial-gradient(circle at 20% 70%, rgba(0,168,107,.12), transparent 34%)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" }
        },
        pulseSoft: { "0%,100%": { opacity: ".55" }, "50%": { opacity: "1" } }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
export default config;
