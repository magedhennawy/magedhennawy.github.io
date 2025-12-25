import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

type MenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

function NavbarMenu({ isMenuOpen, toggleMenu }: MenuProps) {
  const router = useRouter();
  useEffect(() => {
    const pages = ['resume', 'education', 'skills', 'experience', 'projects', 'contact'];
    pages.forEach(page => router.prefetch(`/${page}`));
  }, [router]);

  return (
    <motion.div
      style={{ zIndex: 5, paddingTop: '64px' }}
      className={`${isMenuOpen ? 'block' : 'hidden'
        } fixed w-full flex justify-center text-center md:hidden bg-cyber-black/95 backdrop-blur-md border-b border-neon-cyan/20`}
      initial={{ y: '-100vh' }}
      animate={{ y: isMenuOpen ? '0' : '-100vh' }}
      transition={{ duration: 0.3 }}
    >
      <div className="font-mono text-xl flex flex-col items-center justify-center w-full py-8 space-y-4">
        {[
          { name: 'Education', path: '/education' },
          { name: 'Skills', path: '/skills' },
          { name: 'Experience', path: '/experience' },
          { name: 'Projects', path: '/projects' },
          { name: 'Resume', path: '/resume' },
        ].map((item) => (
          <Link legacyBehavior key={item.path} href={item.path}>
            <button
              type="button"
              className="w-full text-gray-300 hover:text-neon-cyan py-2 px-4 transition-all duration-300 hover:bg-neon-cyan/5 border-l-2 border-transparent hover:border-neon-cyan"
              onClick={toggleMenu}
            >
              {'>'} {item.name}
            </button>
          </Link>
        ))}

        <Link legacyBehavior href="/contact">
          <div className="pt-4 pb-3">
            <button
              className="bg-transparent border border-neon-pink text-neon-pink font-bold py-2 px-6 rounded hover:bg-neon-pink hover:text-black transition-all duration-300 shadow-neon-pink"
              onClick={toggleMenu}
            >
              ./contact_me
            </button>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default NavbarMenu;
