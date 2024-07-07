/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ef918f',
        primarydark: '#ec8482',
        primarysub: '#e24e4a',
        second: '#bbf1e4',
        seconddark: '#3F4C49',
        promo: '#ff0000',
        hijau: '#0dff00',
        kayu: '#ecd7a5',
      }
    },
  },
  plugins: [],
}

