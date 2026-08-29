import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  id: 'demo-user-123',
  email: 'alex.chen@resumeiq.ai',
  user_metadata: {
    full_name: 'Alex Chen',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    // Check for existing Supabase or Demo session
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session: initialSession } } = await supabase.auth.getSession();
          if (initialSession) {
            setSession(initialSession);
            setUser(initialSession.user);
            setIsDemoMode(false);
            localStorage.setItem('resumeiq_token', initialSession.access_token);
            localStorage.setItem('resumeiq_user', JSON.stringify(initialSession.user));
          } else {
            // Check local demo persistence
            const savedUser = localStorage.getItem('resumeiq_user');
            if (savedUser) {
              const parsed = JSON.parse(savedUser);
              setUser(parsed);
              setIsDemoMode(true);
            }
          }

          // Listen for auth state changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user || null);
            if (newSession) {
              setIsDemoMode(false);
              localStorage.setItem('resumeiq_token', newSession.access_token);
              localStorage.setItem('resumeiq_user', JSON.stringify(newSession.user));
            } else {
              localStorage.removeItem('resumeiq_token');
              localStorage.removeItem('resumeiq_user');
            }
          });

          setLoading(false);
          return () => subscription?.unsubscribe();
        } else {
          // Supabase is not configured - check local demo storage or auto-init demo
          const savedUser = localStorage.getItem('resumeiq_user');
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch {
              setUser(DEFAULT_DEMO_USER);
            }
          } else {
            setUser(DEFAULT_DEMO_USER);
            localStorage.setItem('resumeiq_user', JSON.stringify(DEFAULT_DEMO_USER));
            localStorage.setItem('resumeiq_token', 'demo-token');
          }
          setIsDemoMode(true);
          setLoading(false);
        }
      } catch (err) {
        console.error('[AuthContext] Init error:', err);
        setUser(DEFAULT_DEMO_USER);
        setIsDemoMode(true);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Sign in with Email & Password
  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
      setUser(data.user);
      setIsDemoMode(false);
      localStorage.setItem('resumeiq_token', data.session.access_token);
      localStorage.setItem('resumeiq_user', JSON.stringify(data.user));
      return data.user;
    } else {
      // Demo mock login
      const mockUser = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          full_name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
          avatar_url: ''
        }
      };
      setUser(mockUser);
      setIsDemoMode(true);
      localStorage.setItem('resumeiq_token', 'demo-token');
      localStorage.setItem('resumeiq_user', JSON.stringify(mockUser));
      return mockUser;
    }
  };

  // Sign up with Email & Password
  const register = async (email, password, fullName) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: ''
          }
        }
      });
      if (error) throw error;
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        setIsDemoMode(false);
        localStorage.setItem('resumeiq_token', data.session.access_token);
        localStorage.setItem('resumeiq_user', JSON.stringify(data.user));
      }
      return data.user;
    } else {
      // Demo mock register
      const mockUser = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          full_name: fullName || email.split('@')[0],
          avatar_url: ''
        }
      };
      setUser(mockUser);
      setIsDemoMode(true);
      localStorage.setItem('resumeiq_token', 'demo-token');
      localStorage.setItem('resumeiq_user', JSON.stringify(mockUser));
      return mockUser;
    }
  };

  // Quick Demo Login
  const loginAsDemo = () => {
    setUser(DEFAULT_DEMO_USER);
    setIsDemoMode(true);
    localStorage.setItem('resumeiq_token', 'demo-token');
    localStorage.setItem('resumeiq_user', JSON.stringify(DEFAULT_DEMO_USER));
  };

  // Forgot / Reset Password
  const resetPassword = async (email) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login'
      });
      if (error) throw error;
    }
    return true;
  };

  // Update Profile Name & Avatar
  const updateProfile = async ({ fullName, avatarUrl }) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: avatarUrl
        }
      });
      if (error) throw error;
      setUser(data.user);
      localStorage.setItem('resumeiq_user', JSON.stringify(data.user));
      return data.user;
    } else {
      const updated = {
        ...user,
        user_metadata: {
          ...user?.user_metadata,
          full_name: fullName,
          avatar_url: avatarUrl
        }
      };
      setUser(updated);
      localStorage.setItem('resumeiq_user', JSON.stringify(updated));
      return updated;
    }
  };

  // Logout
  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem('resumeiq_token');
    localStorage.removeItem('resumeiq_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoMode,
        isSupabaseConfigured,
        login,
        register,
        loginAsDemo,
        resetPassword,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
