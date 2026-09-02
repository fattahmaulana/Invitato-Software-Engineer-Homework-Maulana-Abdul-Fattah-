/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C3F4E',
          light: '#3D5566',
          dark: '#1B2B37',
        },
        secondary: {
          DEFAULT: '#5F6B76',
          light: '#8C97A1',
          dark: '#3E4953',
        },
        background: {
          DEFAULT: '#E5E9EC',
          light: '#F0F3F5',
          warm: '#F7F4EF',
        },
        cream: '#FAF6F0',
        ivory: '#FEFEFE',
        accent: {
          DEFAULT: '#C5A059',
          light: '#E2C285',
          dark: '#9E7A32',
        },
      },
      fontFamily: {
        heading: ['"Marcellus"', '"Cinzel"', '"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        body: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Italianno"', '"Great Vibes"', '"Pinyon Script"', 'cursive'],
        italian: ['"Italianno"', '"Great Vibes"', '"Alex Brush"', 'cursive'],
        script: ['"Pinyon Script"', '"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"Montserrat"', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['4.25rem', { lineHeight: '1.05', letterSpacing: '0.02em' }],
        'display-md': ['3.25rem', { lineHeight: '1.1', letterSpacing: '0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.03em' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'heading-md': ['1.375rem', { lineHeight: '1.35', letterSpacing: '0.02em' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.03em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      spacing: {
        'section': '6rem',
      },
    },
  },
  plugins: [],
}
