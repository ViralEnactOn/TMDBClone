/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins", sans-serif'],
      },
      colors: {
        blue: {
          300: "#01b4e4",
          500: "#032541",
          200: "#7AD7F0",
        },
      },
      height: {
        90: "350px",
      },
      screens: {
        xs: "200px",
        xl: "1240px",
        lg: "1040px",
        
      },
      container: {
        screens: {
          default: "80rem",
        },
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
