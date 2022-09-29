/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '20px',
    },
    extend: {
      fontFamily: {
        lexend: [
          'Lexend',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
      colors: {
        main: 'rgb(0 105 255 / 14%)',
        card: 'rgba(0,105,255,.05)',
        primary: '#1A202C',
      },
      boxShadow: {
        main: '0px 15px 30px rgba(0, 105, 255, 0.2);',
        selected: '0px 10px 15px rgba(0, 105, 255, 0.2);',
      },
    },
  },
  plugins: [],
};
