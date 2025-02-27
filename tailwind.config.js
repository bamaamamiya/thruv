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
        goldento:'#ffb91e',
        purpelto:'#581970',
				greendo:'#2d6343',
				greendoo:'#1c3424',
				pinkto:'#c75d73'
      }
    },
  },
  plugins: [],
}

