import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function RecommendedRoles({ recommendedRoles = [], resumeId }) {
  if (recommendedRoles.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-soft mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            AI-Recommended Job Titles & Roles
          </h3>
          <p className="text-xs text-slate-400">
            Target positions aligned with your skills, tools, and background depth
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedRoles.map((item, idx) => {
          const matchPercent = Math.min(99, Math.max(50, Math.round(Number(item.match) || 80)));
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-indigo-200 hover:bg-white hover:shadow-soft transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{item.role}</h4>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {matchPercent}%
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {item.reason}
                </p>
              </div>

              <Link
                to={`/job-matcher?jobTitle=${encodeURIComponent(item.role)}&resumeId=${resumeId || ''}`}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 pt-2 border-t border-slate-200/60"
              >
                <span>Run Detailed Job Match</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
