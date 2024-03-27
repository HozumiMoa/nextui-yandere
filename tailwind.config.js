import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { transform: 'scale(0.9)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out calc(0.1s * var(--delay)) both',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
