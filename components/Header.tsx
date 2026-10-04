import { useEffect, useState } from 'react';

const NAV = [
  { href: '#platform', label: 'Platform' },
  { href: '#career', label: 'Career' },
  { href: '#ventures', label: 'Ventures' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
  { href: '/resume', label: 'Résumé' },
];

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage blocked (private mode)
  }
}

export default function Header({
  scene,
  sceneAvailable,
  onToggleScene,
}: {
  scene: boolean;
  sceneAvailable: boolean;
  onToggleScene: () => void;
}) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    save('theme', next);
  };

  return (
    <header className="no-print fixed inset-x-0 top-0 z-40">
      <a
        href="#main"
        className="sr-only-focusable absolute left-3 top-3 z-50 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="group flex items-center gap-2" aria-label="Maged Hennawy, back to top">
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="text-accent">
            <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeOpacity=".5" />
            <path d="M7 22V10l5 7 5-7v12M21 10v12M21 16h5M26 10v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted group-hover:text-fg sm:inline">
            Maged Hennawy
          </span>
        </a>
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="panel flex items-center gap-1 rounded-full px-2 py-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="block rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleScene}
            disabled={!sceneAvailable}
            aria-pressed={scene}
            title={sceneAvailable ? (scene ? 'Turn off the 3D layer' : 'Turn on the 3D layer') : 'WebGL 2 is not available in this browser'}
            className="panel rounded-full px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-fg disabled:opacity-50"
          >
            3D {scene ? 'on' : 'off'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="panel rounded-full p-2 text-muted transition-colors hover:text-fg"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
