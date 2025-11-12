/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // ✅ enable dark mode via a class
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
          light: '#A5B4FC',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FCD34D',
        },
        background: '#F9FAFB',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

