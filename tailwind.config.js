/** @type {import('tailwindcss').Config} */

module.exports = {
  // itong content, ito yung mga file na papakinggan ng tailwind,
  // ano ang tailwind? https://www.geeksforgeeks.org/introduction-to-tailwind-css/#:~:text=Tailwind%20CSS%20is%20basically%20a,have%20to%20fight%20to%20override.
  // ayan lang yung naggegenerate ng style base sa class na inilagay mo
  content: [
    // ito ay lahat ng file sa loob ng `src/view` na may extension na .ejs
    'src/views/*.ejs',
    'src/views/partials/*.ejs',
    'src/public/js/app.js'
  ],
  theme: {
    extend: {},
    fontFamily: {
      // font na ginamit natin
      // nakikita sa fonts.google.com yan
      poppins: ['\'Poppins\'', 'sans-serif']
    }
  },
  // nakalimutan ko na rin yang plugin
  plugins: [],
}
