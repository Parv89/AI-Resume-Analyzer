import axios from 'axios';
import { analyzeResumeTextHeuristically, computeTotalATSScore, calculateScoreLevel } from './scoringService.js';

/**
 * AI Analysis Service for ResumeIQ
 * Uses Gemini AI via REST API or OpenAI-compatible endpoint with intelligent fallback
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';

/**
 * Analyzes resume text using Gemini AI or heuristic fallback
 * @param {string} resumeText - Extracted text from PDF
 * @param {string} fileName - File name
 * @returns {Promise<object>}
 */
export async function analyzeResumeWithAI(resumeText, fileName = 'Resume.pdf') {
  if (!resumeText || resumeText.trim().length < 30) {
    throw new Error('Insufficient text content in resume for analysis.');
  }

  // If no API key configured, use deterministic heuristic engine
  if (!GEMINI_API_KEY) {
    console.log('[AI Service] GEMINI_API_KEY not found in environment. Using high-precision Heuristic Analysis Engine.');
    return analyzeResumeTextHeuristically(resumeText, fileName);
  }

  const prompt = `
You are an expert ATS (Applicant Tracking System) Scanner, Senior Technical Recruiter, and Career Strategist.
Analyze the following resume text with extreme precision and return ONLY a valid JSON object matching the specified structure.

SCORING CRITERIA (Total 100 points):
- Contact Information (10 pts): Email, phone, location, LinkedIn/GitHub/Portfolio
- Professional Summary (10 pts): Compelling headline, value proposition
- Skills (20 pts): Relevant modern technical stack and soft skills
- Experience (20 pts): Quantified impact, action verbs, scope
- Projects (15 pts): Depth, technologies used, demonstrated results
- Education (10 pts): Degree, field of study, relevance
- Keywords (10 pts): Industry keywords, skill density without keyword stuffing
- Formatting & ATS Compatibility (5 pts): Clean hierarchy, standard headers

RESUME TEXT:
"""
${resumeText.slice(0, 12000)}
"""

RESPONSE FORMAT:
You must respond with ONLY raw, valid JSON. Do not include markdown code block markers (\`\`\`json or \`\`\`), no introductory or trailing text.
Follow this exact JSON schema:
{
  "atsScore": <number 0-100>,
  "scoreLevel": "<'Poor' | 'Needs Improvement' | 'Average' | 'Good' | 'Excellent'>",
  "scoreDescription": "<short description of why this score was assigned>",
  "summary": "<2-3 sentence executive summary of candidate's profile and ATS readiness>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>", "<weakness 4>"],
  "detectedSkills": [
    { "name": "<skill>", "type": "<'technical' | 'soft'>", "category": "<e.g. Frontend, Backend, Cloud, Soft Skills>" }
  ],
  "missingSkills": [
    {
      "name": "<skill name>",
      "importance": "<'High' | 'Medium' | 'Low'>",
      "reason": "<why this skill is expected for candidate's seniority/domain>",
      "recommendation": "<actionable advice on how to integrate it>"
    }
  ],
  "keywords": {
    "strong": [
      { "keyword": "<keyword>", "status": "Present", "type": "<e.g. Technology, Methodology>" }
    ],
    "recommended": [
      { "keyword": "<keyword>", "status": "Missing", "type": "<e.g. Concept, Architecture>", "impact": "<impact on ATS visibility>" }
    ]
  },
  "recommendedRoles": [
    { "role": "<Job Title>", "match": <number 50-99>, "reason": "<short justification>" }
  ],
  "sectionScores": {
    "contact": <number 0-100>,
    "summary": <number 0-100>,
    "skills": <number 0-100>,
    "experience": <number 0-100>,
    "projects": <number 0-100>,
    "education": <number 0-100>,
    "keywords": <number 0-100>,
    "formatting": <number 0-100>
  },
  "formattingIssues": ["<issue 1 or 'No major issues detected'>"],
  "suggestions": ["<actionable suggestion 1>", "<actionable suggestion 2>", "<actionable suggestion 3>", "<actionable suggestion 4>"]
}
`;

  try {
    const aiResponse = await callGeminiAPI(prompt);
    const parsedData = parseAndValidateAIResponse(aiResponse, resumeText, fileName);
    return parsedData;
  } catch (error) {
    console.warn('[AI Service] Gemini API call failed or timed out. Falling back to heuristic analyzer:', error.message);
    return analyzeResumeTextHeuristically(resumeText, fileName);
  }
}

