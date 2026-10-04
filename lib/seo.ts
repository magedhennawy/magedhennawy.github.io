import { SITE_URL, education, eras, person, skills } from '@/data/profile';

export const seo = {
  title: `${person.name} | ${person.title}`,
  description:
    'Lead full-stack and platform engineer. 8 years at IBM, RBC, Clarify Health and the RCAF. Platform author, production AI on AWS Bedrock, founder of Perus.',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.png`,
};

export function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: person.name,
        jobTitle: person.title,
        url: seo.url,
        image: seo.image,
        email: `mailto:${person.email}`,
        description: person.summary,
        sameAs: [person.github, person.linkedin],
        worksFor: { '@type': 'Organization', name: 'Royal Canadian Air Force' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: education[0].org },
        knowsAbout: skills.filter((s) => s.level >= 3).map((s) => s.name),
        hasOccupation: eras
          .filter((e) => e.id !== 'ai')
          .map((e) => ({ '@type': 'Occupation', name: e.role, description: `${e.org}, ${e.period}` })),
        address: { '@type': 'PostalAddress', addressCountry: 'CA' },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: seo.url,
        name: person.name,
        inLanguage: 'en-CA',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
}
