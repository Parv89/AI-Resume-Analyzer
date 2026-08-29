import fs from 'fs';
import path from 'path';
import { extractTextFromPDF } from './services/pdfService.js';
import { analyzeResumeWithAI, matchJobDescriptionWithAI } from './services/aiService.js';
import { computeTotalATSScore, calculateScoreLevel } from './services/scoringService.js';

async function runTests() {
  console.log('--- STARTING RESUMEIQ BACKEND & AI ENGINE TESTS ---');

  // Test 1: Scoring Algorithm
  console.log('\n[Test 1] Testing 100-Point ATS Scoring Engine:');
  const sampleSectionScores = {
    contact: 95,
    summary: 85,
    skills: 90,
    experience: 80,
    projects: 85,
    education: 90,
    keywords: 85,
    formatting: 90
  };
  const totalScore = computeTotalATSScore(sampleSectionScores);
  const scoreLevel = calculateScoreLevel(totalScore);
  console.log(`Computed ATS Total: ${totalScore}/100 | Level: ${scoreLevel.level}`);
  if (totalScore < 80 || totalScore > 90) throw new Error('Scoring engine math mismatch');
  console.log('✓ Scoring Engine: PASS');

  // Test 2: AI / Heuristic Resume Analyzer
  console.log('\n[Test 2] Testing Resume Text Analysis Engine:');
  const sampleResumeText = `
    Alex Chen
    Email: alex.chen@example.com | Phone: (555) 123-4567 | Location: San Francisco, CA
    LinkedIn: linkedin.com/in/alexchen-dev | GitHub: github.com/alexchen
    
    PROFESSIONAL SUMMARY
    Senior Full Stack Engineer with 6+ years of experience designing and scaling web applications using React, TypeScript, Node.js, and PostgreSQL. Proven ability to optimize web performance, leading architecture redesigns that reduced API latency by 40% for 150k DAU.
    
    TECHNICAL SKILLS
    Languages & Frameworks: JavaScript, TypeScript, React, Next.js, Node.js, Express, Python, SQL, Tailwind CSS
    Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, Lambda, EC2), Git, GraphQL, REST APIs
    Methodologies: Agile, Scrum, CI/CD, Microservices, Test-Driven Development
    
    WORK EXPERIENCE
    Senior Software Engineer | TechNova Solutions | 2022 - Present
    - Architected and implemented real-time analytics dashboard in React & TypeScript, boosting user engagement by 35%.
    - Designed scalable RESTful microservices in Node.js & PostgreSQL, handling 2.5M daily requests with 99.9% uptime.
    - Mentored 4 junior engineers in modern state management and code review practices.
    
    Full Stack Developer | CloudScale Inc | 2019 - 2022
    - Developed customer-facing SaaS portal with React and Express, reducing page load times by 45%.
    - Integrated Stripe payments and automated invoice generation for over 10,000 monthly transactions.
    
    PROJECTS
    AI Task Orchestrator | React, Node.js, OpenAI API, PostgreSQL | github.com/alexchen/ai-tasks
    - Built intelligent workflow automation tool used by 1,200 active beta developers.
    
    EDUCATION
    B.S. in Computer Science | University of California, Berkeley | 2019
  `;

  const analysisResult = await analyzeResumeWithAI(sampleResumeText, 'Alex_Chen_Resume.pdf');
  console.log(`Analysis Result ATS Score: ${analysisResult.atsScore}/100`);
  console.log(`Detected Skills Count: ${analysisResult.detectedSkills.length}`);
  console.log(`Strengths: ${analysisResult.strengths.length}`);
  console.log(`Weaknesses: ${analysisResult.weaknesses.length}`);
  console.log(`Missing Skills: ${analysisResult.missingSkills.map(s => s.name).join(', ')}`);
  console.log(`Recommended Roles: ${analysisResult.recommendedRoles.map(r => r.role + ' (' + r.match + '%)').join(', ')}`);

  if (!analysisResult.atsScore || analysisResult.detectedSkills.length === 0) {
    throw new Error('Analysis result incomplete');
  }
  console.log('✓ Resume Analysis Engine: PASS');

  // Test 3: Job Description Matcher
  console.log('\n[Test 3] Testing Job Description Match Engine:');
  const sampleJD = `
    Senior Full Stack Engineer
    Requirements:
    - 5+ years building full stack web applications with React, TypeScript, and Node.js
    - Experience with PostgreSQL and Docker containerization
    - Cloud experience with AWS (Lambda, ECS)
    - Strong communication and mentoring skills
    - Experience with Kubernetes and Kafka is a plus
  `;

  const matchResult = await matchJobDescriptionWithAI(sampleResumeText, 'Senior Full Stack Engineer', sampleJD);
  console.log(`Job Match Score: ${matchResult.matchScore}% | Level: ${matchResult.matchLevel}`);
  console.log(`Matched Skills: ${matchResult.matchedSkills.join(', ')}`);
  console.log(`Missing Skills: ${matchResult.missingSkills.map(s => typeof s === 'object' ? s.name : s).join(', ')}`);
  console.log(`Recommendations: ${matchResult.recommendations.length}`);

  if (!matchResult.matchScore) throw new Error('Job match calculation failed');
  console.log('✓ Job Description Matcher: PASS');

  console.log('\n========================================');
  console.log('ALL BACKEND ENGINE TESTS PASSED SUCCESSFULLY! 🚀');
  console.log('========================================');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
