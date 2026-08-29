import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Eye, Briefcase, Trash2 } from 'lucide-react';

export default function RecentAnalysesTable({ analyses = [], onDelete, onView }) {
  if (analyses.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <p className="text-sm text-slate-500 mb-3">No resume scans recorded yet.</p>
        <Link
          to="/upload"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline"
        >
          Upload and scan your first resume →
        </Link>
      </div>
    );
  }

  const getScoreBadge = (score) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
            <th className="pb-3 px-4 font-semibold">Resume File</th>
            <th className="pb-3 px-4 font-semibold">ATS Score</th>
            <th className="pb-3 px-4 font-semibold">Date Analyzed</th>
            <th className="pb-3 px-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
          {analyses.slice(0, 5).map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="py-3.5 px-4 font-medium text-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="truncate max-w-[200px] sm:max-w-xs font-semibold text-slate-800">
                    {item.file_name || 'Resume.pdf'}
                  </span>
                </div>
              </td>

              <td className="py-3.5 px-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBadge(item.ats_score)}`}>
                  <span>{item.ats_score}</span>
                  <span className="text-[10px] opacity-70 font-normal">/100</span>
                </span>
              </td>

              <td className="py-3.5 px-4 text-slate-500 text-xs">
                {new Date(item.created_at || Date.now()).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </td>

              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-1 sm:gap-2">
                  <Link
                    to={`/analysis?id=${item.id}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="View Detailed Analysis"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/job-matcher?resumeId=${item.id}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Match with Job Description"
                  >
                    <Briefcase className="w-4 h-4" />
                  </Link>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
