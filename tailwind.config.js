/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/views/*.ejs',
    'src/public/js/app.js'
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['\'Poppins\'', 'sans-serif']
    }
  },
  plugins: [],
}