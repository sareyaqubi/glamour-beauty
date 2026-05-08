/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FFF0F6',
          100: '#FFD6E8',
          200: '#FFB8D6',
          300: '#FF8CBE',
          400: '#FF5CA8',
          500: '#FF2D95',
          600: '#E61A7E',
          700: '#BF0064',
          800: '#990050',
          900: '#73003C',
        },
        dark: {
          bg: '#0B0B10',
          card: 'rgba(255,255,255,0.04)',
          cardHover: 'rgba(255,255,255,0.08)',
          border: 'rgba(255,255,255,0.08)',
        },
        light: {
          bg: '#FFFFFF',
          card: '#FDF2F6',
          cardHover: '#FCE8F0',
          border: '#F0D6E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.25s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,45,149,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(255,45,149,0.3)' },
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
};
