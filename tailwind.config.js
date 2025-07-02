/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#FDF9F2', // general background
        'brand-primary': '#227F5D', // primary text or button color
        'brand-accent': '#D2691E', // secondary accent color
        'brand-text': '#333333', // main text color
        'brand-subtext': '#666666', // secondary text color
        'brand-badge': '#B2E4D3', // badge background
        'brand-border': '#E5E5E5', // border color
      },
    },
  },
  plugins: [],
};
