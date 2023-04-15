/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "280px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
  
    },
  },
  plugins: [],
}