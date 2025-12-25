import Link from 'next/link';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-gray-500 p-4 bg-cyber-black/90 border-t border-neon-cyan/20 font-mono text-xs md:text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>
          {'>'} MagedHennawy.portfolio_v2 --status stable
        </p>
        <p className="mt-2 md:mt-0">
          <Link legacyBehavior href="https://github.com/magedhennawy/magedhennawy.github.io">
            <a className="hover:text-neon-cyan transition-colors">
              © {year} Built with Next.js & Tailwind
            </a>
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
