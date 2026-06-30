/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic core palette
        ink: '#09090B', // page background
        surface: '#111827', // cards
        accent: {
          DEFAULT: '#E50914', // ReelNova red
          soft: '#ff2b35',
        },
        secondary: {
          DEFAULT: '#7C3AED', // violet
          soft: '#9b6bff',
        },
        ground: '#F9FAFB', // primary text
        muted: '#9CA3AF', // muted text
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient':
          'linear-gradient(120deg, #E50914 0%, #7C3AED 100%)',
        'spotlight':
          'radial-gradient(60% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, rgba(9,9,11,0) 70%)',
        'card-sheen':
          'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(229,9,20,0.45)',
        'glow-violet':
          '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(124,58,237,0.5)',
        lift: '0 30px 80px -30px rgba(0,0,0,0.8)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-24px) translateX(12px)' },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
        float: 'float 16s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
