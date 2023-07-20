/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins", sans-serif']
      },
      colors: {
        blue: {
          300: '#01b4e4',
          500: '#032541',
          200: '#7AD7F0'
        }
      },
      height: {
        90: '350px'
      }
    }
  },
  plugins: []
}
