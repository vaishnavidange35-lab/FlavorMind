/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode toggling if needed
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          hover: '#E55A29',
          light: '#FF8A5C'
        },
        secondary: {
          DEFAULT: '#F7931E'
        },
        accent: {
          DEFAULT: '#FFD166'
        },
        success: {
          DEFAULT: '#06D6A0'
        },
        info: {
          DEFAULT: '#118AB2'
        },
        cream: {
          50: '#FDFBF7',
          100: '#F8F4EA',
          200: '#EFE6D5'
        },
        peach: {
          50: '#FFF5F2',
          100: '#FEECE6'
        },
        obsidian: {
          900: '#0F172A',
          800: '#1F2937',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(255, 107, 53, 0.05)',
        'glass-hover': '0 8px 32px 0 rgba(255, 107, 53, 0.15)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'soft-hover': '0 20px 40px -10px rgba(255, 107, 53, 0.15)',
      }
    },
  },
  plugins: [],
}
