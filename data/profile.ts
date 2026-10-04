// Site content. The page, the 3D scene, the résumé and the JSON-LD all read from here.
// Keep defence systems generic (no codenames or internal repo names) and no phone/address.

export type Category = 'frontend' | 'backend' | 'cloud' | 'security' | 'ai';
// 4 core, 3 advanced, 2 proficient, 1 emerging
export type Level = 1 | 2 | 3 | 4;

export const SITE_URL = 'https://magedhennawy.github.io';

export const person = {
  name: 'Maged Hennawy',
  title: 'Lead Full-Stack & Platform Engineer',
  years: 8,
  location: 'Ottawa / Toronto, Canada',
  email: 'magedhennawy@gmail.com',
  github: 'https://github.com/magedhennawy',
  linkedin: 'https://www.linkedin.com/in/magedhennawy',
  tagline:
    'I build shared platforms that other teams ship on, plus the AI, security and tooling around them.',
  summary:
    'Eight years architecting and shipping enterprise software across IBM, RBC, Clarify Health and the Royal Canadian Air Force. I authored a shared full-stack platform that ~10 secure government applications are built on, ship production LLM/RAG features on AWS Bedrock, and founded a live Canadian fintech.',
};

export const categories: Record<Category, { label: string; blurb: string }> = {
  frontend: { label: 'Frontend', blurb: 'Typed SPAs, design systems, accessibility' },
  backend: { label: 'Backend', blurb: 'APIs, data modelling, real-time' },
  cloud: { label: 'Cloud & DevOps', blurb: 'AWS, IaC, CI/CD, edge' },
  security: { label: 'Security', blurb: 'Identity, compliance, vulnerability engineering' },
  ai: { label: 'Applied AI', blurb: 'LLMs, MCP, RAG, optimization' },
};

export type Era = {
  id: string;
  org: string;
  role: string;
  period: string;
  place: string;
  headline: string;
  points: string[];
  stack: string[];
};

