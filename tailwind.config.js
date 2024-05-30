/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Adjust this path to match your template engine (e.g., .ejs, .pug, .hbs, etc.)
    './public/**/*.js',
    './public/**/*.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

