/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#E2001A',
        'brand-red-dark': '#B50015',
        'bol-blue': '#0000A4',
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'Helvetica Neue', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}