/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50:  '#edfdf9',
          100: '#c8f7ed',
          200: '#93eed9',
          300: '#56dfc0',
          400: '#2dd4bf',  // primary accent
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        dark: {
          900: '#050d18',   // deepest bg
          800: '#07111f',   // main bg
          700: '#0c1a2e',   // section alt bg
          600: '#0f2035',   // card bg
          500: '#162840',   // card hover
          400: '#1e3a52',   // borders / elevated
          300: '#2a4f6e',   // strong borders
          200: '#4a7a9b',   // muted text
          100: '#7fb3cc',   // secondary text
          50:  '#b8d4e3',   // primary text muted
        },
      },
      fontFamily: {
        sans:    ['DM Sans',        'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Syne',           'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}