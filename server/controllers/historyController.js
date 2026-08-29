import { dbService } from '../services/supabaseService.js';

export async function getAnalysesHistory(req, res, next) {
  try {
    const userId = req.user?.id || 'demo-user-123';
    const analyses = await dbService.getAnalyses(userId);
    res.status(200).json({
      success: true,
      data: analyses
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAnalysis(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'demo-user-123';

    await dbService.deleteAnalysis(id, userId);

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
}
