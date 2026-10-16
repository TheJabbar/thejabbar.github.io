export interface Skill {
  name: string;
  level: 'Core' | 'Proficient' | 'Working';
  tags?: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  icon: string; // Font Awesome class
  blurb: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string; // use 'Present' for current role
  current?: boolean;
  summary: string;
  highlights: string[];
  tech: string[];
}

// Edit dates / bullets here — the timeline renders from this array, newest first.
export const experiences: Experience[] = [
  {
    role: 'MS Engineer (L2) — Automation & AI',
    company: 'NTT Data',
    location: 'Jakarta, Indonesia',
    start: 'Aug 2026',
    end: 'Present',
    current: true,
    summary:
      'Managed Services (MS) Division: build automation and AI use cases for internal operations and NTT Data clients.',
    highlights: [
      'Design and ship automation + AI use cases for MS internal operations (ticket triage, automation and report dashboard).',
      'Deliver AI solutions for clients: GenAI chatbots, RAG over enterprise docs, and document-intelligence pipelines.',
      'Build and maintain API deployments on cloud / Kubernetes and Azure environments, incl. monitoring and handover docs.',
      'Prototype LLM agents and evals, then harden the winners into supportable managed services.',
    ],
    tech: ['Python', 'LangChain', 'RAG', 'Azure OpenAI', 'FastAPI', 'Docker', 'Kubernetes', 'Power Automate'],
  },
  {
    role: 'Artificial Intelligence Engineer',
    company: 'Telkom Indonesia',
    location: 'Jakarta, Indonesia',
    start: 'Feb 2023',
    end: 'Jul 2026',
    summary:
      'Built custom AI capabilities for internal use cases across GenAI, vision, and ML.',
    highlights: [
      'Built GenAI chatbots, computer-vision apps, and ML models for internal users.',
      'Researched and applied RAG / Advanced RAG, agentic chatbots, MCP, and GenAI OCR.',
      'Deployed and maintained open-source LLM/LMM services and AI APIs on Kubernetes and Azure.',
    ],
    tech: ['PyTorch', 'vLLM', 'LangGraph', 'FastAPI', 'Azure', 'Kubernetes'],
  },
  {
    role: 'Junior Analyst Data Scientist',
    company: 'Bank Indonesia',
    location: 'Jakarta, Indonesia',
    start: 'Feb 2019',
    end: 'Feb 2023',
    summary: 'End-to-end policy analytics across monetary, macroprudential, payment-system, and market domains.',
    highlights: [
      'Shipped ML/data-science use cases for macro, monetary, macroprudential, and payment-system policy.',
      'Managed multi-stakeholder deadlines across departments and divisions.',
      'Built and maintained statistics and data infrastructure (incl. Hadoop / PySpark pipelines).',
    ],
    tech: ['scikit-learn', 'PySpark', 'Hadoop', 'SQL', 'pandas'],
  },
  {
    role: 'Artificial Intelligence Researcher',
    company: 'Smart City & Innovation Center, ITB',
    location: 'Bandung, Indonesia',
    start: 'Dec 2018',
    end: 'Feb 2019',
    summary: 'Applied NLP research for Bandung city services.',
    highlights: [
      'Built social-media sentiment analysis for the city of Bandung.',
      'Researched Bahasa Indonesia intent-prediction and speech-to-text models for customer service.',
    ],
    tech: ['Python', 'NLP', 'Speech-to-Text'],
  },
  {
    role: 'Data Scientist',
    company: 'Codigo',
    location: 'Jakarta, Indonesia',
    start: 'Jun 2018',
    end: 'Oct 2018',
    summary: 'Bahasa Indonesia NLP for the Aksara.AI platform.',
    highlights: [
      'Built Bahasa Indonesia NLP models for Aksara.AI.',
      'Built a hoax classifier with LSTM deep learning.',
      'Researched NLU for chatbots.',
    ],
    tech: ['TensorFlow', 'LSTM', 'FastText', 'NLU'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-automation',
    label: 'Automation & Applied AI',
    icon: 'fas fa-robot',
    blurb: 'Applied AI in production: automating ops work and shipping AI use cases.',
    skills: [
      { name: 'GenAI chatbots & agents', level: 'Core' },
      { name: 'RAG / Advanced RAG', level: 'Core' },
      { name: 'LLM evals & prompt design', level: 'Core' },
      { name: 'triage and automation development', level: 'Core' },
      { name: 'Document intelligence / OCR', level: 'Proficient' },
    ],
  },
  {
    id: 'ml-dl',
    label: 'ML / Deep Learning / NLP',
    icon: 'fas fa-brain',
    blurb: 'Modeling background behind the automation.',
    skills: [
      { name: 'Python (pandas, NumPy, scikit-learn)', level: 'Core' },
      { name: 'NLP/NLU Implementation', level: 'Core' },
      { name: 'PyTorch / TensorFlow', level: 'Proficient' },
      { name: 'Transformers / LSTM', level: 'Proficient' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform & Delivery',
    icon: 'fas fa-cloud',
    blurb: 'How it runs reliably for internal teams and clients.',
    skills: [
      { name: 'FastAPI service APIs', level: 'Core' },
      { name: 'SQL / MongoDB', level: 'Core' },
      { name: 'Docker / Kubernetes', level: 'Core' },
      { name: 'Azure (AI Services, OpenAI, ML)', level: 'Proficient' },
      { name: 'CI/CD, Git, monitoring', level: 'Working' },
    ],
  },
  {
    id: 'stack',
    label: 'Day-to-day stack',
    icon: 'fas fa-layer-group',
    blurb: 'Frameworks currently in use.',
    skills: [
      { name: 'LangChain / LangGraph', level: 'Core' },
      { name: 'Local and Cloud LLM Framework', level: 'Proficient' },
      { name: 'Streamlit / Gradio / Chainlit', level: 'Proficient' },
      { name: 'PySpark / Hadoop', level: 'Working' },
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

// Edit here — add your repos/demos. Renders into #portfolio section.
export const projects: Project[] = [
  {
    title: 'Enterprise RAG Chatbot',
    description: 'GenAI chatbot over enterprise docs with Advanced RAG, evals, and FastAPI + Kubernetes deployment.',
    tech: ['LangChain', 'Azure OpenAI', 'FastAPI', 'Kubernetes'],
    link: 'https://github.com/thejabbar',
  },
  {
    title: 'Document Intelligence Pipeline',
    description: 'OCR + LLM extraction pipeline turning PDFs into structured data with human-in-the-loop review.',
    tech: ['Python', 'GenAI OCR', 'Streamlit', 'Docker'],
    link: 'https://github.com/thejabbar',
  },
  {
    title: 'Ticket Triage Automation',
    description: 'Automation for MS operations: ticket classification, routing, and reporting dashboards.',
    tech: ['Power Automate', 'Python', 'SQL'],
    link: 'https://github.com/thejabbar',
  },
];

export const profile = {
  name: 'Muhammad Abdul Jabbar',
  title: 'Enterprise AI & Machine Learning Professional',
  tagline: 'Enterprise AI and machine learning across banking, telecom, and managed services — from ML models to production GenAI and automation.',
  location: 'Jakarta, Indonesia',
  phone: '+6282119101825',
  email: 'abdul.jabbar.3794@gmail.com',
  linkedin: 'https://www.linkedin.com/in/muhammad-abdul-jabbar-47324360/',
  github: 'https://github.com/thejabbar',
};
