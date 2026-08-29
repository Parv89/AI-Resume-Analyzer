import React from 'react';
import { KeyRound, Check, Plus, AlertCircle } from 'lucide-react';

export default function KeywordAnalysisCard({ keywords = { strong: [], recommended: [] } }) {
  const strongKeywords = keywords?.strong || [];
  const recommendedKeywords = keywords?.recommended || [];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-soft mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
          <KeyRound className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            ATS Keyword Optimization
          </h3>
          <p className="text-xs text-slate-400">
            Recruiter search query terms detected vs recommended additions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Keywords */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Strong Keywords Present ({strongKeywords.length})
            </h4>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
              ATS Match
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {strongKeywords.length > 0 ? (
              strongKeywords.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
                >
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>{item.keyword || item}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No primary keywords indexed.</span>
            )}
          </div>
        </div>

        {/* Recommended Keywords */}
        <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Recommended Keywords ({recommendedKeywords.length})
            </h4>
            <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-semibold">
              High Impact
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {recommendedKeywords.length > 0 ? (
              recommendedKeywords.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-indigo-800 border border-indigo-200/80 shadow-2xs"
                  title={item.impact || 'Recommended for ATS scoring'}
                >
                  <Plus className="w-3 h-3 text-indigo-500" />
                  <span>{item.keyword || item}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No keyword gaps detected.</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-800 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <span className="font-semibold">ATS Best Practice:</span> Integrate recommended keywords naturally in your work experience bullet points and project descriptions. Never use hidden white text or artificial keyword stuffing.
        </p>
      </div>
    </div>
  );
}
