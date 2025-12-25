import Head from 'next/head';
import React, { useEffect, useState } from 'react';

// const github_pat = process.env.GITHUB_PAT;

const loadingMessage =
  'Fetching repository details...';

async function getRepoDescription(githubRepoUrl: string) {
  const [, owner, repo] = new URL(githubRepoUrl).pathname.split('/');
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const data = await response.json();
    return data.description || 'No description provided.';
  } catch (error) {
    console.error(`Error: ${error}`);
    return 'Error: Could not fetch details.';
  }
}

const projectsWithDescriptions = [
  'carbon-design-system/carbon-components-angular',
  'portfolio',
  'leetcode',
  'hackerrank',
];

interface ProjectsProps {
  descriptions: { [key: string]: string };
}

function Projects({ descriptions }: ProjectsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const projectList = [
    {
      name: 'staff-pay-system.js',
      description: descriptions['CutieBot'] || 'Jinx Lounge Employee Management System. Written in JavaScript.',
      link: 'https://github.com/magedhennawy/early-version-staff-pay',
      date: 'Dec 25 10:00',
      perm: '-rwxr-xr-x'
    },
    {
      name: 'portfolio-website.tsx',
      description: `My portfolio! ${descriptions['portfolio'] || ''}. Next.js & Tailwind.`,
      link: 'https://github.com/magedhennawy/magedhennawy.github.io',
      date: 'Dec 25 15:30',
      perm: '-rw-r--r--'
    },
    {
      name: 'carbon-components-angular',
      description: 'IBM Carbon Design System contribution. Angular/TS components.',
      link: 'https://github.com/carbon-design-system/carbon-components-angular',
      date: 'Jan 01 09:00',
      perm: 'drwxr-xr-x'
    },
    {
      name: 'json-editor-contribution',
      description: 'Open source contribution to josdejong/jsoneditor.',
      link: 'https://github.com/josdejong/jsoneditor',
      date: 'Nov 15 14:20',
      perm: '-rw-r--r--'
    },
    {
      name: 'leetcode-solutions',
      description: descriptions['leetcode'] || 'Personal LeetCode solutions.',
      link: 'https://github.com/magedhennawy/leetcode',
      date: 'Oct 12 18:45',
      perm: 'drwxr-xr-x'
    },
    {
      name: 'hackerrank-solutions',
      description: descriptions['hackerrank'] || 'Personal HackerRank solutions.',
      link: 'https://github.com/magedhennawy/hackerrank',
      date: 'Sep 05 11:10',
      perm: 'drwxr-xr-x'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Head>
        <title>Maged Hennawy | Projects Directory</title>
      </Head>
      <div className="w-full max-w-6xl terminal-container h-[85vh] flex flex-col">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span className="ml-4 text-xs text-gray-400 font-mono">maged@portfolio:~/projects</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 bg-cyber-black p-4 md:p-8 overflow-y-auto custom-scrollbar font-mono text-gray-300">

          <div className="mb-6">
            <span className="text-neon-cyan mr-2">➜</span>
            <span className="text-terminal-green">~</span>
            <span className="text-white"> ls -la</span>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800">
                  <th className="pb-2 pl-2">Permissions</th>
                  <th className="pb-2">User</th>
                  <th className="pb-2">Date Modified</th>
                  <th className="pb-2">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2 pl-2 text-gray-500">drwxr-xr-x</td>
                  <td className="py-2 text-neon-pink">maged</td>
                  <td className="py-2 text-blue-400">Dec 25 15:40</td>
                  <td className="py-2 text-blue-300">.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2 pl-2 text-gray-500">drwxr-xr-x</td>
                  <td className="py-2 text-neon-pink">root</td>
                  <td className="py-2 text-blue-400">Jan 01 00:00</td>
                  <td className="py-2 text-blue-300">..</td>
                </tr>
                {projectList.map((project, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => window.open(project.link, '_blank')}>
                    <td className="py-2 pl-2 text-gray-500">{project.perm}</td>
                    <td className="py-2 text-neon-pink">maged</td>
                    <td className="py-2 text-blue-400">{project.date}</td>
                    <td className="py-2 group-hover:text-neon-cyan transition-colors">
                      <span className={project.perm.startsWith('d') ? 'text-blue-300 font-bold' : 'text-green-300'}>
                        {project.name}
                      </span>
                      <span className="ml-4 text-xs text-gray-500 hidden md:inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                        # {project.description.slice(0, 60)}...
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-neon-cyan animate-pulse mt-8">
            {'>'} _
          </div>

        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const descriptions: { [key: string]: string } = {};

  if (Object.keys(descriptions).length === 0) {
    try {
      const descriptionPromises = projectsWithDescriptions.map((project) =>
        getRepoDescription(`https://github.com/magedhennawy/${project}`)
          .then((description) => {
            descriptions[project] = description;
          })
          .catch((error) => {
            console.error(`Error fetching description for ${project}: ${error}`);
            descriptions[project] = 'Description unavailable.';
          })
      );

      await Promise.all(descriptionPromises);
    } catch (error) {
      console.error(`Error fetching descriptions: ${error}`);
    }
  }

  return {
    props: {
      descriptions,
    },
    // revalidate: 3600,
  };
}

export default Projects;
// export const runtime = 'experimental-edge';
