/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Medical Identity Palette
        medical: {
          50: '#F0F9FA',  // Backgrounds
          100: '#CCFBF1', // Accents
          500: '#14B8A6', // Primary Action
          600: '#0D9488', // Hover States
          700: '#0F766E', // Deep Branding
          900: '#134E4A', // Text/Headings
        },
        slate: {
          850: '#1e293b', // Dark mode specific
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}