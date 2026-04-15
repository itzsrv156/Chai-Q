/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rcb: {
          red: '#c02c3a',
          gold: '#d4af37',
          dark: '#050505',
        }
      }
    },
  },
  plugins: [],
}