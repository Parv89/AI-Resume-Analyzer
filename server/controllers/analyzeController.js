import { extractTextFromPDF } from '../services/pdfService.js';
import { analyzeResumeWithAI } from '../services/aiService.js';
import { dbService } from '../services/supabaseService.js';

export async function uploadAndAnalyzeResume(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded. Please select a valid PDF file.'
      });
    }

    const fileName = req.file.originalname;
    const fileSize = req.file.size;
    const userId = req.user?.id || 'demo-user-123';

    // Step 1: Extract Text
    const { text, pageCount } = await extractTextFromPDF(req.file.buffer);

    // Step 2: Run AI Analysis
    const analysis = await analyzeResumeWithAI(text, fileName);

    // Step 3: Persist in DB
    const resumeRecord = await dbService.saveResume({
      userId,
      fileName,
      fileUrl: '',
      extractedText: text,
      fileSize,
      pageCount
    });

    const analysisRecord = await dbService.saveAnalysis({
      userId,
      resumeId: resumeRecord.id,
      fileName,
      analysis
    });

    res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully.',
      data: {
        resumeId: resumeRecord.id,
        analysisId: analysisRecord.id,
        fileName,
        extractedText: text,
        analysis: analysisRecord
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function analyzeTextDirectly(req, res, next) {
  try {
    const { text, fileName = 'Pasted_Resume_Text.pdf' } = req.body;
    const userId = req.user?.id || 'demo-user-123';

    if (!text || text.trim().length < 30) {
      return res.status(400).json({
        success: false,
        message: 'Text must be at least 30 characters long.'
      });
    }

    const analysis = await analyzeResumeWithAI(text, fileName);

    const resumeRecord = await dbService.saveResume({
      userId,
      fileName,
      fileUrl: '',
      extractedText: text,
      fileSize: Buffer.byteLength(text, 'utf8'),
      pageCount: 1
    });

    const analysisRecord = await dbService.saveAnalysis({
      userId,
      resumeId: resumeRecord.id,
      fileName,
      analysis
    });

    res.status(200).json({
      success: true,
      data: {
        resumeId: resumeRecord.id,
        analysisId: analysisRecord.id,
        fileName,
        analysis: analysisRecord
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getAnalysisById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'demo-user-123';

    const analysis = await dbService.getAnalysisById(id, userId);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis record not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
}
