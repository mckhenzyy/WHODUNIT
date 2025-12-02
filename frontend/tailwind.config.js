/*This file configures which files Tailwind scans to 
generate CSS classes to use. It does not contain styles 
itself but defines how Tailwind works.*/ 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



