import Head from 'next/head';
import EducationCard from '../components/EducationCard';

function Education() {
  return (
    <div>
      <Head>
        <title>Maged Hennawy | My Education</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 text-white text-center">
            My Education
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-1xl text-white mb-2 text-center">
            Here, you&apos;ll find a list of my educational experiences,
            associations, activities/societies, and awards/achievements.
          </p>
          <EducationCard
            schoolName="Coursera"
            subschoolDescription="Advanced React by Meta"
            dateRange="May 2020 - June 2021"
            credential="Completed Course on Advanced React with certification"
            location="Online"
            logoUrl="https://pngimg.com/d/meta_PNG3.png"
            links={[
              {
                url: 'https://www.coursera.org/learn/advanced-react',
                displayText: 'Website',
              },
            ]}
          />
          <EducationCard
            schoolName="University Of Toronto"
            subschoolDescription="Computer Science"
            dateRange="August 2014 - May 2019"
            credential="Bachelor of Science in Computer Science with Highest Honors"
            logoUrl="https://diglib.org/wp-content/uploads/sites/3/2014/12/UofT_Logo.svg_-e1418677958967-300x123.png"
            links={[
              {
                url: 'https://www.utoronto.ca/',
                displayText: 'University Website',
              }
            ]}
            eduDescription={
              <p>
                <b>Specialist:</b> Software Engineering
              </p>
            }
          />
        </div>
      </main>
    </div>
  );
}

export default Education;
