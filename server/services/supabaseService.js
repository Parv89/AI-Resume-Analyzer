import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY && SUPABASE_URL.startsWith('http'));

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

/**
 * In-memory fallback database for local/demo mode
 */
const mockDb = {
  resumes: [],
  analyses: [],
  jobMatches: []
};

// Seed with default initial data for instant demo exploration
mockDb.analyses.push({
  id: 'demo-analysis-1',
  user_id: 'demo-user-123',
  file_name: 'Senior_FullStack_Resume.pdf',
  ats_score: 84,
  score_level: 'Good',
  score_description: 'Strong candidate profile with high ATS compatibility and comprehensive tech stack.',
  summary: 'Senior Full Stack Engineer with 5+ years building scalable React, Node.js, and cloud systems. Proven track record in API design and microservices.',
  strengths: [
    'Comprehensive technical skill coverage (React, Node.js, TypeScript, Docker, PostgreSQL)',
    'Quantified career accomplishments with clear business impact',
    'Dedicated open source projects with GitHub repositories',
    'Standard ATS-friendly layout with readable typography'
  ],
  weaknesses: [
    'Missing cloud certifications (AWS Solutions Architect / GCP Professional)',
    'Summary could highlight leadership & team mentoring experience more prominently',
    'Some bullet points in early positions lack metrics'
  ],
  detected_skills: [
    { name: 'React', type: 'technical', category: 'Frontend' },
    { name: 'TypeScript', type: 'technical', category: 'Language' },
    { name: 'Node.js', type: 'technical', category: 'Backend' },
    { name: 'PostgreSQL', type: 'technical', category: 'Database' },
    { name: 'Docker', type: 'technical', category: 'DevOps' },
    { name: 'AWS', type: 'technical', category: 'Cloud' },
    { name: 'GraphQL', type: 'technical', category: 'API' },
    { name: 'Tailwind CSS', type: 'technical', category: 'Frontend' },
    { name: 'Problem Solving', type: 'soft', category: 'Core' },
    { name: 'Communication', type: 'soft', category: 'Core' },
    { name: 'Agile / Scrum', type: 'soft', category: 'Methodology' }
  ],
  missing_skills: [
    { name: 'Kubernetes', importance: 'High', reason: 'Commonly paired with Docker in mid/senior container orchestration roles.', recommendation: 'Mention any k8s cluster deployment, helm charts, or mini-kube experimentation.' },
    { name: 'CI/CD Pipelines', importance: 'Medium', reason: 'Essential for production release engineering.', recommendation: 'Add GitHub Actions or GitLab CI configuration experience to your project bullet points.' }
  ],
  keywords: {
    strong: [
      { keyword: 'Microservices', status: 'Present', type: 'Architecture' },
      { keyword: 'REST API', status: 'Present', type: 'Architecture' },
      { keyword: 'React.js', status: 'Present', type: 'Frontend' },
      { keyword: 'Database Optimization', status: 'Present', type: 'Backend' }
    ],
    recommended: [
      { keyword: 'Event-Driven Architecture', status: 'Missing', type: 'Architecture', impact: 'Highly valued for senior backend roles' },
      { keyword: 'Kafka / RabbitMQ', status: 'Missing', type: 'Messaging', impact: 'Boosts visibility for high-throughput distributed systems' }
    ]
  },
  recommended_roles: [
    { role: 'Senior Full Stack Engineer', match: 94, reason: 'High density of frontend and backend technologies with modern stack.' },
    { role: 'Lead Frontend Developer', match: 91, reason: 'Extensive React and state management architectural depth.' },
    { role: 'Backend Software Engineer', match: 86, reason: 'Solid Node.js, SQL database, and API design expertise.' }
  ],
  section_scores: {
    contact: 95,
    summary: 85,
    skills: 90,
    experience: 85,
    projects: 80,
    education: 90,
    keywords: 85,
    formatting: 90
  },
  formatting_issues: ['Layout is clean, single-column, and easily parseable by modern ATS software.'],
  suggestions: [
    'Quantify outcomes in earlier experience entries (e.g., % time saved or latency reduction).',
    'Add an explicit certifications or cloud tools section to boost ATS keyword ranking.'
  ],
  created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
});

