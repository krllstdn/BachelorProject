/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      colors: {
        primary: '#031d44',
        secondary: '#ddf1f8' ,
        secondaryLight: 'rgba(221, 241, 248, 0.5)',
        tertiary: '#bbe3f1',
        quaternary: '#a9d9e9',
        quinary: '#063a89', // '07439d', 
      },
      width: {
        '128': '32rem',
      },
      screens: {
        '3xl': '1680px',
        '4xl': '1920px',
        '5xl': '2560px',
      },
    },
  },
  plugins: [],
}