/**
 * Compares resume text with a target job description
 * @param {string} resumeText 
 * @param {string} jobTitle 
 * @param {string} jobDescription 
 * @returns {Promise<object>}
 */
export async function matchJobDescriptionWithAI(resumeText, jobTitle, jobDescription) {
  if (!jobDescription || jobDescription.trim().length < 20) {
    throw new Error('Job description is too short to analyze.');
  }

  if (!GEMINI_API_KEY) {
    console.log('[AI Service] GEMINI_API_KEY not found. Using heuristic job matcher.');
    return matchJobDescriptionHeuristically(resumeText, jobTitle, jobDescription);
  }

  const prompt = `
You are an expert Hiring Manager and ATS Match Engine.
Compare the Candidate Resume against the Target Job Description and calculate a comprehensive compatibility score.

TARGET JOB TITLE: ${jobTitle || 'Unspecified Role'}
TARGET JOB DESCRIPTION:
"""
${jobDescription.slice(0, 8000)}
"""

CANDIDATE RESUME:
"""
${(resumeText || '').slice(0, 10000)}
"""

Evaluate:
- Required Skills vs Candidate Skills
- Experience Level and Scope Match
- Missing Critical Tools / Qualifications
- Key ATS Keywords Found vs Missing
- Actionable Tailoring Recommendations

RESPONSE FORMAT:
Return ONLY valid JSON (no markdown wrappers):
{
  "matchScore": <number 0-100>,
  "matchLevel": "<'Excellent' | 'Good' | 'Moderate' | 'Low'>",
  "summary": "<2-sentence summary of fit>",
  "matchedSkills": ["<skill 1>", "<skill 2>", "<skill 3>"],
  "missingSkills": [
    { "name": "<skill>", "importance": "<'Critical' | 'Preferred'>", "advice": "<how to demonstrate this or bridge gap>" }
  ],
  "matchingKeywords": ["<keyword 1>", "<keyword 2>"],
  "missingKeywords": ["<keyword 1>", "<keyword 2>"],
  "recommendations": [
    "<specific bullet point rewrite suggestion or keyword recommendation>",
    "<actionable change for target job>"
  ],
  "breakdown": {
    "skillsMatch": <number 0-100>,
    "experienceMatch": <number 0-100>,
    "keywordMatch": <number 0-100>,
    "educationMatch": <number 0-100>
  }
}
`;

  try {
    const aiResponse = await callGeminiAPI(prompt);
    const cleaned = cleanJSONString(aiResponse);
    const parsed = JSON.parse(cleaned);

    // Normalize matchScore
    const score = Number(parsed.matchScore) || 70;
    parsed.matchScore = Math.min(100, Math.max(0, Math.round(score)));
    if (!parsed.matchLevel) {
      parsed.matchLevel = parsed.matchScore >= 85 ? 'Excellent' : parsed.matchScore >= 70 ? 'Good' : parsed.matchScore >= 50 ? 'Moderate' : 'Low';
    }
    return parsed;
  } catch (error) {
    console.warn('[AI Service] Job match API failed. Falling back to heuristic match:', error.message);
    return matchJobDescriptionHeuristically(resumeText, jobTitle, jobDescription);
  }
}

/**
 * Low-level caller for Google Gemini API
 */
async function callGeminiAPI(promptText) {
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await axios.post(
        url,
        {
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 25000
        }
      );

      const candidate = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidate) {
        return candidate;
      }
    } catch (err) {
      lastError = err;
      // Continue to next model if available
    }
  }

  throw lastError || new Error('Failed to obtain response from Gemini models');
}

/**
 * Cleans markdown formatting, quotes, or trailing artifacts from AI JSON text
 */
function cleanJSONString(str) {
  if (!str) return '{}';
  return str
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();
}

/**
 * Validates and normalizes AI analysis response
 */
