/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0f17',
        blue: '#005bea',
        light: 'rgb(212, 212, 222)',
        darkbg: 'rgb(21, 20, 20)',
        lightblue: 'rgb(9, 156, 242)',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'loading-1': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' }
        },
        'loading-2': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' }
        },
        'loading-3': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'loading-1': 'loading-1 1s infinite',
        'loading-2': 'loading-2 1s infinite 0.2s',
        'loading-3': 'loading-3 1s infinite 0.4s'
      }
    },
  },
  plugins: [],
}

