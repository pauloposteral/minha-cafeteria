/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cafe: {
          50: '#FBF7F4',
          100: '#F5EDE6',
          200: '#E8D9CB',
          300: '#D4A574',
          400: '#C8A951',
          500: '#8B4513',
          600: '#6B3410',
          700: '#4A250C',
          800: '#2A1F14',
          900: '#1A120C',
        },
      },
    },
  },
  plugins: [],
};
