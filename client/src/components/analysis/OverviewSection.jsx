import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Briefcase, Sparkles, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import CircularScore from '../common/CircularScore';

export default function OverviewSection({ analysis, onDownloadPDF }) {
  if (!analysis) return null;

  const atsScore = Number(analysis.ats_score || analysis.atsScore) || 75;
  const fileName = analysis.file_name || 'Uploaded Resume';
  const summary = analysis.summary || 'Comprehensive AI analysis completed for ATS compatibility and recruiter screening standards.';
  const scoreLevel = analysis.score_level || analysis.scoreLevel || 'Good';
  const scoreDescription = analysis.score_description || analysis.scoreDescription || 'Strong candidate profile with high ATS compatibility.';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-premium mb-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Left: Animated Circular Score Gauge */}
        <div className="flex-shrink-0 bg-slate-50/80 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
          <CircularScore score={atsScore} size={170} strokeWidth={14} />
          <p className="text-xs text-slate-500 mt-2 font-medium">Overall ATS Score</p>
        </div>

        {/* Center: Executive Summary & Details */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
              <FileText className="w-3.5 h-3.5" />
              {fileName}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Analyzed {new Date(analysis.created_at || Date.now()).toLocaleDateString()}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            ATS Readiness: <span className="text-indigo-600">{scoreLevel}</span>
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {summary}
          </p>

          <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed mb-6">
            <span className="font-semibold text-slate-700">Recruiter Insight:</span> {scoreDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 no-print">
            {onDownloadPDF && (
              <button
                onClick={onDownloadPDF}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF Report</span>
              </button>
            )}

            <Link
              to={`/job-matcher?resumeId=${analysis.id || ''}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Match With Job Description</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
