import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.ts'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        frontend: 'rgb(var(--c-frontend) / <alpha-value>)',
        backend: 'rgb(var(--c-backend) / <alpha-value>)',
        cloud: 'rgb(var(--c-cloud) / <alpha-value>)',
        security: 'rgb(var(--c-security) / <alpha-value>)',
        ai: 'rgb(var(--c-ai) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
