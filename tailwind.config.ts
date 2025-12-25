import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'cyber-black': '#010816',
        'neon-cyan': '#00ffff',
        'neon-pink': '#ff00ff',
        'terminal-green': '#00ff00',
        'terminal-gray': '#1F2937',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        md: '916px',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        fontSize: 'font-size',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00ffff, 0 0 10px #00ffff',
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff',
      },
    },
  },
  plugins: [],
};

export default config;
