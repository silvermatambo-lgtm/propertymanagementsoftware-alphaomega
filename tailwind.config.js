/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0a2540',
          950: '#061628',
        },
        gold: {
          50:  '#fdf8ec',
          100: '#f9edca',
          200: '#f2d991',
          300: '#e9c158',
          400: '#e0ad2e',
          500: '#c9a84c',
          600: '#b8962e',
          700: '#9e7d2e',
          800: '#7a5f28',
          900: '#5c4520',
        },
        stone: {
          50:  '#f5f3ef',
          100: '#ece8e0',
          200: '#d8d0c2',
          300: '#bfb29e',
          400: '#a39178',
          500: '#8c7460',
          600: '#735e4e',
          700: '#5c4a3e',
          800: '#2d2926',
          900: '#1a1612',
        },
      },
    },
  },
  plugins: [],
};