export const eras: Era[] = [
  {
    id: 'ibm',
    org: 'IBM',
    role: 'Software Developer',
    period: '2017 – 2020',
    place: 'Markham, ON',
    headline: 'Started the open-source Carbon Components Angular library.',
    points: [
      'Started IBM Carbon Components Angular (28,000+ downloads). Still a code owner and reviewer.',
      'Built the UI/UX component library for the Watson business unit with designers and developers.',
      'Implemented globalization and localization for international users.',
    ],
    stack: ['Angular', 'TypeScript', 'NgRx', 'ASP.NET Core', 'Storybook', 'Jest'],
  },
  {
    id: 'rbc',
    org: 'RBC',
    role: 'Senior Angular Developer, Lead Developer',
    period: '2020 – 2021',
    place: 'Toronto, ON',
    headline: 'Led a shared UI library used across RBC web products.',
    points: [
      'Built a UI/UX library for Vue, Angular and React that RBC web products standardized on.',
      'Accessibility and localization work (WCAG) that grew the library’s adoption by 30%.',
      'Led integration of third-party APIs and microservices with the Node.js backend.',
    ],
    stack: ['Angular', 'React', 'Vue', 'NgRx', 'ASP.NET Core', 'MS SQL Server'],
  },
  {
    id: 'clarify',
    org: 'Clarify Health',
    role: 'Full Stack Engineer',
    period: '2021 – 2024',
    place: 'San Francisco (remote)',
    headline: 'Node APIs at 10k+ requests/min with 99.99% uptime.',
    points: [
      'Scalable Node.js API endpoints handling 10,000+ requests per minute at 99.99% uptime.',
      'Extensible data components inside a plug-and-play framework configured by customer-success teams.',
      'Documentation for the UI library and API services that cut developer onboarding time by 40%.',
    ],
    stack: ['Angular', 'RxJS', 'Node.js', 'PostgreSQL', 'AWS Athena / Redshift', 'Redis'],
  },
  {
    id: 'rcaf',
    org: 'Royal Canadian Air Force',
    role: 'Lead Full-Stack & Platform Engineer',
    period: '2025 – present',
    place: 'Ottawa (remote)',
    headline: 'Authored “RAP”, the platform ~10 secure applications run on.',
    points: [
      'Architected and own RAP, a start-to-production platform that cut new-project setup and deployment from weeks to under an hour.',
      'Terraform and AWS CDK for ECS Fargate, Aurora, Cognito, KMS and Secrets Manager; led a CDK → Terraform consolidation.',
      'SSO via Microsoft Entra ID (Cognito federation) with Casbin RBAC/ABAC; least-privilege IAM and automated secret rotation.',
      'Continuous ATO compliance platform (NIST 800-53, 59 custom cloud checks) and a 770-finding vulnerability remediation across 400+ resources.',
      'Technical lead for an 8-person pod; hiring for subcontractors and mentoring engineering interns.',
    ],
    stack: ['Vue 3', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Terraform', 'AWS'],
  },
  {
    id: 'ai',
    org: 'Applied AI',
    role: 'Production LLM & decision systems',
    period: '2025 – present',
    place: 'RCAF · AWS Bedrock',
    headline: 'Production AI on AWS Bedrock: MCP, RAG, cited answers.',
    points: [
      'Model Context Protocol server with 10+ tools orchestrating embeddings, vector search and LLM inference.',
      'RAG over pgvector with source attribution, cited sources and confidence scores, streamed over SSE.',
      'A domain-scoped Claude assistant inside a business-planning tool.',
      'Replaced a legacy Excel/VBA solver with an O(n log n) constrained-optimization engine that scales past 1,000+ activities and guarantees coverage of all 25 funding segments.',
    ],
    stack: ['AWS Bedrock (Claude)', 'MCP', 'pgvector', 'FastAPI', 'SSE', 'Python'],
  },
];

export type App = {
  id: string;
  name: string;
  domain: string;
  blurb: string;
  ai?: boolean;
};

// Apps built on RAP (generic names only)
export const apps: App[] = [
  { id: 'procedures', name: 'Procedures Authoring', domain: 'Aerospace', blurb: 'Rich-text procedure authoring and review workflows. RAP grew out of this app.' },
  { id: 'safety', name: 'Flight-Safety Reporting', domain: 'Aviation safety', blurb: 'Occurrence and hazard reporting over 25+ normalized models, with spatial analysis.' },
  { id: 'fleet', name: 'Fleet Operations', domain: 'Aviation logistics', blurb: 'Fleet ops and crew handovers across 22 domains, with exactly-once jobs via distributed locks.' },
  { id: 'cargo', name: 'Air Cargo Operations', domain: 'Air transport', blurb: 'Scheduling, calendars and operational dashboards for air cargo.' },
  { id: 'tactical', name: 'Tactical Scheduling', domain: 'Operations', blurb: 'Network scheduling with geospatial planning tools.' },
  { id: 'sar', name: 'Search & Rescue Cases', domain: 'Emergency response', blurb: 'Case management with live GIS maps and point-in-polygon analysis.' },
  { id: 'readiness', name: 'Personnel Readiness', domain: 'Health & wellness', blurb: 'Bilingual readiness and wellness tracking for personnel.' },
  { id: 'innovation', name: 'Innovation Pipeline', domain: 'Internal tooling', blurb: 'Configurable workflow pipelines with an AI copilot on an MCP server + RAG.', ai: true },
  { id: 'facilities', name: 'Facility Booking', domain: 'Facilities', blurb: 'Room and resource booking and facility management.' },
  { id: 'budget', name: 'Strategic Budget Planning', domain: 'Decision support', blurb: 'Constrained-optimization engine plus a domain-scoped Claude assistant.', ai: true },
  { id: 'compliance', name: 'Continuous ATO', domain: 'Security compliance', blurb: 'NIST 800-53 control automation, 59 custom cloud checks and a Bedrock compliance assistant.', ai: true },
];

export type Venture = {
  id: string;
  name: string;
  role: string;
  url?: string;
  blurb: string;
  stack: string[];
};

export const ventures: Venture[] = [
  {
    id: 'perus',
    name: 'Perus',
    role: 'Founder',
    url: 'https://perus.ca',
    blurb:
      'Live Canadian real-estate equity-crowdfunding platform. Three tiers (Astro site, Vue app, Hono API) on Cloudflare Workers + Fly.io, with securities-exemption-aware architecture, Canadian data residency and a points-and-rewards engine.',
    stack: ['Hono', 'Cloudflare Workers', 'Fly.io', 'Prisma', 'Supabase', 'Astro', 'Vue 3'],
  },
  {
    id: 'zerotax',
    name: 'ZeroTax',
    role: 'Builder',
    blurb:
      'Multi-entity Canadian tax-optimization engine for CCPCs and a personal T1: CRA T5 XML e-file, SR&ED flagging, dividend/SBD modelling and Gemini-powered transaction categorization.',
    stack: ['Vue 3', 'Vuetify', 'Express', 'Sequelize', 'Gemini'],
  },
  {
    id: 'jinx',
    name: 'Jinx',
    role: 'Builder',
    blurb:
      'Employee payroll and scheduling app for a small business, with real-time hours tracking and automatic payroll calculation.',
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
];

export type Skill = {
  id: string;
  name: string;
  category: Category;
  level: Level;
  evidence: string;
  // era/app/venture ids, or 'rap' for the platform itself
  proof: string[];
};

export const skills: Skill[] = [
  // Frontend
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 4, evidence: 'Used across nearly every project (backend, frontend and IaC), with strict no-any rules enforced across RAP.', proof: ['rap', 'ibm', 'clarify', 'perus'] },
  { id: 'angular', name: 'Angular', category: 'frontend', level: 4, evidence: '5+ years across IBM, RBC and Clarify; started the open-source Carbon Components Angular library (28k+ downloads).', proof: ['ibm', 'rbc', 'clarify'] },
  { id: 'vue', name: 'Vue 3', category: 'frontend', level: 4, evidence: 'Composition API + Vuetify + Pinia is the standard stack across every RAP app.', proof: ['rap', 'safety', 'fleet', 'sar', 'zerotax'] },
  { id: 'react', name: 'React & Next.js', category: 'frontend', level: 4, evidence: 'RBC UI library, the compliance platform (React + Radix), Jinx and this site; Meta Advanced ReactJS.', proof: ['rbc', 'compliance', 'jinx'] },
  { id: 'design-systems', name: 'Design systems', category: 'frontend', level: 4, evidence: 'Component libraries at IBM (Carbon), RBC (cross-framework) and the reusable RAP Vue library.', proof: ['ibm', 'rbc', 'rap'] },
  { id: 'a11y', name: 'Accessibility (WCAG 2.1 AA)', category: 'frontend', level: 3, evidence: 'Inclusive banking UI at RBC and WCAG 2.1 AA government apps.', proof: ['rbc', 'readiness', 'rap'] },
  { id: 'i18n', name: 'Internationalization (EN/FR)', category: 'frontend', level: 3, evidence: 'Localization at IBM and RBC; bilingual EN/FR is a requirement on every government app.', proof: ['ibm', 'rbc', 'readiness'] },
  { id: 'geo', name: 'Geospatial UI', category: 'frontend', level: 3, evidence: 'Leaflet + Turf maps with point-in-polygon for search & rescue and spatial safety analysis.', proof: ['sar', 'safety', 'tactical'] },
  { id: 'dataviz', name: 'Data visualization', category: 'frontend', level: 3, evidence: 'Operational dashboards and optimization widgets (ApexCharts, Highcharts).', proof: ['cargo', 'budget', 'clarify'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 3, evidence: 'Compliance platform, Jinx and this site.', proof: ['compliance', 'jinx'] },
  { id: 'threejs', name: 'Three.js / WebGL', category: 'frontend', level: 2, evidence: 'This site: react-three-fiber scene with custom GLSL shaders and an accessible HTML fallback.', proof: [] },

  // Backend
  { id: 'node', name: 'Node.js + Express', category: 'backend', level: 4, evidence: 'The RAP backend kernel and every consuming app; 10k+ req/min APIs at Clarify.', proof: ['rap', 'clarify', 'rbc'] },
  { id: 'postgres', name: 'PostgreSQL', category: 'backend', level: 4, evidence: 'Data modelling across every RAP app (Aurora) and Clarify’s API layer.', proof: ['rap', 'clarify', 'safety', 'jinx'] },
  { id: 'orm', name: 'Sequelize & Prisma', category: 'backend', level: 4, evidence: 'Typed ORMs and migrations across RAP apps and Perus.', proof: ['rap', 'perus', 'zerotax'] },
  { id: 'api', name: 'REST API design', category: 'backend', level: 4, evidence: 'Consistent domain-driven routing convention platform-wide.', proof: ['rap', 'clarify'] },
  { id: 'ddd', name: 'Domain-driven design', category: 'backend', level: 4, evidence: 'A five-file domain pattern with DI enforced across the platform; 22 domains in one app alone.', proof: ['rap', 'fleet'] },
  { id: 'realtime', name: 'Real-time (Socket.io, SSE)', category: 'backend', level: 3, evidence: 'Socket wrapper in the platform core; live policy pushes; SSE streaming for LLM answers.', proof: ['rap', 'innovation'] },
  { id: 'distributed', name: 'Distributed concurrency', category: 'backend', level: 3, evidence: 'DB-lease distributed locks for exactly-once jobs across multiple ECS replicas.', proof: ['fleet'] },
  { id: 'dotnet', name: 'C# / .NET Core', category: 'backend', level: 3, evidence: 'Multi-year ASP.NET Core with Dapper and MS SQL Server at IBM and RBC.', proof: ['ibm', 'rbc'] },
  { id: 'hono', name: 'Edge APIs (Hono)', category: 'backend', level: 3, evidence: 'Perus API on Cloudflare Workers + Fly.io with Web Crypto JWT and PBKDF2.', proof: ['perus'] },
  { id: 'python', name: 'Python / FastAPI', category: 'backend', level: 3, evidence: 'Agent services, ETL of legacy workbooks and custom compliance checks.', proof: ['budget', 'compliance', 'ai'] },

  // Cloud & DevOps
  { id: 'aws', name: 'AWS', category: 'cloud', level: 4, evidence: 'ECS Fargate, Aurora, Cognito, KMS, Secrets Manager, Route53 and VPC underneath every RAP app.', proof: ['rap', 'rcaf', 'clarify'] },
  { id: 'terraform', name: 'Terraform', category: 'cloud', level: 3, evidence: 'Reusable ECS/RDS/Cognito/KMS/VPC modules, remote state and drift recovery.', proof: ['rap', 'rcaf'] },
  { id: 'cdk', name: 'AWS CDK', category: 'cloud', level: 3, evidence: 'Multi-stack TypeScript CDK with cdk-nag policy-as-code; led a CDK → Terraform consolidation.', proof: ['cargo', 'compliance', 'rcaf'] },
  { id: 'cicd', name: 'CI/CD pipelines', category: 'cloud', level: 4, evidence: 'Staged Azure DevOps pipelines with shared gate templates across the fleet.', proof: ['rap', 'rcaf'] },
  { id: 'docker', name: 'Docker', category: 'cloud', level: 4, evidence: 'Healthcheck-gated, multi-stage images and one-command local environments for every app.', proof: ['rap'] },
  { id: 'platform', name: 'Platform engineering', category: 'cloud', level: 4, evidence: 'Authored RAP: a versioned framework, Vue library, Terraform modules and CI templates used by ~10 apps.', proof: ['rap', 'rcaf'] },
  { id: 'edge', name: 'Cloudflare & Fly.io', category: 'cloud', level: 3, evidence: 'Workers, Pages and R2 for Perus; Canadian data residency across Fly.io and Supabase.', proof: ['perus'] },
  { id: 'dx', name: 'Developer experience', category: 'cloud', level: 3, evidence: 'Project setup from weeks to under an hour; self-documenting Makefiles and template bootstrap.', proof: ['rap'] },

  // Security
  { id: 'sso', name: 'SSO & federated identity', category: 'security', level: 4, evidence: 'Cognito federated to Microsoft Entra ID via SAML across the fleet, with federated logout.', proof: ['rap', 'rcaf'] },
  { id: 'authz', name: 'RBAC / ABAC (Casbin)', category: 'security', level: 4, evidence: 'Four-tuple object-level authorization with role inheritance and live policy updates.', proof: ['rap'] },
  { id: 'cato', name: 'Continuous ATO', category: 'security', level: 3, evidence: 'NIST 800-53 Rev 5 control automation, control → evidence mappings and automated evidence capture.', proof: ['compliance', 'rcaf'] },
  { id: 'vuln', name: 'Vulnerability remediation', category: 'security', level: 3, evidence: '770-finding campaign (37 critical / 286 high) with transitive-dependency root-causing.', proof: ['rcaf'] },
  { id: 'iam', name: 'Cloud IAM hardening', category: 'security', level: 3, evidence: 'Least privilege and confused-deputy protection across 400+ resources.', proof: ['rcaf', 'compliance'] },
  { id: 'scanning', name: 'Security scanning gates', category: 'security', level: 4, evidence: 'Semgrep, Trivy, SonarQube, npm-audit and Gitleaks wired as blocking gates platform-wide.', proof: ['rap'] },
  { id: 'supply', name: 'Supply-chain security', category: 'security', level: 3, evidence: 'cosign image signing with KMS, keyless OIDC deploys and dependency governance.', proof: ['rap', 'budget'] },
  { id: 'regulated', name: 'Regulation-aware design', category: 'security', level: 3, evidence: 'Perus architecture that keeps KYC and funds out of platform scope; PIPEDA data residency.', proof: ['perus'] },

  // Applied AI
  { id: 'bedrock', name: 'LLM apps on AWS Bedrock', category: 'ai', level: 4, evidence: 'Claude on Bedrock across three products: compliance agent, planning assistant and MCP inference layer.', proof: ['ai', 'budget', 'compliance', 'innovation'] },
  { id: 'mcp', name: 'MCP servers & clients', category: 'ai', level: 3, evidence: 'Authored an MCP server (official SDK, 10+ tools, SSE) and a client with graceful degradation.', proof: ['ai', 'innovation'] },
  { id: 'rag', name: 'RAG & vector search', category: 'ai', level: 3, evidence: 'Embeddings + pgvector returning confidence-scored suggestions with cited sources.', proof: ['ai', 'innovation', 'compliance'] },
  { id: 'gemini', name: 'Gemini integration', category: 'ai', level: 3, evidence: 'Batch transaction categorization for ZeroTax.', proof: ['zerotax'] },
  { id: 'optimization', name: 'Constrained optimization', category: 'ai', level: 3, evidence: 'Two-pass greedy + bitmask-coverage solver, O(n log n), replacing an LP-simplex workbook.', proof: ['ai', 'budget'] },
  { id: 'ai-gov', name: 'AI-assisted dev governance', category: 'ai', level: 3, evidence: 'Authored the team’s AI best-practices standard and Copilot guardrails for onboarding interns.', proof: ['rap', 'rcaf'] },
];

export const education = [
  { title: 'Honours BSc, Software Engineering', org: 'University of Toronto' },
  { title: 'Advanced ReactJS', org: 'Meta (Coursera)' },
];

// proof id -> display label
export function proofLabel(id: string): string {
  if (id === 'rap') return 'RAP platform';
  const era = eras.find((e) => e.id === id);
  if (era) return era.org;
  const app = apps.find((a) => a.id === id);
  if (app) return app.name;
  const v = ventures.find((x) => x.id === id);
  if (v) return v.name;
  return id;
}

// Résumé-only fields (/resume and the PDF)
export const resume = {
  summary:
    'Senior full-stack engineer with 8 years of experience architecting and delivering enterprise-scale applications. Specialized in modern SPA architecture (React, Vue, Angular) and backend API development (Node.js, PostgreSQL), owning the full lifecycle from secure cloud infrastructure and CI/CD to heavily-typed user interfaces. Most recently the owner of a shared platform behind ~10 secure government applications, with production LLM/RAG features on AWS Bedrock. Founder of a live fintech product.',
  openSource: {
    name: 'Carbon Components Angular',
    role: 'Active code owner / reviewer',
    blurb: 'Maintaining and reviewing code for the open-source IBM UI library I started (28,000+ downloads).',
  },
  skills: [
    { label: 'Front-end', items: 'TypeScript, JavaScript, Angular, React, Vue, Next.js, Vuetify, Tailwind CSS, Highcharts, Mapbox, HTML5, SCSS' },
    { label: 'Back-end / data', items: 'Node.js, Express, FastAPI (Python), Loopback, Hono, .NET Core (C#), Sequelize, Prisma, PostgreSQL, MS SQL Server, MongoDB' },
    { label: 'Cloud & DevOps', items: 'AWS (ECS, RDS/Aurora, Cognito, KMS, S3, Athena/Redshift), Microsoft Entra ID, Terraform, AWS CDK, Cloudflare, Fly.io, Docker, cosign, Semgrep / Trivy / SonarQube, Casbin' },
    { label: 'AI / ML', items: 'AWS Bedrock (Claude), Model Context Protocol (MCP), RAG with citations, embeddings & vector search (pgvector), SSE / WebSocket streaming, constrained optimization' },
    { label: 'Workflow', items: 'Git, GitHub, Azure DevOps, CircleCI, Jest, Jasmine, Karma, Mocha, Chai, Storybook' },
  ],
  pdfPath: '/Maged-Hennawy-Resume.pdf',
  dates: { rcaf: 'Jan 2025 – Present', clarify: 'Dec 2021 – Jan 2024', rbc: 'Jan 2020 – Dec 2021', ibm: 'May 2017 – Jan 2020' } as Record<string, string>,
};
