export const SAMPLE_ANALYSES = [
  {
    id: 'analysis-sample-1',
    user_id: 'demo-user-123',
    file_name: 'Alex_Chen_Senior_FullStack_Resume.pdf',
    ats_score: 84,
    score_level: 'Good',
    score_description: 'Strong candidate profile with high ATS compatibility and comprehensive tech stack.',
    summary: 'Senior Full Stack Engineer with 6+ years building scalable distributed web applications with React, Node.js, TypeScript, and AWS cloud infrastructure. Led architecture revamps delivering 40% latency reduction.',
    strengths: [
      'Comprehensive modern technical stack coverage (React, TypeScript, Node.js, Docker, PostgreSQL)',
      'Clear, quantified metrics in recent engineering accomplishments (e.g. 40% latency drop, 150k DAU scaled)',
      'High keyword density for cloud architecture and microservices',
      'Clean single-column ATS layout with verified contact links'
    ],
    weaknesses: [
      'Professional summary could highlight technical leadership and mentorship experience more forcefully',
      'Missing Kubernetes and Infrastructure as Code (Terraform) mentions',
      'Early junior roles lack quantified outcome metrics'
    ],
    detected_skills: [
      { name: 'React', type: 'technical', category: 'Frontend' },
      { name: 'TypeScript', type: 'technical', category: 'Language' },
      { name: 'Node.js', type: 'technical', category: 'Backend' },
      { name: 'PostgreSQL', type: 'technical', category: 'Database' },
      { name: 'Docker', type: 'technical', category: 'DevOps' },
      { name: 'AWS Cloud', type: 'technical', category: 'Cloud' },
      { name: 'GraphQL', type: 'technical', category: 'API' },
      { name: 'Tailwind CSS', type: 'technical', category: 'Frontend' },
      { name: 'Redux Toolkit', type: 'technical', category: 'Frontend' },
      { name: 'REST APIs', type: 'technical', category: 'Backend' },
      { name: 'Problem Solving', type: 'soft', category: 'Core' },
      { name: 'Cross-Functional Collaboration', type: 'soft', category: 'Core' },
      { name: 'Agile / Scrum', type: 'soft', category: 'Methodology' }
    ],
    missing_skills: [
      {
        name: 'Kubernetes',
        importance: 'High',
        reason: 'Frequently required alongside Docker for Senior Full Stack and DevOps-oriented positions.',
        recommendation: 'Highlight experience with container orchestration, pod management, or Helm charts.'
      },
      {
        name: 'CI/CD Pipelines (GitHub Actions)',
        importance: 'Medium',
        reason: 'Demonstrates modern automated testing and zero-downtime deployment capabilities.',
        recommendation: 'Specify automated deployment workflows configured in your recent project bullet points.'
      },
      {
        name: 'System Design & Architecture',
        importance: 'Medium',
        reason: 'Key evaluation area for Senior/Staff title banding.',
        recommendation: 'Include architectural design diagrams, caching strategies (Redis), or message queues (Kafka).'
      }
    ],
    keywords: {
      strong: [
        { keyword: 'Microservices', status: 'Present', type: 'Architecture' },
        { keyword: 'REST API', status: 'Present', type: 'Architecture' },
        { keyword: 'React.js', status: 'Present', type: 'Frontend' },
        { keyword: 'PostgreSQL', status: 'Present', type: 'Database' },
        { keyword: 'AWS Lambda / S3', status: 'Present', type: 'Cloud' }
      ],
      recommended: [
        { keyword: 'Event-Driven Architecture', status: 'Missing', type: 'Architecture', impact: 'Boosts visibility for high-scale backend roles' },
        { keyword: 'Redis In-Memory Caching', status: 'Missing', type: 'Database', impact: 'Standard ATS search query for performance-focused engineers' },
        { keyword: 'End-to-End Testing (Playwright / Cypress)', status: 'Missing', type: 'Quality', impact: 'Demonstrates robust QA standards' }
      ]
    },
    recommended_roles: [
      { role: 'Senior Full Stack Engineer', match: 94, reason: 'Exceptional overlap across both React UI engineering and Node/Postgres backend services.' },
      { role: 'Lead Frontend Developer', match: 91, reason: 'Deep component architecture, TypeScript proficiency, and UI performance mastery.' },
      { role: 'Cloud Software Engineer', match: 86, reason: 'Solid AWS and Docker containerization foundation.' },
      { role: 'Backend API Architect', match: 82, reason: 'Good database design and REST/GraphQL interface modeling.' }
    ],
    section_scores: {
      contact: 95,
      summary: 82,
      skills: 90,
      experience: 85,
      projects: 80,
      education: 90,
      keywords: 85,
      formatting: 92
    },
    formatting_issues: [
      'Document structure is clean and easily parsed by ATS bots.',
      'Headers use standard conventions (Experience, Education, Skills).'
    ],
    suggestions: [
      'Add numbers to earlier career achievements (e.g. "reduced build times by 30%").',
      'Incorporate Redis and Kubernetes keywords to open up Staff-level openings.',
      'Link directly to live demos or GitHub repositories for showcased personal projects.'
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 'analysis-sample-2',
    user_id: 'demo-user-123',
    file_name: 'Sarah_Miller_Frontend_Engineer.pdf',
    ats_score: 72,
    score_level: 'Average',
    score_description: 'Solid UI foundations but needs quantified metrics and broader cloud/testing keywords.',
    summary: 'Frontend Engineer with 3 years specializing in React, Next.js, and CSS design systems. Good visual portfolio.',
    strengths: [
      'Strong React and responsive UI design capabilities',
      'Clear portfolio link with live production web applications',
      'Consistent clean typography'
    ],
    weaknesses: [
      'Lacks numerical impact metrics in project descriptions',
      'Missing unit testing (Jest/RTL) and CI/CD tools',
      'No dedicated section for cloud hosting or backend API integration'
    ],
    detected_skills: [
      { name: 'React', type: 'technical', category: 'Frontend' },
      { name: 'JavaScript (ES6+)', type: 'technical', category: 'Language' },
      { name: 'HTML5 / CSS3', type: 'technical', category: 'Frontend' },
      { name: 'Tailwind CSS', type: 'technical', category: 'Frontend' },
      { name: 'Git', type: 'technical', category: 'Tools' },
      { name: 'UI/UX Design', type: 'soft', category: 'Design' },
      { name: 'Teamwork', type: 'soft', category: 'Core' }
    ],
    missing_skills: [
      {
        name: 'TypeScript',
        importance: 'High',
        reason: 'Standard expectation in 85%+ of modern React job postings.',
        recommendation: 'Refactor portfolio projects to TypeScript and list it prominently.'
      },
      {
        name: 'Jest / React Testing Library',
        importance: 'High',
        reason: 'Automated test suite creation is critical for mid-level frontend roles.',
        recommendation: 'Add bullet points demonstrating test coverage implementation.'
      }
    ],
    keywords: {
      strong: [
        { keyword: 'React.js', status: 'Present', type: 'Frontend' },
        { keyword: 'Responsive Web Design', status: 'Present', type: 'Design' }
      ],
      recommended: [
        { keyword: 'TypeScript', status: 'Missing', type: 'Language', impact: 'Top filter keyword for modern tech companies' },
        { keyword: 'State Management (Redux/Zustand)', status: 'Missing', type: 'Architecture', impact: 'Expected for complex web apps' }
      ]
    },
    recommended_roles: [
      { role: 'Frontend React Developer', match: 86, reason: 'Strong match for UI component design and React lifecycle.' },
      { role: 'UI Engineer / Web Developer', match: 84, reason: 'Solid HTML/CSS and styling library knowledge.' }
    ],
    section_scores: {
      contact: 90,
      summary: 70,
      skills: 75,
      experience: 68,
      projects: 78,
      education: 85,
      keywords: 65,
      formatting: 85
    },
    formatting_issues: ['Consider expanding bullet points to 2-3 lines with explicit business outcomes.'],
    suggestions: [
      'Add TypeScript to your core stack.',
      'Quantify your accomplishments (e.g. improved lighthouse performance score from 65 to 98).'
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];

export const SAMPLE_JOB_MATCH = {
  id: 'sample-job-match-1',
  job_title: 'Senior Full Stack React / Node Developer',
  job_description: 'We are seeking a Senior Full Stack Engineer to lead development of our real-time SaaS platform. Requirements: 5+ years with React, TypeScript, Node.js, PostgreSQL, Docker, AWS, GraphQL, and automated testing (Jest). Experience with microservices and high-throughput systems is a big plus.',
  match_score: 87,
  match_level: 'Excellent',
  summary: 'Your resume is an exceptional match (87%) for this Senior Full Stack role. You meet core requirements in React, Node.js, TypeScript, PostgreSQL, and AWS.',
  matched_skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'REST API'],
  missing_skills: [
    { name: 'Jest / Automated Testing', importance: 'Critical', advice: 'Add unit and integration testing experience with Jest/Supertest.' },
    { name: 'High-Throughput Systems', importance: 'Preferred', advice: 'Highlight any concurrency, caching, or message queue experience.' }
  ],
  matching_keywords: ['Microservices', 'PostgreSQL', 'Docker', 'GraphQL', 'AWS Cloud', 'TypeScript'],
  missing_keywords: ['Jest', 'Unit Testing', 'CI/CD Pipelines'],
  recommendations: [
    'Add "Jest" and "Automated Testing" directly to your technical skills section.',
    'Mention latency or concurrency numbers in your most recent backend project.',
    'Tailor your resume summary to directly mirror the title "Senior Full Stack Engineer".'
  ],
  breakdown: {
    skillsMatch: 92,
    experienceMatch: 88,
    keywordMatch: 84,
    educationMatch: 95
  },
  created_at: new Date().toISOString()
};
