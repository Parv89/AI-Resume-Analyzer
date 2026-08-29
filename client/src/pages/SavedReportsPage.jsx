import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { historyAPI } from '../lib/api';
import { SAMPLE_ANALYSES } from '../lib/demoData';
import { useToast } from '../context/ToastContext';
import CircularScore from '../components/common/CircularScore';
import EmptyState from '../components/common/EmptyState';

export default function SavedReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const res = await historyAPI.getAll();
        if (res?.data && res.data.length > 0) {
          setReports(res.data);
        } else {
          setReports(SAMPLE_ANALYSES);
        }
      } catch {
        setReports(SAMPLE_ANALYSES);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Saved Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Saved ATS Analysis Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Access, download, and review all your generated resume scorecards
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all"
        >
          <span>Scan New Document</span>
        </Link>
      </div>

      {/* Reports Grid */}
      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const score = Number(report.ats_score) || 75;
            const skillsCount = (report.detected_skills || report.detectedSkills || []).length;
            const missingCount = (report.missing_skills || report.missingSkills || []).length;

            return (
              <div
                key={report.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <h3 className="font-bold text-slate-900 text-sm truncate max-w-[180px]">
                          {report.file_name || 'Resume_Scan.pdf'}
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          {new Date(report.created_at || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {score} / 100
                    </span>
                  </div>

                  {/* Summary snippet */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {report.summary || 'Comprehensive ATS evaluation completed.'}
                  </p>

                  {/* Badges */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs mb-5">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold">Skills Found</span>
                      <span className="font-bold text-indigo-600">{skillsCount}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold">Missing Gaps</span>
                      <span className="font-bold text-amber-600">{missingCount}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    to={`/analysis?id=${report.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </Link>
                  <Link
                    to={`/job-matcher?resumeId=${report.id}`}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    title="Match Job Description"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No saved reports yet"
          description="Upload your resume to generate your first ATS analysis and save it to your library."
          actionText="Upload Resume"
          actionLink="/upload"
        />
      )}
    </div>
  );
}
