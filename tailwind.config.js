/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        elephant: {
          gray: '#8B8680',
          dark: '#5C5854',
          light: '#B8B3AE',
        },
        savanna: {
          sky: '#87CEEB',
          ground: '#DEB887',
        }
      },
      animation: {
        'wiggle': 'wiggle 0.3s ease-in-out',
        'trunk-up': 'trunk-up 0.5s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        'trunk-up': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-20px) rotate(-15deg)' },
        }
      }
    },
  },
  plugins: [],
}
