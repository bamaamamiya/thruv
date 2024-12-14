/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redto: '#ff0808',
        greento:'#00c764',
        greentoo:'#3cb878',
        grayto:'#f4f4f4',
        yellto:'#ffee58',
        purpelto:'#581970'
      }
    },
  },
  plugins: [],
}

