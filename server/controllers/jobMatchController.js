import { matchJobDescriptionWithAI } from '../services/aiService.js';
import { dbService } from '../services/supabaseService.js';

export async function matchJobDescription(req, res, next) {
  try {
    const { resumeId, resumeText, resumeName, jobTitle, jobDescription } = req.body;
    const userId = req.user?.id || 'demo-user-123';

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid job description with at least 20 characters.'
      });
    }

    let textToMatch = resumeText;

    // If resumeId provided without text, lookup from database
    if (!textToMatch && resumeId) {
      const existing = await dbService.getAnalysisById(resumeId, userId);
      if (existing) {
        textToMatch = existing.summary + ' ' + (existing.detected_skills || []).map(s => s.name).join(' ');
      }
    }

    if (!textToMatch) {
      textToMatch = 'Senior Developer skilled in React, TypeScript, Node.js, Express, PostgreSQL, Docker, AWS, Git, REST APIs, GraphQL, and Agile workflows.';
    }

    const matchResult = await matchJobDescriptionWithAI(textToMatch, jobTitle, jobDescription);

    const savedRecord = await dbService.saveJobMatch({
      userId,
      resumeId: resumeId || null,
      resumeName: resumeName || 'Active Resume',
      jobTitle: jobTitle || 'Target Position',
      jobDescription,
      matchResult
    });

    res.status(200).json({
      success: true,
      message: 'Job match calculated successfully.',
      data: savedRecord
    });
  } catch (error) {
    next(error);
  }
}

export async function getJobMatches(req, res, next) {
  try {
    const userId = req.user?.id || 'demo-user-123';
    const matches = await dbService.getJobMatches(userId);
    res.status(200).json({
      success: true,
      data: matches
    });
  } catch (error) {
    next(error);
  }
}
