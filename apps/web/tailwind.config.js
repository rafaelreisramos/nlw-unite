/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    fontWeight: {
      normal: '400',
      semibold: '500',
      bold: '700',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
