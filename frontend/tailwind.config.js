import flowbite from "flowbite-react/tailwind"


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E01760',
      },
      fontFamily: {
        sans: ['YourCustomFont', 'ui-sans-serif', 'system-ui'],
        // or change other font families like serif or mono
      },
    },
  },
  plugins: [
    flowbite.plugin(),
]
}