export const profile = {
  name: 'Hema Madhuri Janapamula',
  title: 'Senior React / Frontend Developer',
  tagline: 'Building fast, scalable enterprise interfaces that turn complex workflows into intuitive experiences.',
  email: 'hemamadhurijanapamula@gmail.com',
  phone: '+91 9848475546',
  github: 'https://github.com/hemamadhuri98',
  linkedin: 'https://www.linkedin.com/in/hema-madhuri-janapamula-26134b167',
  resume: '/resume.pdf',
};

export const stats = [
  ['6+', 'Years in frontend development'],
  ['14', 'Legacy apps modernized'],
  ['React 18', 'Enterprise UI stack'],
  ['2', 'Domain environments: automotive + aerospace'],
];

export const skills = [
  'React.js', 'React 18', 'TypeScript', 'JavaScript ES6+', 'Redux Toolkit', 'RTK Query',
  'Material UI', 'Tailwind CSS', 'REST APIs', 'Axios', 'Jest', 'Enzyme', 'Git', 'Bitbucket',
  'Jira', 'Jenkins', 'Webpack', 'Babel', 'Leaflet', 'Highcharts', 'Figma', 'Tableau'
];

export const experience = [
  {
    period: 'Oct 2023 — Present',
    company: 'Tata Consultancy Services',
    role: 'Systems Engineer',
    projects: [
      {
        name: 'DTFS — Volumetric Incentive Program',
        period: 'Aug 2025 — Present',
        bullets: [
          'Re-engineered legacy incentive workflow screens into a modern React 18 enterprise interface.',
          'Implemented Redux-driven state management, memoization and reusable hooks for complex workflows.',
          'Built frontend role-based behaviour for actions, controls and workflow transitions.',
          'Delivered French localization across milestones M3–M7.'
        ]
      },
      {
        name: 'DTNA — IBM Portlet to FOSS Migration',
        period: 'Jan 2025 — Aug 2025',
        bullets: [
          'Modernized 14 legacy IBM Portal MVC/Portlet applications into lightweight React 18 web apps.',
          'Migrated legacy JavaScript/jQuery frontends while improving maintainability and scalability.',
          'Partnered with business teams to translate workflows into functional requirements and user flows.',
          'Coordinated delivery using JIRA and acted as a bridge between stakeholders and development teams.'
        ]
      },
      {
        name: 'Tapestry Solutions',
        period: 'Oct 2023 — Dec 2024',
        bullets: [
          'Built a standalone React application with Leaflet for IoT device tracking and floorplan mapping.',
          'Implemented interactive latitude/longitude mapping, device configuration and real-time status reporting.',
          'Delivered CRUD workflows, triggers, alerts and notifications across related modules.',
          'Used Redux to manage complex application state.'
        ]
      }
    ]
  },
  {
    period: 'Jul 2019 — Oct 2022',
    company: 'Capgemini Private Ltd',
    role: 'Associate Consultant',
    projects: [
      {
        name: 'IDEA by Capgemini',
        period: 'Dec 2020 — Oct 2022',
        bullets: [
          'Built reusable enterprise UI modules, dynamic forms, validation and RBAC with React, Redux and Material UI.',
          'Created Highcharts dashboards and wrote Jest/Enzyme unit tests.',
          'Investigated production defects and improved frontend quality.'
        ]
      },
      {
        name: 'KIS — Knowledge Insights and Services',
        period: 'Apr 2020 — Nov 2020',
        bullets: [
          'Worked with NLTK tokenization and stemming for text processing workflows.',
          'Used BoW and TF-IDF vectorization to transform natural language into feature vectors.',
          'Worked with Elasticsearch for incoming data transformation, document tagging and relevance scoring using Python.'
        ]
      }
    ]
  }
]

export const projectHighlights = [
  {
    title: 'Volumetric Incentive Program',
    description: 'Modern React 18 enterprise workflow UI for a legacy incentive platform, with Redux, role-aware workflows and French localization.',
    tags: ['React 18', 'Redux', 'Enterprise UI', 'Localization'],
    company: 'TCS · DTFS'
  },
  {
    title: 'IBM Portlet → FOSS Migration',
    description: 'Modernization of 14 legacy portal applications from MVC/Portlet and jQuery patterns into maintainable React 18 experiences.',
    tags: ['React 18', 'Migration', 'JIRA', 'Modernization'],
    company: 'TCS · DTNA'
  },
  {
    title: 'IoT Floorplan & Device Tracking',
    description: 'Interactive Leaflet-based map experience for RFID/IoT readers, floorplans, device configuration, CRUD workflows and real-time status.',
    tags: ['React', 'Leaflet', 'Redux', 'IoT'],
    company: 'Tapestry Solutions'
  },
  {
    title: 'Enterprise Dashboards & Dynamic Forms',
    description: 'Reusable React/Redux/MUI components, dynamic forms, RBAC, validation and Highcharts dashboards for enterprise workflows.',
    tags: ['React', 'MUI', 'Highcharts', 'Jest'],
    company: 'Capgemini · IDEA'
  }
];

export const certifications = [
  'Udacity Full Stack Web Development Nanodegree',
  'Microsoft Certified: Azure Data Fundamentals',
  'Data Visualization with Tableau',
  'Python for Data Science & AI',
  'Text Retrieval & Search Engines',
  'Gremlin & Neo4J',
  'Sectorthon 2020 — Diamond Star & Certificate of Recognition'
];

export const assistantKnowledge = [
  { keywords: ['react', 'frontend', 'skills'], answer: 'Hema is a React / Frontend Developer focused on React 18, TypeScript, JavaScript, Redux Toolkit, Material UI, REST APIs, testing and scalable enterprise UI.' },
  { keywords: ['experience', 'years'], answer: 'Hema has 5+ years stated on the current resume, with experience across TCS, Tapestry Solutions (a Boeing company) and Capgemini. Her work spans automotive and aerospace environments.' },
  { keywords: ['tcs', 'current', 'job'], answer: 'Hema currently works at Tata Consultancy Services as a Systems Engineer. Her current DTFS work modernizes legacy incentive workflow screens into React 18, with Redux, performance optimization, role-based UI and French localization.' },
  { keywords: ['migration', 'ibm', 'portlet', 'foss'], answer: 'At TCS, Hema worked on DTNA IBM Portlet to FOSS migration, modernizing 14 legacy IBM Portal MVC/Portlet applications and moving frontend experiences from JavaScript/jQuery to React 18.' },
  { keywords: ['leaflet', 'iot', 'map', 'boeing', 'tapestry'], answer: 'At Tapestry Solutions, Hema built an interactive Leaflet map module for IoT device tracking and floorplans, including device configuration, CRUD workflows, alerts, notifications and real-time status.' },
  { keywords: ['ai', 'python', 'search', 'nlp', 'elasticsearch'], answer: 'Earlier at Capgemini, Hema worked with NLTK, tokenization, stemming, BoW, TF-IDF and Elasticsearch for text retrieval, document tagging and relevance scoring.' },
  { keywords: ['resume', 'cv'], answer: 'You can open Hema’s current resume using the “Download Resume” button or the Resume link in this portfolio.' },
  { keywords: ['github', 'repo', 'repositories', 'code'], answer: 'The GitHub section is connected to Hema’s public GitHub profile and loads repositories dynamically at runtime, including stars, forks, languages, topics and update dates.' },
  { keywords: ['contact', 'email', 'linkedin', 'hire'], answer: 'You can contact Hema at hemamadhurijanapamula@gmail.com or connect through LinkedIn from the portfolio.' }
];
