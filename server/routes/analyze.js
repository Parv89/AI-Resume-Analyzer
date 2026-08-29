import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { uploadAndAnalyzeResume, analyzeTextDirectly, getAnalysisById } from '../controllers/analyzeController.js';

const router = express.Router();

// Upload and analyze PDF resume
router.post('/upload', requireAuth, upload.single('resume'), uploadAndAnalyzeResume);

// Directly analyze pasted resume text
router.post('/text', requireAuth, analyzeTextDirectly);

// Retrieve single analysis by ID
router.get('/:id', requireAuth, getAnalysisById);

export default router;
