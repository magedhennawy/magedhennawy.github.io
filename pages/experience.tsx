import Head from 'next/head';
import ExperienceCard from '../components/ExperienceCard';

function Experience() {
  return (
    <div>
      <Head>
        <title>Maged Hennawy | Work Experience</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <p className="sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 text-white text-center">
            My Work Experience
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-1xl text-white mb-2">
            Here, you&apos;ll find a list of software engineering positions
            I&apos;ve held, the companies I&apos;ve worked for, the projects
            that I worked on, some of the responsibilities I had, and what I
            learned.
          </p>
          <ExperienceCard
            companyName="Clarify Health Solutions"
            subCompanyDescription="Healthcare Analytics & Insights"
            dateRange="December 2022 - February 2024"
            jobTitle="Full Stack Engineer"
            location="San Francisco, CA"
            logoUrl="https://media.licdn.com/dms/image/v2/D4E0BAQH7AGywu9RhRA/company-logo_200_200/company-logo_200_200/0/1728345281605/clarify_health_solutions_logo?e=2147483647&v=beta&t=vdLvRJSu6eJfIrNfoSL5WaTOpiKIp_WD7U3Ey9es4z4"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  At Clarify Health, I worked on a team that was responsible for building a platform that enabled healthcare providers to deliver better care to their patients. I was responsible for developing and maintaining the company's core product, which was a web application that allowed users to access and analyze healthcare data. I worked on both the frontend and backend of the application, using technologies such as Angular, Node.js, and PostgreSQL.
                </p>
                <ul>
                  <li>
                    ● Built extensible data components within plug and play custom framework for customer success teams to configure for clients.
                  </li>
                  <li>
                    ● Focused on backend development with Node.js, crafting scalable API endpoints capable of handling over 10,000 requests per minute while maintaining a
                    99.99% uptime. Integrated these APIs with PostgreSQL databases to ensure efficient and reliable data exchange between the frontend and backend
                    systems.
                  </li>
                  <li>
                    ● Developed comprehensive documentation for the UX/UI library and API services, which reduced the onboarding time for new developers by 40%.
                    Documentation fostered better adherence to development best practices and coding standards.
                  </li>

                  <li>
                    ● Engaged in ideation and development of custom design system organizing display components, icons, colors and implemented pre-commit linting and
                    unit testing.
                  </li>
                  <li>
                    ● Collaborated cross-functionally with design and product management to set requirements and define user workflows, enabling more user-centric design.

                  </li>
                  <li>
                    ● Participated in code reviews of core team and gatekept sections of code changes from offshore engineering team of 8 engineers.
                  </li>
                </ul>

              </div>
            }
            links={[
              {
                url: 'https://clarifyhealth.com/',
                displayText: 'Company Website',
              },
            ]}
          />
          <ExperienceCard
            companyName="RBC"
            subCompanyDescription="Wealth Management"
            dateRange="Jan 2020 - December 2021"
            jobTitle="Senior Angular Developer - Lead Developer"
            logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8u0I9vgV06TU_vep8xzO3PU4Owu2uVz3WPg&s"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  I worked as a Senior Angular Developer at RBC Wealth Management
                  in the Digital Wealth team. I was responsible for developing
                  and maintaining the company&apos;s core product, which was a
                  web application that allowed users to access and manage their
                  investment portfolios. I worked on both the frontend and
                  backend of the application, using technologies such as Angular,
                  Node.js, and MongoDB.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                  As the Lead Developer on the team, I was responsible for
                  managing a team of developers and ensuring that the project was
                  completed on time and within budget. I also worked closely with
                  the product manager to define the project&apos;s requirements
                  and ensure that the final product met the needs of the
                  end-users.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                  Built a complete Design System for the RBC Wealth Management brand, in React, Angular, and Vue which was used by 10+ teams across the organization.
                  This helped to ensure consistency in the user interface and user experience across all of the company's products and improve the efficiency of the development process.
                </p>

                <p>
                  <strong>
                    This experience was a testament to the power of my
                    leadership, teamwork, rapid learning, and innovative
                    thinking and their potential to create impactful solutions.
                  </strong>
                </p>
                <ul>
                  <li>
                    ● Led the integration of third-party APIs and microservices with the Node.js backend, facilitating seamless data exchange and expanding the functionality
                    of banking applications.
                  </li>
                  <li>
                    ● Delivered a more inclusive digital banking experience. Promoted design and accessibility best practices, ensuring compliance with industry standards like
                    WCAG, enhancing accessibility for users with disabilities.
                  </li>
                  <li>
                    ● Developed UI/UX library for RBC using Vue.js, Angular, and React, which became a key tool for creating consistent user experiences across all RBC web
                    products. This system allowed development teams to focus on product innovation
                  </li>
                  <li>
                    ● Implemented globalization and localization for the UI components, enabling them to be used by users with disabilities and international customers. This
                    inclusion increased the library’s adoption by 30%, enhancing RBC’s global reach.
                  </li>
                  <li>
                    ● Contributed to backend systems' continuous improvement, advocating for best practices in code quality, security, and performance. These efforts led to
                    a 25% improvement in system stability and reduced the number of security vulnerabilities.
                  </li>

                </ul>
              </div>
            }
            links={[
              {
                url: 'https://www.publicissapient.com/',
                displayText: 'Company Website',
              },
            ]}
          />
          <ExperienceCard
            companyName="IBM"
            subCompanyDescription="Carbon Design System Team"
            dateRange="May 2017 - Jan 2020"
            jobTitle="Software Developer"
            logoUrl="https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  At IBM, I worked on the Carbon Design System team, where I was responsible for developing and maintaining the company's core design system, 
                  which was a set of reusable components and guidelines that allowed developers to create consistent user interfaces across all of IBM's products. 
                  I worked on the frontend and the design portion (alongside designers) of the design system, using technologies such as Angular, Storybook, and Sketch.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                  I was responsible for developing new components and updating existing ones to ensure that they met the latest design standards and accessibility guidelines. 
                  I also worked closely with the design team to ensure that the components were visually consistent and aligned with the company's brand guidelines.
                </p>

                <p>
                  I am proud to have started and continuously contributed to the{' '}
                  <a
                    href="https://carbondesignsystem.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Carbon Design System
                  </a>
                  {'. '}
                  <strong>
                    This experience not only honed my technical skills but also
                    reinforced my passion for software engineering and its
                    potential to create impactful and innovate solutions in the
                    field of front end solutions.
                  </strong>
                </p>
              </div>
            }
            links={[
              {
                url: 'https://www.ibm.com/',
                displayText: 'IBM Website',
              },
              {
                url: 'https://carbondesignsystem.com/',
                displayText: 'Carbon Design System Website',
              }
            ]}
          />
          <ExperienceCard
            companyName="Scarborough Health Network"
            subCompanyDescription='Software Engineering Intern'
            dateRange="Sept 2016 - April 2017"
            jobTitle="Software Engineer Intern"
            logoUrl="https://upload.wikimedia.org/wikipedia/en/e/e3/Scarborough_Health_Network_logo%2C_May_2019.png"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  At Scarborough Health Network, I worked as a Software Engineering Intern in the IT department. I was responsible for developing and maintaining the company's core software applications, which were used by healthcare professionals to manage patient records and appointments. I worked on both the frontend and backend of the applications, using technologies such as PHP, Spring Boot, and Angular.
                  Also worked on the development of a web application that allowed physicians to dictate patient notes using voice recognition technology. The application was built using AngularJS and PHP and integrated with the hospital's existing electronic health record system.
                </p>

                <p>
                  Despite the complexity of the task and my unfamiliarity with
                  AngularJS/PHP, I was able to learn the basics of the language in just
                  a week. I heavily relied on documentation to aid in the
                  development of the program. My efforts paid off when my
                  supervisor expressed great admiration for the work I had
                  accomplished in such a short period of time and even offered
                  me position at the company. However, as I was still in university and wanted to prioritize my studies, I had to
                  respectfully decline the offer.{' '}
                  <strong>
                    {' '}
                    This experience was a testament to my ability to quickly
                    adapt to new technologies and deliver impressive results.
                  </strong>
                </p>
              </div>
            }
            links={[
              {
                url: 'https://www.shn.ca/',
                displayText: 'Company Website',
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}

export default Experience;
