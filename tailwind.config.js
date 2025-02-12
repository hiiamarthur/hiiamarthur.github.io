/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'animate-fade-in-right',
  ],
  theme: {
    extend: {
      animation: {
        'grid-flow': 'grid-flow 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'grid-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        },
        'glow': {
          '0%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff' },
          '100%': { textShadow: '0 0 20px #fff, 0 0 30px #0ff, 0 0 40px #0ff' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      boxShadow: {
        'neon': '0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.animate-fade-in-right': {
          animation: 'fadeInRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        },
        '.animate-fade-in-left': {
          animation: 'fadeInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        },
        '.animate-fade-in-up': {
          animation: 'fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        },
        '.animate-fade-in-down': {
          animation: 'fadeInDown 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        },
        '.animate-fade-in': {
          animation: 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        },
        '.animate-glow': {
          animation: 'glow 2s ease-in-out infinite alternate',
        },
        '@keyframes glow': {
          '0%': { 
            'box-shadow': '0 0 5px rgb(34 211 238 / 0.5)',
          },
          '100%': { 
            'box-shadow': '0 0 20px rgb(34 211 238 / 0.5)',
          },
        },
        '.animate-slide-in': {
          animation: 'slideIn 0.3s ease-out forwards',
        },
        '@keyframes slideIn': {
          '0%': { 
            opacity: '0',
            transform: 'translateX(1rem)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      })
    }
  ],
}
