/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050008',
        lunar: {
          50: '#f5f0ff',
          100: '#ede0ff',
          200: '#d4baff',
          300: '#b88aff',
          400: '#9b55ff',
          500: '#8020f0',
          600: '#6010c0',
          700: '#450090',
          800: '#2d0060',
          900: '#1a0035',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"Courier New"', 'monospace'],
        body: ['Georgia', 'serif'],
      },
      animation: {
        'orb-float': 'orbFloat 12s ease-in-out infinite',
        'moon-pulse': 'moonPulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
      },
    },
  },
  plugins: [],
}
