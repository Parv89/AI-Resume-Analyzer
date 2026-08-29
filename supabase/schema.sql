-- ResumeIQ Database Schema (Supabase / PostgreSQL)
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. PROFILES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id OR auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id OR auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id OR auth.uid() = user_id);

CREATE POLICY "Users can delete own profile" 
  ON public.profiles FOR DELETE 
  USING (auth.uid() = id OR auth.uid() = user_id);

-- ==========================================
-- 2. RESUMES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT,
  extracted_text TEXT NOT NULL,
  file_size INT,
  page_count INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resumes" 
  ON public.resumes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" 
  ON public.resumes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" 
  ON public.resumes FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" 
  ON public.resumes FOR DELETE 
  USING (auth.uid() = user_id);

-- ==========================================
-- 3. RESUME ANALYSES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.resume_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  file_name TEXT,
  ats_score NUMERIC NOT NULL DEFAULT 0,
  score_level TEXT DEFAULT 'Average',
  summary TEXT,
  strengths JSONB DEFAULT '[]'::jsonb,
  weaknesses JSONB DEFAULT '[]'::jsonb,
  missing_skills JSONB DEFAULT '[]'::jsonb,
  detected_skills JSONB DEFAULT '[]'::jsonb,
  keywords JSONB DEFAULT '[]'::jsonb,
  recommended_roles JSONB DEFAULT '[]'::jsonb,
  section_scores JSONB DEFAULT '{}'::jsonb,
  formatting_issues JSONB DEFAULT '[]'::jsonb,
  suggestions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses" 
  ON public.resume_analyses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" 
  ON public.resume_analyses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" 
  ON public.resume_analyses FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" 
  ON public.resume_analyses FOR DELETE 
  USING (auth.uid() = user_id);

-- ==========================================
-- 4. JOB MATCHES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.job_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  resume_name TEXT,
  job_title TEXT NOT NULL,
  job_description TEXT NOT NULL,
  match_score NUMERIC NOT NULL DEFAULT 0,
  match_level TEXT DEFAULT 'Moderate',
  matched_skills JSONB DEFAULT '[]'::jsonb,
  missing_skills JSONB DEFAULT '[]'::jsonb,
  matching_keywords JSONB DEFAULT '[]'::jsonb,
  recommendations JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own job matches" 
  ON public.job_matches FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job matches" 
  ON public.job_matches FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job matches" 
  ON public.job_matches FOR UPDATE 
  USING (auth.uid() = user_id);

-- Trigger for auto profile creation on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, full_name, email, avatar_url)
  VALUES (
    new.id,
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_analyses_user_id ON public.resume_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_analyses_created_at ON public.resume_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_matches_user_id ON public.job_matches(user_id);
