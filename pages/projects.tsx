import Head from 'next/head';
import ProjectCard from '../components/ProjectCard';
import { FaHackerrank } from 'react-icons/fa';

// const github_pat = process.env.GITHUB_PAT;

const loadingMessage =
  'Failed to fetch GitHub Repository description. Respositories might be private. Please try again later.';
// const projectsWithDescriptions = [''];

async function getRepoDescription(githubRepoUrl: string) {
  const [, owner, repo] = new URL(githubRepoUrl).pathname.split('/');
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${github_pat}`,
      //   },
      // }
    );
    const data = await response.json();
    return data.description || loadingMessage;
  } catch (error) {
    console.error(`Error: ${error}`);
    return 'Error: Could not fetch GitHub Repository description. Respositories might be private. Please try again later.';
  }
}

// Add your GitHub Repository names here to fetch descriptions from GitHub API
const projectsWithDescriptions = [
  'carbon-design-system/carbon-components-angular',
  'portfolio',
  'leetcode',
  'hackerrank',
];

// function LoadingCard() {
//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
//     </div>
//   );
// }
interface ProjectsProps {
  descriptions: { [key: string]: string };
}
function Projects({ descriptions }: ProjectsProps) {
  // const isLoading = Object.values(descriptions).includes(loadingMessage);
  return (
    <div>
      <Head>
        <title>Maged Hennawy | My Projects</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <p className="text-3xl font-bold mb-2 text-center text-green-200 underline">
          Ongoing Projects
        </p>
        <div className="flex flex-wrap justify-center -mx-2 bg-green-300 bg-opacity-30 rounded">
          <ProjectCard
            name="Jinx Lounge Employee Management System"
            description={`${
              descriptions['CutieBot'] || loadingMessage
            } Written in JavaScript.`}
            githubLink="https://github.com/magedhennawy/early-version-staff-pay"
          />
          <ProjectCard
            name="Software Engineer Portfolio Website"
            description={`This website I made with TypeScript! ${
              descriptions['portfolio'] || loadingMessage
            } Made with Next.js (React) and TailwindCSS.`}
            githubLink="https://github.com/magedhennawy/magedhennawy.github.io"
            demoLink="/"
          />
        </div>
        <p className="text-3xl font-bold mb-2 text-center text-blue-200 underline pt-4">
          Completed Projects
        </p>
        <div className="flex flex-wrap justify-center -mx-2 bg-blue-300 bg-opacity-30 rounded">
          <ProjectCard
            name="Carbon Components Angular (IBM Open Source Contribution)"
            description="Contributed to the IBM Carbon Design System by implementing Angular components and features for the Carbon Angular library. This project was made with Angular, TypeScript, and Storybook."
            githubLink="https://github.com/carbon-design-system/carbon-components-angular"
          />
          <ProjectCard
            name="JSoneditor (Open Source Contribution)"
            description="A web-based JSON editor that allows users to view, edit, and format JSON data. I contributed to this project by adding new features and fixing bugs. This project was made with JavaScript, HTML, and CSS."
            githubLink="https://github.com/josdejong/jsoneditor"
          />
        </div>
        <p className="text-3xl font-bold mb-2 text-center text-purple-200 underline pt-4">
          Coding Challenge Solutions
        </p>
        <div className="flex flex-wrap justify-center -mx-2 bg-purple-300 bg-opacity-30 rounded">
          <ProjectCard
            name="My Personal LeetCode Solutions"
            description={descriptions['leetcode'] || loadingMessage}
            githubLink="https://github.com/magedhennawy/leetcode"
            demoLink="https://leetcode.com/magedhennawy/"
            demoText="Profile"
            // There is no LeetCode Icon from FontAwesome yet
          />
          <ProjectCard
            name="My Personal HackerRank Solutions"
            description={descriptions['hackerrank'] || loadingMessage}
            githubLink="https://github.com/magedhennawy/hackerrank"
            demoLink="https://www.hackerrank.com/profile/magedhennawy"
            demoText="Profile"
            Icon={FaHackerrank}
          />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const descriptions: { [key: string]: string } = {};
  console.log('Fetching descriptions...');

  // if length of descriptions is 0, then we need to fetch descriptions
  if (Object.keys(descriptions).length === 0) {
    try {
      console.log('Attempting to fetch descriptions...');
      // Fetch all descriptions in parallel
      const descriptionPromises = projectsWithDescriptions.map((project) =>
        getRepoDescription(`https://github.com/magedhennawy/${project}`)
          .then((description) => {
            descriptions[project] = description;
          })
          .catch((error) => {
            console.error(
              `Error fetching description for ${project}: ${error}`
            );
            descriptions[project] =
              'Error: Could not fetch GitHub Repository description. Please try again later.';
          })
      );

      await Promise.all(descriptionPromises);
      console.log('Finished fetching descriptions!');
    } catch (error) {
      console.error(`Error fetching descriptions: ${error}`);
    }
  }

  return {
    props: {
      descriptions,
    },
    // revalidate: projectsWithDescriptions.length * 60,
  };
}

export default Projects;
// Comment out this line if you are doing npm run dev
// export const runtime = 'experimental-edge';
