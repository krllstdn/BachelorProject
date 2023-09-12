/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#031d44', // good
        secondary: '#ddf1f8' , // good '#c7e8f3'
        tertiary: '#bbe3f1',
        quaternary: '#a9d9e9',
        quinary: '#063a89', // '07439d', 
      }
    },
  },
  plugins: [],
}

