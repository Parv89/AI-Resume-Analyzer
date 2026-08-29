import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Trash2,
  Eye,
  Briefcase,
  FileText,
  Calendar,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { historyAPI } from '../lib/api';
import { SAMPLE_ANALYSES } from '../lib/demoData';
import { useToast } from '../context/ToastContext';
import EmptyState from '../components/common/EmptyState';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await historyAPI.getAll();
      if (res?.data && res.data.length > 0) {
        setAnalyses(res.data);
      } else {
        setAnalyses(SAMPLE_ANALYSES);
      }
    } catch {
      setAnalyses(SAMPLE_ANALYSES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume analysis record?')) {
      return;
    }
    try {
      await historyAPI.delete(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      showToast('Analysis deleted from history', 'success');
    } catch (e) {
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      showToast('Record removed', 'success');
    }
  };

  // Filter & Search
  const filtered = analyses.filter((item) => {
    const matchesSearch =
      (item.file_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filterLevel === 'all') return true;
    return (item.score_level || item.scoreLevel || '').toLowerCase() === filterLevel.toLowerCase();
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'score-desc') return (Number(b.ats_score) || 0) - (Number(a.ats_score) || 0);
    if (sortBy === 'score-asc') return (Number(a.ats_score) || 0) - (Number(b.ats_score) || 0);
    if (sortBy === 'date-asc') return new Date(a.created_at) - new Date(b.created_at);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const getScoreBadge = (score) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Resume Analysis History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            View, compare, and manage your previous resume scans and ATS evaluations
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Scan New Resume</span>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by resume title or keywords..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="all">All Score Levels</option>
              <option value="excellent">Excellent (90-100)</option>
              <option value="good">Good (75-89)</option>
              <option value="average">Average (60-74)</option>
              <option value="needs improvement">Needs Improvement</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="score-desc">Highest Score</option>
              <option value="score-asc">Lowest Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Records Table / Cards */}
      {filtered.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="py-4 px-6 font-semibold">Resume Document</th>
                  <th className="py-4 px-6 font-semibold">ATS Score</th>
                  <th className="py-4 px-6 font-semibold">Score Level</th>
                  <th className="py-4 px-6 font-semibold">Skills Detected</th>
                  <th className="py-4 px-6 font-semibold">Date Analyzed</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-xs">{item.file_name || 'Resume.pdf'}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">{item.summary?.substring(0, 50)}...</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${getScoreBadge(item.ats_score)}`}>
                        <span>{item.ats_score}</span>
                        <span className="text-[10px] opacity-70 font-normal">/100</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 font-medium text-slate-700">
                      {item.score_level || item.scoreLevel || 'Good'}
                    </td>

                    <td className="py-4 px-6 text-slate-600">
                      {(item.detected_skills || item.detectedSkills || []).length} competencies
                    </td>

                    <td className="py-4 px-6 text-slate-500 text-xs">
                      {new Date(item.created_at || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/analysis?id=${item.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                        <Link
                          to={`/job-matcher?resumeId=${item.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          title="Match Job Description"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No analyses match your search criteria"
          description="Try adjusting your search query or score filters, or upload a new resume."
          actionText="Upload Resume"
          actionLink="/upload"
        />
      )}
    </div>
  );
}