function parseAndValidateAIResponse(rawJson, resumeText, fileName) {
  const cleaned = cleanJSONString(rawJson);
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error('[AI Service] JSON Parse error:', e.message);
    return analyzeResumeTextHeuristically(resumeText, fileName);
  }

  // Ensure sectionScores exist and calculate deterministic ATS total
  const sectionScores = parsed.sectionScores || {};
  const contact = Number(sectionScores.contact) || 80;
  const summary = Number(sectionScores.summary) || 75;
  const skills = Number(sectionScores.skills) || 80;
  const experience = Number(sectionScores.experience) || 75;
  const projects = Number(sectionScores.projects) || 75;
  const education = Number(sectionScores.education) || 85;
  const keywords = Number(sectionScores.keywords) || 75;
  const formatting = Number(sectionScores.formatting) || 85;

  const sanitizedSectionScores = { contact, summary, skills, experience, projects, education, keywords, formatting };
  const totalScore = computeTotalATSScore(sanitizedSectionScores);
  const scoreMeta = calculateScoreLevel(totalScore);

  return {
    atsScore: parsed.atsScore && !isNaN(parsed.atsScore) ? Math.round(Number(parsed.atsScore)) : totalScore,
    scoreLevel: parsed.scoreLevel || scoreMeta.level,
    scoreDescription: parsed.scoreDescription || scoreMeta.description,
    summary: parsed.summary || 'Professional resume parsed and indexed for ATS compatibility.',
    strengths: Array.isArray(parsed.strengths) && parsed.strengths.length > 0 ? parsed.strengths : ['Solid foundational layout and technical scope'],
    weaknesses: Array.isArray(parsed.weaknesses) && parsed.weaknesses.length > 0 ? parsed.weaknesses : ['Consider adding more quantified impact metrics'],
    detectedSkills: Array.isArray(parsed.detectedSkills) ? parsed.detectedSkills : [],
    missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
    keywords: parsed.keywords || { strong: [], recommended: [] },
    recommendedRoles: Array.isArray(parsed.recommendedRoles) ? parsed.recommendedRoles : [],
    sectionScores: sanitizedSectionScores,
    formattingIssues: Array.isArray(parsed.formattingIssues) ? parsed.formattingIssues : ['Formatting is generally clean.'],
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : ['Tailor keywords to match specific job applications.']
  };
}

/**
 * Heuristic job description matcher when offline or without API key
 */
export function matchJobDescriptionHeuristically(resumeText = '', jobTitle = '', jobDescription = '') {
  const resumeLower = (resumeText || '').toLowerCase();
  const jdLower = (jobDescription || '').toLowerCase();

  const skillKeywords = [
    'react', 'node', 'node.js', 'javascript', 'typescript', 'python', 'java', 'c++', 'go', 'rust',
    'sql', 'postgres', 'postgresql', 'mongodb', 'redis', 'graphql', 'rest', 'api', 'docker',
    'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'git', 'github', 'tailwind', 'html', 'css',
    'redux', 'next.js', 'agile', 'scrum', 'testing', 'jest', 'cypress', 'microservices', 'linux'
  ];

  const jdSkills = skillKeywords.filter(k => jdLower.includes(k));
  const matched = [];
  const missing = [];

  jdSkills.forEach(k => {
    if (resumeLower.includes(k)) {
      matched.push(k.toUpperCase());
    } else {
      missing.push({
        name: k.toUpperCase(),
        importance: 'Critical',
        advice: `Target job description emphasizes ${k.toUpperCase()}. Add relevant project experience or coursework.`
      });
    }
  });

  const matchRatio = jdSkills.length > 0 ? matched.length / jdSkills.length : 0.75;
  const matchScore = Math.min(98, Math.max(35, Math.round(matchRatio * 90 + 10)));
  
  let matchLevel = 'Moderate';
  if (matchScore >= 85) matchLevel = 'Excellent';
  else if (matchScore >= 70) matchLevel = 'Good';
  else if (matchScore < 50) matchLevel = 'Low';

  const matchingKeywords = matched.slice(0, 6);
  const missingKeywords = missing.map(m => m.name).slice(0, 5);

  const recommendations = [
    `Incorporate the missing keywords: ${missingKeywords.slice(0, 3).join(', ')} in your project bullet points.`,
    `Align your resume title or summary directly with "${jobTitle || 'Target Position'}".`,
    `Highlight specific achievements that solve challenges described in the job posting.`
  ];

  return {
    matchScore,
    matchLevel,
    summary: `Resume has a ${matchLevel.toLowerCase()} match (${matchScore}%) with the ${jobTitle || 'target'} role. Found ${matched.length} overlapping technical requirements and ${missing.length} keyword gaps.`,
    matchedSkills: matched,
    missingSkills: missing,
    matchingKeywords,
    missingKeywords,
    recommendations,
    breakdown: {
      skillsMatch: Math.min(100, Math.round(matchRatio * 100)),
      experienceMatch: Math.min(95, Math.max(60, matchScore + 5)),
      keywordMatch: Math.min(100, Math.max(40, matchScore - 4)),
      educationMatch: 90
    }
  };
}
