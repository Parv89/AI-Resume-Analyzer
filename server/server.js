import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { isSupabaseConfigured } from './services/supabaseService.js';
import analyzeRoutes from './routes/analyze.js';
import jobMatchRoutes from './routes/jobMatch.js';
import historyRoutes from './routes/history.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(cors({
  origin: true, // Allow frontend during development & production
  credentials: true
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Request logging in development
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check and System Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ResumeIQ Backend API',
    timestamp: new Date().toISOString(),
    aiEngine: Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY) ? 'Gemini AI Active' : 'Heuristic Engine Active',
    supabaseConnected: isSupabaseConfigured
  });
});

// Mount Routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/job-match', jobMatchRoutes);
app.use('/api/history', historyRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 ResumeIQ API Server running on port ${PORT}`);
  console.log(`🤖 AI Engine: ${Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY) ? 'Gemini AI' : 'Heuristic Engine'}`);
  console.log(`🗄️  Supabase: ${isSupabaseConfigured ? 'Configured' : 'Local / Demo Fallback Mode'}`);
  console.log(`=============================================`);
});

export default app;
