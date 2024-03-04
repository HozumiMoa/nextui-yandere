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
          from: { opacity: 0, transform: 'scale(0.8)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn calc(0.5s + var(--delay) * 0.1s) ease-out',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
