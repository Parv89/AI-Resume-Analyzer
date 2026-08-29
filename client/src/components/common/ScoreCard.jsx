import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, ChevronRight } from 'lucide-react';

export default function ScoreCard({ title, score = 0, maxScore = 100, problems = [], suggestions = [], icon: Icon }) {
  const normalized = Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));

  const getStatus = (val) => {
    if (val >= 85) return { label: 'Strong', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', bar: 'bg-emerald-500' };
    if (val >= 70) return { label: 'Good', color: 'text-blue-700 bg-blue-50 border-blue-200', bar: 'bg-blue-500' };
    if (val >= 50) return { label: 'Average', color: 'text-amber-700 bg-amber-50 border-amber-200', bar: 'bg-amber-500' };
    return { label: 'Needs Work', color: 'text-rose-700 bg-rose-50 border-rose-200', bar: 'bg-rose-500' };
  };

  const status = getStatus(normalized);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h4 className="font-semibold text-slate-800 text-base">{title}</h4>
              <p className="text-xs text-slate-400">Section Performance</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Score Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-slate-500">Score</span>
            <span className="text-slate-900 font-bold">{score} / {maxScore}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${status.bar}`}
              style={{ width: `${normalized}%` }}
            />
          </div>
        </div>

        {/* Problems or Findings */}
        {problems.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Issues Identified
            </h5>
            <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
              {problems.map((prob, idx) => (
                <li key={idx} className="leading-relaxed">{prob}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
              Actionable Fix
            </h5>
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
              {Array.isArray(suggestions) ? suggestions[0] : suggestions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
