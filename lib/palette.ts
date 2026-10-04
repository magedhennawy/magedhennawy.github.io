import type { Category } from '@/data/profile';

// matches the tokens in styles/globals.css
export const palette = {
  dark: {
    accent: '#5eead4',
    core: '#7dd3fc',
    venture: '#fda4af',
    star: '#c7d2fe',
    line: '#7c8aa5',
    hud: '#5eead4',
    category: {
      frontend: '#60a5fa',
      backend: '#a78bfa',
      cloud: '#34d399',
      security: '#fb7185',
      ai: '#fbbf24',
    } as Record<Category, string>,
  },
  light: {
    accent: '#0f766e',
    core: '#0369a1',
    venture: '#be123c',
    star: '#334155',
    line: '#475569',
    hud: '#0f766e',
    category: {
      frontend: '#1d4ed8',
      backend: '#6d28d9',
      cloud: '#047857',
      security: '#be123c',
      ai: '#b45309',
    } as Record<Category, string>,
  },
};

export type Palette = (typeof palette)['dark'];
