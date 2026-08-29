import { supabase, isSupabaseConfigured } from '../services/supabaseService.js';

/**
 * Middleware to authenticate requests via Supabase JWT or Demo token
 */
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Default to demo user if unauthenticated or demo mode
      req.user = {
        id: 'demo-user-123',
        email: 'demo@resumeiq.ai',
        role: 'authenticated'
      };
      return next();
    }

    const token = authHeader.split(' ')[1];

    if (token === 'demo-token' || !isSupabaseConfigured) {
      req.user = {
        id: req.headers['x-user-id'] || 'demo-user-123',
        email: req.headers['x-user-email'] || 'demo@resumeiq.ai',
        role: 'authenticated'
      };
      return next();
    }

    // Verify token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session token. Please log in again.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('[Auth Middleware] Error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
}
