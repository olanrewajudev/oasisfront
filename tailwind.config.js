/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#000000",
        "dark": "#000000",
        "default": "#000000",
        "light": "#000000",
        "secondary": "#000000",
      },
      colors: {
        "navy": '#000000',
        "primary": "#3E362E",
        "dark": "#865D36",
        "default": "#000000",
        "light": "#000000",
        "secondary": "#A69080",
      },
    },
  },
  plugins: [],
}