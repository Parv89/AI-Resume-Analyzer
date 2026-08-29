/**
 * ATS Scoring Service
 * Implements transparent 100-point scoring algorithm across 8 core categories:
 * - Contact Information: 10 points
 * - Professional Summary: 10 points
 * - Skills: 20 points
 * - Experience: 20 points
 * - Projects: 15 points
 * - Education: 10 points
 * - Keywords: 10 points
 * - Formatting / ATS Compatibility: 5 points
 * Total: 100 points
 */

export function calculateScoreLevel(score) {
  if (score >= 90) {
    return {
      level: 'Excellent',
      badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Your resume is highly optimized for ATS systems and executive recruiters.'
    };
  }
  if (score >= 75) {
    return {
      level: 'Good',
      badgeClass: 'text-blue-700 bg-blue-50 border-blue-200',
      description: 'Strong candidate profile with high ATS compatibility. Minor polish recommended.'
    };
  }
  if (score >= 60) {
    return {
      level: 'Average',
      badgeClass: 'text-amber-700 bg-amber-50 border-amber-200',
      description: 'Decent structure, but missing important keywords or quantified accomplishments.'
    };
  }
  if (score >= 40) {
    return {
      level: 'Needs Improvement',
      badgeClass: 'text-orange-700 bg-orange-50 border-orange-200',
      description: 'Critical sections or industry keywords are missing. High risk of ATS rejection.'
    };
  }
  return {
    level: 'Poor',
    badgeClass: 'text-red-700 bg-red-50 border-red-200',
    description: 'Severely lacking essential ATS formatting, sections, or keyword depth.'
  };
}

/**
 * Calculates weighted ATS total score from section breakdown
 * @param {object} sectionScores - { contact, summary, skills, experience, projects, education, keywords, formatting }
 * @returns {number} 0-100 rounded integer
 */
export function computeTotalATSScore(sectionScores) {
  const weights = {
    contact: 0.10,    // 10 pts max
    summary: 0.10,    // 10 pts max
    skills: 0.20,     // 20 pts max
    experience: 0.20, // 20 pts max
    projects: 0.15,   // 15 pts max
    education: 0.10,  // 10 pts max
    keywords: 0.10,   // 10 pts max
    formatting: 0.05  // 5 pts max
  };

  let total = 0;
  for (const [key, weight] of Object.entries(weights)) {
    const rawVal = sectionScores[key] !== undefined ? Number(sectionScores[key]) : 70;
    const clamped = Math.max(0, Math.min(100, isNaN(rawVal) ? 70 : rawVal));
    total += clamped * weight;
  }

  return Math.round(total);
}

/**
 * Heuristic fallback text analysis engine in case LLM is offline or no API key is set
 * Ensures full resilience and accurate insights derived directly from resume text
 */
