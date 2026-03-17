export const PERSONAL = {
  name: 'Adarsh Balanolla',
  title: 'GenAI Engineer',
  tagline: 'Building AI Agents and Intelligent Systems that Accelerate Engineering Cycles',
  email: 'adarshreddybms@gmail.com',
  github: 'https://www.github.com/ar6420/',
  linkedin: 'https://www.linkedin.com/in/balanolla/',
  resumePath: '/AdarshBalanolla_RESUME.pdf',
};

export const STATS = [
  { value: 50, suffix: '%', label: 'Cycle Time Reduction' },
  { value: 5000, suffix: '+', label: 'Daily Requests Served' },
  { value: 1000, suffix: '+', label: 'npm Downloads' },
  { value: 99.99, suffix: '%', label: 'Platform Uptime' },
];

export const PROJECTS = [
  {
    icon: '🐙',
    title: 'Hail Hydra',
    subtitle: 'Open-Source Multi-Agent Framework for Claude Code',
    description:
      'A production-grade multi-agent orchestration framework that turns Claude Code into a team of specialized AI agents. Routes tasks to optimal sub-agents (Haiku, Sonnet, Opus) based on complexity, cutting API costs by ~50% while maintaining quality.',
    impact: [
      '1,000+ npm downloads in first 3 weeks',
      'Featured on social developer channels',
      'Fully open-source with active community contributions',
    ],
    tech: ['TypeScript', 'Claude Code', 'Multi-Agent Systems', 'npm'],
    links: {
      npm: 'https://www.npmjs.com/package/hail-hydra-cc',
      github: 'https://github.com/AR6420/Hail_Hydra',
    },
  },
  {
    icon: '🤖',
    title: 'AI Agents for Semiconductor Engineering',
    subtitle: 'Enterprise AI Platform - Tessolve Semiconductors',
    description:
      'Architected and deployed a fleet of GenAI agents that automate repetitive semiconductor engineering workflows - from datasheet Q&A to automated code review and test generation - reducing cycle time by 50%.',
    impact: [
      '50% reduction in engineering cycle time',
      '5,000+ daily requests across engineering teams',
      '99.99% platform uptime in production',
    ],
    tech: ['Python', 'LangChain', 'AWS Bedrock', 'RAG', 'FastAPI', 'React'],
    links: {},
  },
  {
    icon: '🔴',
    title: 'OpenAI Red-Teaming',
    subtitle: 'Adversarial AI Safety Research',
    description:
      'Conducted systematic adversarial testing of OpenAI language models to identify failure modes, biases, and safety vulnerabilities. Developed novel attack strategies and documented findings to improve model robustness.',
    impact: [
      'Identified critical edge cases in model safety filters',
      'Published methodology and findings on Kaggle',
      'Contributed to broader AI safety research community',
    ],
    tech: ['Python', 'Prompt Engineering', 'Adversarial ML', 'NLP'],
    links: {
      kaggle: 'https://www.kaggle.com/competitions/openai-gpt-oss-20b-red-teaming/writeups/gemini-cli-browsermcp-automation-for-multi-turn-pr',
    },
  },
];

export const CERTIFICATIONS = [
  {
    title: 'AWS Certified Generative AI Developer - Professional',
    badge: 'Early Adopter',
    badgeDetail: '1 of ~5,000 Globally',
    issuer: 'Amazon Web Services',
    featured: true,
    link: 'https://www.credly.com/badges/da8b7fa1-dd96-411e-8b83-37f17b5730e1/linked_in_profile',
  },
  {
    title: 'Anthropic Model Context Protocol (MCP)',
    issuer: 'Anthropic / Skilljar',
    featured: false,
    link: 'https://verify.skilljar.com/c/9oa7bo3tojzx',
  },
  {
    title: 'Microsoft Certified: Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    featured: false,
    link: 'https://learn.microsoft.com/en-us/users/mani-balanolla/credentials/83539399e760163e?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
];

export const ABOUT = {
  bio: `Software Developer specializing in Generative AI and intelligent automation. At Tessolve Semiconductors, I architect AI agent systems that transform how semiconductor engineers work - replacing hours of manual processes with intelligent, self-improving pipelines. My approach combines deep technical knowledge of LLMs, retrieval-augmented generation, and cloud infrastructure with a relentless focus on measurable engineering impact.`,
  education: {
    university: 'The University of Texas at Dallas',
    degree: 'Master of Science in Business Analytics',
    concentration: 'Applied Machine Learning',
    honor: 'Scholar with Recognition',
  },
  leadership: {
    role: 'Vice President',
    organization: 'Graduate Student Assembly',
    university: 'UT Dallas',
  },
};
