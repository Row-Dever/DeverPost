/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // color추가
      colors: {
        mainOrange: '#f2a371',
        lightWhite: '#F4EEC7',
        lightGreen: '#95E0C8',
        darkGreen: '#697C37'
      }
    }
  },
  plugins: []
}
