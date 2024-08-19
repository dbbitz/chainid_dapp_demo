/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Inclui todos os arquivos JS/TS/JSX/TSX na pasta src
  ],
  theme: {
    extend: {
      colors: {
        customDarkBlue: "#13293D",
        customBlue: "#006494",
        customMediumBlue: "#247ba0",
        customLightBlue: "#1b98e0",
        customLightGray: "#e8f1f2",
      },
    },
  },
  plugins: [],
};
