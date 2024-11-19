/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/pages/**/*.{html,js,ts,jsx,tsx}',
    './src/**/*.{html,js,ts,jsx,tsx}',
      './src/main.jsx'
  ],
  theme: {
    extend: {
      height: {
        '4.75': '19px',
      },
      borderRadius: {
        '0.75': '3px',
        '1.25': '5px',
      },
    },
  },
  plugins: [],
}

