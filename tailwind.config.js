/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'fw-blue': {
          100: '#6682FF',
          200: '#5C75E5',
          300: '#5167CB',
          400: '#475AB1',
          500: '#3C4D97',
          600: '#323F7C',
          700: '#273262',
          800: '#1D2448',
          900: '#12172E',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

