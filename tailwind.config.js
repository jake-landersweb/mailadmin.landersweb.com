/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#fff",
          800: "#F7F7FC",
          700: "#F0F0F7"
        },
        txt: {
          DEFAULT: '#FFFFFF',
          '50': '#FFFFFF',
          '100': '#F1F1F1',
          '200': '#D5D5D5',
          '300': '#B9B9B9',
          '400': '#9D9D9D',
          '500': '#818181',
          '600': '#656565',
          '700': '#494949',
          '800': '#2D2D2D',
          '900': '#111111'
        },
        main: "#0C1BC0",
      }
    },
  },
  plugins: [],
}
