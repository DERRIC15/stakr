/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        surface: {
          50: "#f5fbff",
          100: "#e8f5ff",
          900: "#03131d",
          950: "#020b13",
        },
        neon: {
          blue: "#3cf2ff",
          green: "#49fca3",
          amber: "#ffcc66",
          red: "#ff5c7a",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(60, 242, 255, 0.18)",
        card: "0 12px 50px rgba(2, 10, 19, 0.18)",
      },
      backgroundImage: {
        "grid-dark":
          "radial-gradient(circle at top, rgba(60,242,255,0.16), transparent 40%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "grid-light":
          "radial-gradient(circle at top, rgba(44,125,255,0.18), transparent 40%), linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
      },
      animation: {
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.03)", opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -8px, 0)" },
        },
      },
    },
  },
  plugins: [],
};
