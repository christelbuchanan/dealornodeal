/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        'game-gold': '#FFD700',
        'game-red': '#D22730',
        'game-blue': '#0A3161',
        'game-silver': '#C0C0C0',
      },
      boxShadow: {
        'case': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 0 2px rgba(255, 255, 255, 0.1)',
        'case-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 0 0 2px rgba(255, 255, 255, 0.2)',
        'offer': '0 0 20px rgba(255, 215, 0, 0.6)',
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 215, 0, 0.7)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.9)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
