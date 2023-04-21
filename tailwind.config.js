/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**.jsx", 
  ],
  theme: {
    extend: {
      colors: {
        'darkslategray': '#2f4f4f',
      },
      boxShadow: {
        'input' : '0 0 0 2px #2f4f4f',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