export function analyzeResumeTextHeuristically(text, fileName = 'Resume.pdf') {
  const lower = text.toLowerCase();
  
  // 1. Contact Information Detection
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i.test(text) || lower.includes('linkedin');
  const hasGitHub = /github\.com\/[a-zA-Z0-9_-]+/i.test(text) || lower.includes('github');
  const hasLocation = /([A-Z][a-zA-Z]+,\s*[A-Z]{2})|remote|india|usa|united states|california|new york|bangalore|london|singapore/i.test(text);

  let contactScore = 40;
  if (hasEmail) contactScore += 20;
  if (hasPhone) contactScore += 15;
  if (hasLinkedIn || hasGitHub) contactScore += 15;
  if (hasLocation) contactScore += 10;
  contactScore = Math.min(100, contactScore);

  // 2. Professional Summary Detection
  const hasSummaryHeader = /(summary|profile|about me|objective|professional overview)/i.test(text);
  let summaryScore = 50;
  if (hasSummaryHeader) summaryScore += 30;
  if (text.length > 500) summaryScore += 20;
  summaryScore = Math.min(100, summaryScore);

  // 3. Technical & Soft Skills Detection
  const commonTechSkills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'Python', 'Django', 'FastAPI',
    'Java', 'Spring Boot', 'C++', 'C#', '.NET', 'Go', 'Rust', 'PHP', 'Laravel', 'SQL', 'PostgreSQL',
    'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'REST API', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'CI/CD', 'Git', 'GitHub', 'Linux', 'Tailwind CSS', 'HTML5', 'CSS3', 'Redux', 'Vue.js', 'Angular',
    'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Structures', 'Algorithms', 'Microservices', 'Jest'
  ];

  const commonSoftSkills = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Agile Methodology',
    'Critical Thinking', 'Time Management', 'Collaboration', 'Adaptability', 'Mentorship'
  ];

  const detectedTech = commonTechSkills.filter(skill => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(text);
  });

  const detectedSoft = commonSoftSkills.filter(skill => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(text);
  });

  const allDetected = [
    ...detectedTech.map(s => ({ name: s, type: 'technical', category: 'Engineering' })),
    ...detectedSoft.map(s => ({ name: s, type: 'soft', category: 'Interpersonal' }))
  ];

  let skillsScore = Math.min(100, Math.max(40, (detectedTech.length * 8) + (detectedSoft.length * 5)));

  // Missing Skills Recommendations
  const missingSkillsPool = [
    { name: 'TypeScript', importance: 'High', reason: 'Industry standard for modern type-safe frontend and full-stack development.', recommendation: 'Add TypeScript experience and migration projects to your skills section.' },
    { name: 'Docker', importance: 'High', reason: 'Essential containerization technology requested across 70%+ of software roles.', recommendation: 'Mention Docker containerized workflows or development environments.' },
    { name: 'CI/CD Pipelines', importance: 'Medium', reason: 'Demonstrates automated testing and deployment maturity.', recommendation: 'Highlight experience with GitHub Actions, GitLab CI, or Jenkins.' },
    { name: 'AWS Cloud Services', importance: 'High', reason: 'Cloud proficiency (S3, Lambda, EC2) significantly boosts recruiter visibility.', recommendation: 'Include specific cloud infrastructure components utilized in past projects.' },
    { name: 'Automated Testing (Jest/Cypress)', importance: 'Medium', reason: 'Quality assurance and unit testing are prioritized by senior engineering leads.', recommendation: 'Reference test coverage or unit/integration testing methodologies.' }
  ];

  const missingSkills = missingSkillsPool.filter(ms => 
    !detectedTech.some(dt => dt.toLowerCase() === ms.name.toLowerCase())
  ).slice(0, 4);

  // 4. Experience Section Detection
  const hasExpHeader = /(experience|work history|employment|career history)/i.test(text);
  const actionVerbs = ['developed', 'implemented', 'engineered', 'architected', 'led', 'managed', 'optimized', 'reduced', 'increased', 'scaled', 'built', 'created', 'designed'];
  const foundVerbs = actionVerbs.filter(v => lower.includes(v));
  const metricsCount = (text.match(/\d+%/g) || []).length + (text.match(/\$\d+/g) || []).length + (text.match(/\b\d+\s*(users|clients|ms|seconds|x)\b/gi) || []).length;

  let experienceScore = 50;
  if (hasExpHeader) experienceScore += 20;
  if (foundVerbs.length >= 4) experienceScore += 15;
  if (metricsCount >= 2) experienceScore += 15;
  experienceScore = Math.min(100, experienceScore);

  // 5. Projects Section Detection
  const hasProjectsHeader = /(projects|personal projects|key projects|academic projects)/i.test(text);
  let projectsScore = 50;
  if (hasProjectsHeader) projectsScore += 30;
  if (lower.includes('github.com') || lower.includes('demo') || lower.includes('live:')) projectsScore += 20;
  projectsScore = Math.min(100, projectsScore);

  // 6. Education Section Detection
  const hasEducation = /(education|university|college|bachelor|master|b\.s\.|b\.tech|degree|diploma)/i.test(text);
  let educationScore = hasEducation ? 90 : 40;

  // 7. Keywords Analysis
  const strongKeywords = detectedTech.slice(0, 8).map(k => ({ keyword: k, status: 'Present', type: 'Technology' }));
  const recommendedKeywords = ['Cloud Architecture', 'System Design', 'Performance Optimization', 'Agile / Scrum', 'RESTful Services', 'Microservices', 'Unit Testing']
    .filter(k => !lower.includes(k.toLowerCase()))
    .slice(0, 5)
    .map(k => ({ keyword: k, status: 'Missing', type: 'Concept', impact: 'Boosts ATS match for Senior/Mid roles' }));

  let keywordsScore = Math.min(100, Math.max(45, (strongKeywords.length * 10) + 20));

  // 8. Formatting & ATS Section
  let formattingScore = 85;
  const formattingIssues = [];
  if (text.length > 5000) {
    formattingIssues.push('Resume length may exceed ideal 1-2 page standard for your experience level.');
    formattingScore -= 10;
  }
  if (!hasEmail || !hasPhone) {
    formattingIssues.push('Header contact details are incomplete or unparsed.');
    formattingScore -= 15;
  }
  if (metricsCount === 0) {
    formattingIssues.push('Lack of quantified numerical outcomes (% growth, latency reduction, user count).');
  }

  const sectionScores = {
    contact: contactScore,
    summary: summaryScore,
    skills: skillsScore,
    experience: experienceScore,
    projects: projectsScore,
    education: educationScore,
    keywords: keywordsScore,
    formatting: formattingScore
  };

  const totalAtsScore = computeTotalATSScore(sectionScores);
  const scoreMeta = calculateScoreLevel(totalAtsScore);

  // Strengths & Weaknesses
  const strengths = [];
  if (detectedTech.length >= 5) strengths.push(`Strong technology stack coverage (${detectedTech.slice(0, 4).join(', ')})`);
  if (hasEducation) strengths.push('Clear academic credentials and verified educational foundation');
  if (foundVerbs.length >= 3) strengths.push('Effective use of action verbs in work descriptions');
  if (hasProjectsHeader) strengths.push('Dedicated projects section showcasing hands-on implementation ability');
  if (strengths.length === 0) strengths.push('Clean layout structure with readable text sections');

  const weaknesses = [];
  if (metricsCount < 2) weaknesses.push('Missing measurable achievements (e.g. "improved speed by 35%", "scaled to 50k users")');
  if (!hasLinkedIn) weaknesses.push('LinkedIn profile URL or public portfolio link is missing');
  if (missingSkills.length > 0) weaknesses.push(`Missing high-demand modern skills like ${missingSkills.map(s => s.name).slice(0, 2).join(' and ')}`);
  if (!hasSummaryHeader) weaknesses.push('No dedicated Professional Summary to frame career narrative for recruiters');

  // Recommended Job Roles
  const recommendedRoles = [
    { role: 'Full Stack Engineer', match: Math.min(96, totalAtsScore + 4), reason: 'Well-rounded combination of frontend frameworks and backend technologies.' },
    { role: 'Frontend React Developer', match: Math.min(94, totalAtsScore + 2), reason: 'Solid foundation in component architecture, JavaScript, and modern UI practices.' },
    { role: 'Software Engineer', match: Math.min(92, totalAtsScore), reason: 'Demonstrated core development capabilities and project execution.' },
    { role: 'Backend API Developer', match: Math.max(65, totalAtsScore - 5), reason: 'Good database and server-side conceptual understanding.' }
  ];

  const suggestions = [
    'Quantify your bullet points with concrete metrics (e.g., increased performance by 25%, reduced server costs by $1,200/mo).',
    'Ensure your professional summary includes target job title and 2-3 core strengths.',
    'Add links to live applications, GitHub repositories, or your LinkedIn profile.',
    'Tailor keywords directly to match each target job description before applying.'
  ];

  return {
    atsScore: totalAtsScore,
    scoreLevel: scoreMeta.level,
    scoreDescription: scoreMeta.description,
    summary: `Resume shows a ${scoreMeta.level.toLowerCase()} foundation with ${detectedTech.length} detected technical competencies. Optimizing quantified bullet points and adding key modern frameworks will significantly improve recruiter callback rates.`,
    strengths,
    weaknesses,
    detectedSkills: allDetected,
    missingSkills,
    keywords: {
      strong: strongKeywords,
      recommended: recommendedKeywords
    },
    recommendedRoles,
    sectionScores,
    formattingIssues: formattingIssues.length > 0 ? formattingIssues : ['No critical formatting blockers detected. Document structure is ATS-friendly.'],
    suggestions
  };
}