export const dbService = {
  async saveResume({ userId, fileName, fileUrl, extractedText, fileSize, pageCount }) {
    if (supabase) {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: userId,
          file_name: fileName,
          file_url: fileUrl,
          extracted_text: extractedText,
          file_size: fileSize,
          page_count: pageCount
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const record = {
      id: uuidv4(),
      user_id: userId,
      file_name: fileName,
      file_url: fileUrl,
      extracted_text: extractedText,
      file_size: fileSize,
      page_count: pageCount,
      created_at: new Date().toISOString()
    };
    mockDb.resumes.push(record);
    return record;
  },

  async saveAnalysis({ userId, resumeId, fileName, analysis }) {
    if (supabase) {
      const { data, error } = await supabase
        .from('resume_analyses')
        .insert({
          user_id: userId,
          resume_id: resumeId,
          file_name: fileName,
          ats_score: analysis.atsScore,
          score_level: analysis.scoreLevel,
          summary: analysis.summary,
          strengths: analysis.strengths,
          weaknesses: analysis.weaknesses,
          missing_skills: analysis.missingSkills,
          detected_skills: analysis.detectedSkills,
          keywords: analysis.keywords,
          recommended_roles: analysis.recommendedRoles,
          section_scores: analysis.sectionScores,
          formatting_issues: analysis.formattingIssues,
          suggestions: analysis.suggestions
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const record = {
      id: uuidv4(),
      user_id: userId,
      resume_id: resumeId,
      file_name: fileName,
      ats_score: analysis.atsScore,
      score_level: analysis.scoreLevel,
      summary: analysis.summary,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      missing_skills: analysis.missingSkills,
      detected_skills: analysis.detectedSkills,
      keywords: analysis.keywords,
      recommended_roles: analysis.recommendedRoles,
      section_scores: analysis.sectionScores,
      formatting_issues: analysis.formattingIssues,
      suggestions: analysis.suggestions,
      created_at: new Date().toISOString()
    };
    mockDb.analyses.unshift(record);
    return record;
  },

  async getAnalyses(userId) {
    if (supabase) {
      const { data, error } = await supabase
        .from('resume_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }

    return mockDb.analyses.filter(a => a.user_id === userId || a.user_id === 'demo-user-123');
  },

  async getAnalysisById(id, userId) {
    if (supabase) {
      const { data, error } = await supabase
        .from('resume_analyses')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }

    return mockDb.analyses.find(a => a.id === id);
  },

  async deleteAnalysis(id, userId) {
    if (supabase) {
      const { error } = await supabase
        .from('resume_analyses')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
      if (error) throw error;
      return true;
    }

    const index = mockDb.analyses.findIndex(a => a.id === id);
    if (index !== -1) {
      mockDb.analyses.splice(index, 1);
    }
    return true;
  },

  async saveJobMatch({ userId, resumeId, resumeName, jobTitle, jobDescription, matchResult }) {
    if (supabase) {
      const { data, error } = await supabase
        .from('job_matches')
        .insert({
          user_id: userId,
          resume_id: resumeId,
          resume_name: resumeName,
          job_title: jobTitle,
          job_description: jobDescription,
          match_score: matchResult.matchScore,
          match_level: matchResult.matchLevel,
          matched_skills: matchResult.matchedSkills,
          missing_skills: matchResult.missingSkills,
          matching_keywords: matchResult.matchingKeywords,
          recommendations: matchResult.recommendations
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const record = {
      id: uuidv4(),
      user_id: userId,
      resume_id: resumeId,
      resume_name: resumeName,
      job_title: jobTitle,
      job_description: jobDescription,
      match_score: matchResult.matchScore,
      match_level: matchResult.matchLevel,
      matched_skills: matchResult.matchedSkills,
      missing_skills: matchResult.missingSkills,
      matching_keywords: matchResult.matchingKeywords,
      recommendations: matchResult.recommendations,
      breakdown: matchResult.breakdown,
      created_at: new Date().toISOString()
    };
    mockDb.jobMatches.unshift(record);
    return record;
  },

  async getJobMatches(userId) {
    if (supabase) {
      const { data, error } = await supabase
        .from('job_matches')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }

    return mockDb.jobMatches.filter(m => m.user_id === userId || m.user_id === 'demo-user-123');
  }
};
