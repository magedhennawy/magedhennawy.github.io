import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';

interface NavbarProps {
  fixed?: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

function Navbar({ fixed = true, isMenuOpen, toggleMenu }: NavbarProps) {
  const router = useRouter();

  useEffect(() => {
    const pages = ['resume', 'education', 'skills', 'experience', 'projects', 'contact'];
    pages.forEach(page => router.prefetch(`/${page}`));
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 916 && isMenuOpen) {
        toggleMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, toggleMenu]);

  return (
    <nav
      style={{
        zIndex: 10,
        position: fixed ? 'fixed' : 'relative',
        top: fixed ? 0 : 'auto',
        width: fixed ? '100%' : 'auto',
      }}
      className="flex flex-col md:flex-row items-center justify-between p-4 bg-cyber-black/90 border-b border-neon-cyan/30 backdrop-blur-sm w-full"
    >
      {/* Terminal Prompt / Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link legacyBehavior href="/">
          <a className="text-neon-cyan font-mono text-sm md:text-base hover:text-neon-pink transition-colors duration-300">
            <span className="mr-2 text-terminal-green">➜</span>
            maged@portfolio:~$ <span className="typing-cursor"></span>
          </a>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white hover:text-neon-cyan focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <RxCross1 size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6 text-sm">
        {[
          { name: '/home', path: '/' },
          { name: '/resume', path: '/resume' },
          { name: '/education', path: '/education' },
          { name: '/experience', path: '/experience' },
          { name: '/projects', path: '/projects' },
        ].map((link) => (
          <Link legacyBehavior key={link.path} href={link.path}>
            <a className={`font-mono transition-all duration-300 hover:text-neon-cyan hover:shadow-neon-cyan ${router.pathname === link.path ? 'text-neon-cyan' : 'text-gray-400'}`}>
              [ {link.name} ]
            </a>
          </Link>
        ))}
      </div>

      {/* Socials & Contact */}
      <div className="hidden md:flex items-center space-x-4">
        <a
          href="https://github.com/magedhennawy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-neon-cyan transition-colors"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/magedhennawy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-neon-cyan transition-colors"
        >
          <FaLinkedin size={20} />
        </a>
        <Link legacyBehavior href="/contact">
          <a className="bg-transparent border border-neon-pink text-neon-pink px-4 py-1 rounded text-sm font-mono hover:bg-neon-pink hover:text-black transition-all duration-300 shadow-neon-pink">
            ./contact
          </a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
