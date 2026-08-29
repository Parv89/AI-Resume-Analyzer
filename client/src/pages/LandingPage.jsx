import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Target,
  FileCheck,
  Briefcase,
  Zap,
  TrendingUp,
  ChevronDown,
  Layers,
  Award,
  Users,
  Clock
} from 'lucide-react';
import CircularScore from '../components/common/CircularScore';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How does ResumeIQ calculate the ATS score?',
      a: 'Our transparent 100-point scoring algorithm evaluates your resume across 8 core dimensions: Contact Information (10 pts), Professional Summary (10 pts), Skills (20 pts), Work Experience (20 pts), Projects (15 pts), Education (10 pts), Keyword Density (10 pts), and Formatting & ATS compliance (5 pts).'
    },
    {
      q: 'What file formats are supported?',
      a: 'ResumeIQ accepts standard PDF files up to 10MB in size. We extract raw text, verify single-column ATS layouts, and ensure no unparseable tables or graphical elements disrupt recruiter parsing.'
    },
    {
      q: 'How does the Job Description Matcher work?',
      a: 'You simply paste the target job title and job description. ResumeIQ cross-compares required technical competencies, soft skills, seniority requirements, and keyword frequencies against your resume to generate a personalized match percentage and tailored optimization tips.'
    },
    {
      q: 'Is my resume data safe and private?',
      a: 'Yes, absolutely. We enforce strict PostgreSQL Row-Level Security (RLS). Your uploaded resumes and analysis history are encrypted and accessible strictly by your authenticated account.'
    },
    {
      q: 'Can I export a PDF report of my ATS analysis?',
      a: 'Yes! Every analysis comes with a complete downloadable PDF report summarizing your ATS score, section audits, missing skills, and tailored suggestions that you can print or save.'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-slate-50 to-[#f8fafc]">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Know your resume. Beat the ATS. Land your next opportunity.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              AI-Powered <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
                Resume Analysis & ATS Scanner
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Analyze your resume, discover missing skills, improve your ATS score, and match your profile with real job descriptions before you apply.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/upload"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Analyze My Resume</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-200 shadow-sm transition-all"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                100-Point ATS Algorithm
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Job Description Matcher
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No Keyword Stuffing
              </span>
            </div>
          </div>

          {/* Hero Visual Preview Card */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Score Widget */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <CircularScore score={84} size={160} strokeWidth={14} />
                  <span className="text-xs text-slate-500 mt-2 font-medium">Verified ATS Score</span>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                      ✓ Top 15% Candidate
                    </span>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                      8 Section Audits
                    </span>
                  </div>
                </div>

                {/* Breakdown Summary */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Live AI Scan Result
                    </span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      ATS Ready
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">
                      Alex Chen — Senior Full Stack Engineer.pdf
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Solid technical coverage detected across React, TypeScript, and AWS. Identified 2 high-impact missing skills (Kubernetes, CI/CD) for Senior band postings.
                    </p>
                  </div>

                  {/* Detected Skills Preview */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                      Detected Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS Cloud'].map((s) => (
                        <span key={s} className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Preview */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>ATS Recommendation:</strong> Add quantified numbers to your 2022 backend role to increase score to 92/100.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          STATISTICS SECTION
          ========================================= */}
      <section className="py-12 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">85,000+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Resumes Analyzed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">94.8%</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">ATS Pass Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">3.2x</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">More Interview Callbacks</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-violet-400">&lt; 5s</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Instant AI Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FEATURES SECTION
          ========================================= */}
      <section id="features" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Enterprise ATS Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 mb-4">
              Everything You Need to Beat Automated Recruiters
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              ResumeIQ scans your document through the exact heuristics and vector models used by Workday, Greenhouse, Taleo, and Lever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                100-Point Transparent ATS Score
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear breakdown across Contact Info, Summary, Skills, Experience, Projects, Education, Keywords, and Layout compliance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Job Description Matcher
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Paste any target job description to get a real-time match percentage, keyword gaps, and line-by-line tailoring guidance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/20 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Missing Skills Detection
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Detects omitted industry frameworks, tools, and soft skills with importance tiers (Critical, High, Preferred) and integration advice.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 mb-5">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Section-by-Section Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Inspects all 8 resume sections independently to highlight vague bullet points, weak action verbs, and missing metrics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Recommended Job Roles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                AI analyzes your technical scope to recommend target positions and salary-tier role titles matching your true experience.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Exportable PDF Reports
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Download a clean, printable executive summary report of your ATS scores, audit findings, and checklist for future revisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          HOW IT WORKS SECTION
          ========================================= */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 mb-4">
              How ResumeIQ Transforms Your Job Search
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Get recruiter-ready in under 60 seconds with our automated scanning pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-5 border border-indigo-100">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Resume PDF</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Drag and drop your PDF resume. Our parser instantly extracts text and validates document structure.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-5 border border-indigo-100">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Audit & ATS Scoring</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our model identifies technical and soft skills, flags missing keywords, and assigns a transparent 0–100 score.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-extrabold text-lg flex items-center justify-center mx-auto mb-5 border border-indigo-100">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Match & Optimize</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Compare your resume with real job descriptions, apply tailored improvements, and download your verified report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ATS SCORING BREAKDOWN TABLE
          ========================================= */}
      <section id="scoring" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Scoring Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 mb-4">
              100-Point Category Breakdown
            </h2>
            <p className="text-slate-600 text-sm">
              We never use vague black-box scores. Here is exactly how your resume is graded.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Contact Information</h4>
                  <p className="text-xs text-slate-400">Email, phone, location, LinkedIn/GitHub</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  10 Points
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Professional Summary</h4>
                  <p className="text-xs text-slate-400">Target title, value proposition, career focus</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  10 Points
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Skills & Categorization</h4>
                  <p className="text-xs text-slate-400">Modern technical stack + soft competencies</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  20 Points
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Work Experience & Impact</h4>
                  <p className="text-xs text-slate-400">Quantified metrics, action verbs, scope</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  20 Points
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Projects & Repositories</h4>
                  <p className="text-xs text-slate-400">Tech stack used, complexity, live links</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  15 Points
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Education & Credentials</h4>
                  <p className="text-xs text-slate-400">Degrees, accredited institutions, dates</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  10 Points
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Keywords & Density</h4>
                  <p className="text-xs text-slate-400">Industry terminology & search volume</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  10 Points
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">ATS Formatting Compliance</h4>
                  <p className="text-xs text-slate-400">Clean single-column parsing standard</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  5 Points
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FAQ SECTION
          ========================================= */}
      <section id="faq" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know about ResumeIQ and ATS optimization.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? 'transform rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CTA BANNER
          ========================================= */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Ready to Land 3x More Interviews?
          </h2>
          <p className="text-indigo-200 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Upload your resume now and get your instant 100-point ATS report in less than 10 seconds.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-base shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>Scan My Resume Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
