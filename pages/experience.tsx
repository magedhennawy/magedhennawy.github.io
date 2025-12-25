import Head from 'next/head';
import React, { useEffect, useState } from 'react';

interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
}

const jobs: Job[] = [
  {
    company: 'Royal Canadian Air Force',
    role: 'Full Stack Engineer',
    period: '2024 - Present',
    location: 'Toronto, ON',
    description: [
      'Building scalable web and enterprise applications for mission-critical systems.',
      'Developing secure and robust software solutions using Angular, React, and TypeScript.',
      'Collaborating with cross-functional teams to modernize defense infrastructure.',
      'Ensuring high availability and reliability of deployed applications.'
    ],
    tech: ['Angular', 'React', 'TypeScript', 'Secure Coding']
  },
  {
    company: 'Clarify Health Solutions',
    role: 'Full Stack Engineer',
    period: '2022 - 2024',
    location: 'San Francisco, CA',
    description: [
      'Built extensible data components within a custom framework for customer success teams.',
      'Focused on backend Node.js development, crafting scalable APIs handling 10k+ requests/min with 99.99% uptime.',
      'Integrated APIs with PostgreSQL for efficient data exchange.',
      'Developed comprehensive docs for UX/UI library and API services, reducing onboarding time by 40%.',
      'Engaged in ideation and development of a custom design system.'
    ],
    tech: ['Node.js', 'Angular', 'PostgreSQL', 'Design Systems']
  },
  {
    company: 'RBC',
    role: 'Senior Angular Developer - Lead',
    period: '2020 - 2021',
    location: 'Toronto, ON',
    description: [
      'Led a team of developers ensuring project completion on time and within budget.',
      'Built a complete Design System for RBC Wealth Management in React, Angular, and Vue used by 10+ teams.',
      'Led integration of third-party APIs and microservices with Node.js backend.',
      'Promoted accessibility best practices (WCAG), enhancing inclusivity.'
    ],
    tech: ['Angular', 'React', 'Vue', 'Node.js', 'Microservices']
  },
  {
    company: 'IBM',
    role: 'Software Developer',
    period: '2017 - 2020',
    location: 'Toronto, ON',
    description: [
      'Core contributor to the Carbon Design System, building reusable components for consistency across IBM products.',
      'Worked on frontend and design implementation using Angular, Storybook, and Sketch.',
      'Collaborated closely with designers to align components with brand guidelines.'
    ],
    tech: ['Angular', 'Storybook', 'Carbon Design System', 'Sketch']
  },
  {
    company: 'Scarborough Health Network',
    role: 'Software Engineering Intern',
    period: '2016 - 2017',
    location: 'Toronto, ON',
    description: [
      'Developed core software applications for patient records using PHP, Spring Boot, and Angular.',
      'Built a voice recognition web app for physician notes.',
      'Quickly adapted to new technologies (AngularJS/PHP) and delivered impactful results.'
    ],
    tech: ['PHP', 'Spring Boot', 'AngularJS']
  }
];

function Experience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Head>
        <title>Maged Hennawy | Experience Log</title>
      </Head>
      <div className="w-full max-w-6xl terminal-container h-[85vh] flex flex-col">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span className="ml-4 text-xs text-gray-400 font-mono">maged@portfolio:~/career/experience.log</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 bg-cyber-black p-4 md:p-8 overflow-y-auto custom-scrollbar font-mono text-gray-300">

          <div className="mb-6">
            <span className="text-neon-cyan mr-2">➜</span>
            <span className="text-terminal-green">~</span>
            <span className="text-white"> tail -f experience.log</span>
          </div>

          <div className="space-y-10">
            {jobs.map((job, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 text-neon-pink mb-2 border-b border-gray-800 pb-1">
                  <span className="text-lg md:text-xl font-bold">{'>'} [{job.period}]</span>
                  <span className="text-white font-bold text-xl md:text-2xl">{job.role}</span>
                  <span className="md:ml-auto text-gray-400">@ {job.company}</span>
                </div>
                <div className="pl-4 border-l-2 border-gray-700 ml-1">
                  <p className="text-xs text-gray-500 mb-2">// Location: {job.location}</p>
                  <ul className="list-none space-y-1 mb-3 text-sm md:text-base">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex">
                        <span className="text-neon-cyan mr-2">{'>'}</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.tech.map((t, i) => (
                      <span key={i} className="text-xs bg-gray-800 text-terminal-green px-2 py-1 rounded border border-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="text-neon-cyan animate-pulse mt-8">
              {'>'} _
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Experience;
