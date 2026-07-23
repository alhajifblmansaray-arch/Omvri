/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0a0a0b',
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#c7c7c8',
          300: '#9a9a9d',
          400: '#6b6b6e',
          500: '#454548',
          600: '#2c2c2e',
          700: '#1c1c1e',
          800: '#131314',
          900: '#0a0a0b',
          950: '#050506',
        },
        gold: {
          DEFAULT: '#b89257',
          50: '#faf6ee',
          100: '#f1e6cf',
          200: '#e2cca0',
          300: '#d2ae74',
          400: '#c3a05f',
          500: '#b89257',
          600: '#9a7742',
          700: '#7a5e35',
          800: '#5c472a',
          900: '#3d2f1e',
        },
        ivory: '#f3efe7',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        450: '450ms',
        550: '550ms',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1%, -1%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawIn: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        kenburns: 'kenburns 16s ease-out forwards',
        fadeUp: 'fadeUp 600ms cubic-bezier(0.4,0,0.2,1) both',
      },
    },
  },
  plugins: [],
}
