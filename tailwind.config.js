
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        gold: {
          light: '#FFD700',
          DEFAULT: '#FFB800',
          dark: '#CC9300',
          darker: '#996E00',
        },
        primary: 'rgba(255, 255, 255, 0.85)',
        accent: {
          purple: '#6D3EFF',
          orange: '#FFB347',
        }
      }
    },
  },
  plugins: [],
}