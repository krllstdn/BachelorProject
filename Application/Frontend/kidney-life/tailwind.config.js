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
        quinary: '#063a89', 
      },
      width: {
        '128': '32rem',
      },
      screens: {
        '3xl': '1680px',
        '4xl': '1920px',
        '5xl': '2460px',
      },
      spacing: {
        '2.5': '0.625rem',
        '2.75': '0.6875rem',
        '3.5': '0.875rem',
        '29': '7.25rem',
        '30': '7.5rem',
      }
    },
  },
  plugins: [],
}

