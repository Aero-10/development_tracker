/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F63049",
        accent: "#D02752",
        secondary: "#8A244B",
        background: "#111F35",
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        scaleUp: { '0%': { transform: 'scale(0.95)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        scaleUp: 'scaleUp 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
