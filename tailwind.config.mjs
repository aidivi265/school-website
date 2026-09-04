/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dae4f2',
          200: '#b8cde6',
          300: '#8bb0d5',
          400: '#588ec0',
          500: '#3873a8',
          600: '#275b8c',
          700: '#1f4871',
          800: '#1c3d5e',
          900: '#152945',
          950: '#0e1e42',
        },
        gold: {
          50: '#fdfbf7',
          100: '#fbf5eb',
          200: '#f5e7cb',
          300: '#eed3a5',
          400: '#e5b870',
          500: '#d99b38',
          600: '#b87c24',
          700: '#925c1b',
          800: '#75471c',
          900: '#613a1b',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
