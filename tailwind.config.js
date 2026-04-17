/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // class-based dark mode
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          600: '#4b5563',
        },
        slate: {
          800: '#1e293b',
          850: '#1a202c',
          900: '#0f172a',
          950: '#020617',
        },
      },
      spacing: {
        '72': '288px', // Sidebar width
      },
    },
  },
  plugins: [],
};
