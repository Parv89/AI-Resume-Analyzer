import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getAnalysesHistory, deleteAnalysis } from '../controllers/historyController.js';

const router = express.Router();

// Retrieve all user analyses
router.get('/', requireAuth, getAnalysesHistory);

// Delete an analysis by ID
router.delete('/:id', requireAuth, deleteAnalysis);

export default router;
