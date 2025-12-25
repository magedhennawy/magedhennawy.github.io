import Head from 'next/head';
import React, { useEffect, useState } from 'react';

function Education() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const educationData = [
    {
      _id: "edu_001",
      institution: "University Of Toronto",
      department: "Computer Science",
      degree: "Bachelor of Science",
      honors: "Highest Honors",
      specialist: "Software Engineering",
      period: "2014 - 2019",
      status: "COMPLETED"
    },
    {
      _id: "cert_002",
      institution: "Coursera",
      course: "Advanced React by Meta",
      credential: "Certification",
      period: "2020 - 2021",
      status: "VERIFIED"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Head>
        <title>Maged Hennawy | Education Dump</title>
      </Head>
      <div className="w-full max-w-6xl terminal-container h-[85vh] flex flex-col">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span className="ml-4 text-xs text-gray-400 font-mono">maged@portfolio:~/education/data.json</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 bg-cyber-black p-4 md:p-8 overflow-y-auto custom-scrollbar font-mono text-gray-300">

          <div className="mb-6">
            <span className="text-neon-cyan mr-2">➜</span>
            <span className="text-terminal-green">~</span>
            <span className="text-white"> cat degrees.json</span>
          </div>

          <div className="text-sm md:text-base leading-relaxed">
            <span className="text-yellow-400">[</span>
            {educationData.map((item, index) => (
              <div key={index} className="pl-4 my-2">
                <span className="text-yellow-400">{'{'}</span>
                <div className="pl-4">
                  {Object.entries(item).map(([key, value], i) => (
                    <div key={i}>
                      <span className="text-neon-pink">"{key}"</span>
                      <span className="text-white">: </span>
                      <span className="text-green-400">"{value}"</span>
                      {i < Object.keys(item).length - 1 && <span className="text-white">,</span>}
                    </div>
                  ))}
                </div>
                <span className="text-yellow-400">{'}'}</span>
                {index < educationData.length - 1 && <span className="text-white">,</span>}
              </div>
            ))}
            <span className="text-yellow-400">]</span>
          </div>

          <div className="text-neon-cyan animate-pulse mt-8">
            {'>'} _
          </div>

        </div>
      </div>
    </div>
  );
}

export default Education;
