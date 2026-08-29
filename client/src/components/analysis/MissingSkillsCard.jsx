import React from 'react';
import { PlusCircle, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function MissingSkillsCard({ missingSkills = [] }) {
  if (missingSkills.length === 0) return null;

  const getImportanceBadge = (imp) => {
    switch (imp?.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium':
      case 'preferred':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-soft mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Skills You May Be Missing
          </h3>
          <p className="text-xs text-slate-400">
            High-demand competencies commonly expected for your target roles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missingSkills.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-violet-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getImportanceBadge(
                    item.importance
                  )}`}
                >
                  {item.importance || 'Recommended'}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                <span className="font-semibold text-slate-700">Why it matters:</span> {item.reason}
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-200/60 text-xs text-violet-700 bg-violet-50/50 p-2 rounded-xl flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-violet-600" />
              <span className="text-[11px] leading-tight font-medium">
                {item.recommendation || item.advice || 'Integrate into project bullets or certifications.'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
