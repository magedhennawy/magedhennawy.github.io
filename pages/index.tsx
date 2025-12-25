import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

function Home() {
  const yearsOfExperience = new Date().getFullYear() - 2018;
  const [typedText, setTypedText] = useState('');
  const fullText = "Full-Stack Engineer.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Head>
        <title>Maged Hennawy | Terminal Portfolio</title>
      </Head>

      <div className="w-full max-w-4xl terminal-container transform transition-all hover:scale-[1.01] duration-500">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span className="ml-4 text-xs text-gray-400 font-mono">maged@portfolio:~</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-10 font-mono text-sm md:text-base space-y-6">

          {/* Command 1: whoami */}
          <div>
            <div className="flex items-center text-neon-cyan">
              <span className="mr-2 text-terminal-green">➜</span>
              <span className="mr-2">~</span>
              <span className="typing-cursor">whoami</span>
            </div>
            <div className="mt-2 pl-4 text-gray-300">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 glow-text-cyan">
                MAGED HENNAWY
              </h1>
              <p className="text-xl md:text-2xl text-neon-pink mt-2">
                {typedText}<span className="animate-pulse">_</span>
              </p>
            </div>
          </div>

          {/* Command 2: cat about.txt */}
          <div>
            <div className="flex items-center text-neon-cyan mt-8">
              <span className="mr-2 text-terminal-green">➜</span>
              <span className="mr-2">~</span>
              <span>cat about.txt</span>
            </div>
            <div className="mt-2 pl-4 text-gray-300 leading-relaxed md:w-3/4">
              <p className="mb-4">
                {'>'} Hello! I'm a software engineer with <span className="text-neon-cyan">{yearsOfExperience}+ years</span> of experience building scalable enterprise applications.
              </p>
              <p>
                {'>'} I specialize in <span className="text-yellow-400">JavaScript/TypeScript</span>, <span className="text-blue-400">React</span>, <span className="text-green-400">Node.js</span>, and <span className="text-purple-400">Cloud Architecture</span>.
                Always exploring new technologies and building cool things.
              </p>
            </div>
          </div>

          {/* Command 3: ls social-links */}
          <div>
            <div className="flex items-center text-neon-cyan mt-8">
              <span className="mr-2 text-terminal-green">➜</span>
              <span className="mr-2">~</span>
              <span>ls social-links/</span>
            </div>
            <div className="mt-4 pl-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/magedhennawy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-gray-600 px-4 py-2 rounded text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all hover:bg-neon-cyan/10"
              >
                <FaGithub /> git_profile
              </a>
              <a
                href="https://www.linkedin.com/in/magedhennawy/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-gray-600 px-4 py-2 rounded text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all hover:bg-blue-400/10"
              >
                <FaLinkedin /> linkedin_profile
              </a>
              <Link legacyBehavior href="/contact">
                <a className="flex items-center gap-2 border border-gray-600 px-4 py-2 rounded text-gray-300 hover:border-neon-pink hover:text-neon-pink transition-all hover:bg-neon-pink/10">
                  @ email_me
                </a>
              </Link>
            </div>
          </div>

          {/* Footer Prompt */}
          <div className="mt-10 text-gray-500 text-xs">
            {'>'} Ready for new challenges...
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
