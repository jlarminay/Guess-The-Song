/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw_',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: '#121212',
      },
    },
  },
  plugins: [],
};
