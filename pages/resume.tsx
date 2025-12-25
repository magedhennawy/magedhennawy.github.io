import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';

function Resume() {
  const isMobile = useMediaQuery({ query: '(max-width: 846px)' });
  const [mounted, setMounted] = useState(false);
  const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK || '/documents/MagedResume_June2025.pdf';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Head>
        <title>Maged Hennawy | Resume</title>
      </Head>
      <div className="w-full max-w-6xl terminal-container h-[85vh] flex flex-col">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span className="ml-4 text-xs text-gray-400 font-mono">maged@portfolio:~/documents/resume.pdf</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 bg-cyber-black p-4 overflow-hidden relative font-mono text-gray-300 flex flex-col">
          <div className="mb-4">
            <span className="text-neon-cyan mr-2">➜</span>
            <span className="text-terminal-green">~</span>
            <span className="text-white"> open MagedResume_June2025.pdf</span>
          </div>

          <div className="flex-1 relative w-full h-full border border-gray-700/50 rounded bg-white/5 overflow-hidden">
            {/* Fallback Link (or main view for mobile) */}
            {(isMobile) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-cyber-black">
                <p className="mb-6 text-yellow-500">
                  {'>'} Detect mobile device. Rendering optimized download link...
                </p>
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neon-cyan text-neon-cyan px-6 py-3 rounded hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-neon-cyan font-bold"
                >
                  {'>'} wget MagedResume2024.pdf
                </a>
              </div>
            )}

            {/* Native Iframe Embed */}
            {!isMobile && (
              <object
                data={resumeLink}
                type="application/pdf"
                className="w-full h-full"
              >
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent('https://magedhennawy.github.io' + resumeLink)}&embedded=true`}
                  className="w-full h-full border-none"
                  title="Resume PDF"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-cyber-black">
                    <p className="mb-6 text-yellow-500">
                      {'>'} Browser does not support PDF embedding.
                    </p>
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-neon-cyan text-neon-cyan px-6 py-3 rounded hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-neon-cyan font-bold"
                    >
                      {'>'} wget MagedResume2024.pdf
                    </a>
                  </div>
                </iframe>
              </object>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
