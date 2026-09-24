/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0D12',
          900: '#14110B',
          800: '#1F1B12',
          700: '#2B2517',
        },
        cream: '#FBF9F4',
        sand: '#F3EEE3',
        line: '#E7E1D2',
        body: '#4B4536',
        heading: '#1F1B12',
        amber: {
          50: '#FFF8E9',
          100: '#FEEDC7',
          400: '#F7B84B',
          500: '#F59E0B',
          600: '#C97B08',
          700: '#9C5F07',
        },
        rise: '#2F9E63',
        fall: '#D14B3C',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
      maxWidth: {
        prose: '40rem',
      },
    },
  },
  plugins: [],
}
