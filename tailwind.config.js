/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundSize: {
        'border-b-gradient': '100% 2px',
      },
      colors: {
        brand: {
          white: {
            shade: '#E7ECEE',
            light: '#FAFAFA',
          },
          black: {
            dark: '#1B1B1B',
          },
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
