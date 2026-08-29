import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Resume<span className="text-indigo-400">IQ</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Know your resume. Beat the ATS. Land your next opportunity with AI-powered resume scoring, missing skill detection, and job description matching.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>100% Secure & Confidential</span>
            </div>
          </div>

          {/* Col 2: Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/upload" className="hover:text-indigo-400 transition-colors">
                  ATS Resume Scanner
                </Link>
              </li>
              <li>
                <Link to="/job-matcher" className="hover:text-indigo-400 transition-colors">
                  Job Description Matcher
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-indigo-400 transition-colors">
                  Missing Skills Detection
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-indigo-400 transition-colors">
                  Keyword Optimization
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-indigo-400 transition-colors">
                  Downloadable ATS Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: ATS Scoring */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              100-Pt Scoring Engine
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Contact Information (10 pts)</li>
              <li>• Professional Summary (10 pts)</li>
              <li>• Skills & Categorization (20 pts)</li>
              <li>• Experience & Impact (20 pts)</li>
              <li>• Technical Projects (15 pts)</li>
              <li>• Education & Degrees (10 pts)</li>
              <li>• Keywords & Density (10 pts)</li>
              <li>• ATS Layout & Formatting (5 pts)</li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Account & Access
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-indigo-400 transition-colors">
                  Analysis History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ResumeIQ SaaS Platform. Built for modern professionals.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with precision for job seekers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
