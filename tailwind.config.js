/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1000': '1000ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};

