/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // Scheme component dynamic classes
    {
      pattern: /(from|border|text)-(emerald|amber|blue|green)-(50|100|600|700)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
