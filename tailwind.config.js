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
          darkRed: '#8f1a26',
          gold: '#d4af37',
          lightGold: '#f0df99',
          dark: '#050505',
          card: 'rgba(255, 255, 255, 0.05)',
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.03)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
