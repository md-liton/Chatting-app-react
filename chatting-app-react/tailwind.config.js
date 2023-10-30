/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_color:'#5F35F5',
        secondary_color:'#11175D',
        overlay_color : 'rgba(0,0,0,0.5)'
    },
    fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'open': ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

