import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { matchJobDescription, getJobMatches } from '../controllers/jobMatchController.js';

const router = express.Router();

// Match resume against target Job Description
router.post('/match', requireAuth, matchJobDescription);

// Get list of previous job matches
router.get('/list', requireAuth, getJobMatches);

export default router;
