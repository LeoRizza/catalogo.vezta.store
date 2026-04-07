/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f88379',
          light: '#f9a8a0',
          dark: '#d96a5f',
        },
        accent: {
          DEFAULT: '#ef8274',
          light: '#ffe1dc',
          dark: '#e36d63',
        },
        text: {
          main: '#1c1d22',
          muted: '#6b7178',
        },
        border: '#ececec',
        bg: {
          main: '#ffffff',
          alt: '#fafafa',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
