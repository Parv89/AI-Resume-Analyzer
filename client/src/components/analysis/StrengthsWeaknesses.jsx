import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, AlertCircle } from 'lucide-react';

export default function StrengthsWeaknesses({ strengths = [], weaknesses = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Strengths Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-7 shadow-soft">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Key Strengths & Highlights
            </h3>
            <p className="text-xs text-slate-400">Positive findings in your resume</p>
          </div>
        </div>

        <ul className="space-y-3">
          {strengths.length > 0 ? (
            strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-xs text-slate-500 italic">No specific strengths recorded.</li>
          )}
        </ul>
      </div>

      {/* Weaknesses Card */}
      <div className="bg-white rounded-3xl border border-amber-100 p-6 sm:p-7 shadow-soft">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Areas Needing Improvement
            </h3>
            <p className="text-xs text-slate-400">Critical gaps that hurt your ranking</p>
          </div>
        </div>

        <ul className="space-y-3">
          {weaknesses.length > 0 ? (
            weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-xs text-slate-500 italic">No major weaknesses identified.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
