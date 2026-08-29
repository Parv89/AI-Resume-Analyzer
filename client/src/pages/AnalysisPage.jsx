import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Download, ArrowLeft, Briefcase, Sparkles, Loader2, FileText } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { analyzeAPI, historyAPI } from '../lib/api';
import { SAMPLE_ANALYSES } from '../lib/demoData';
import { useToast } from '../context/ToastContext';
import OverviewSection from '../components/analysis/OverviewSection';
import StrengthsWeaknesses from '../components/analysis/StrengthsWeaknesses';
import SkillsBreakdown from '../components/analysis/SkillsBreakdown';
import MissingSkillsCard from '../components/analysis/MissingSkillsCard';
import KeywordAnalysisCard from '../components/analysis/KeywordAnalysisCard';
import SectionAuditGrid from '../components/analysis/SectionAuditGrid';
import RecommendedRoles from '../components/analysis/RecommendedRoles';
import EmptyState from '../components/common/EmptyState';

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const analysisId = searchParams.get('id');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        if (analysisId) {
          try {
            const res = await analyzeAPI.getAnalysis(analysisId);
            if (res && res.data) {
              setAnalysis(res.data);
              return;
            }
          } catch (e) {
            console.warn('API lookup failed, checking local samples:', e.message);
          }
        }

        // Try getting latest from history
        try {
          const histRes = await historyAPI.getAll();
          if (histRes?.data && histRes.data.length > 0) {
            const found = analysisId
              ? histRes.data.find((a) => a.id === analysisId) || histRes.data[0]
              : histRes.data[0];
            setAnalysis(found);
            return;
          }
        } catch {
          // Fall back to rich sample analysis
        }

        // Default to demo sample
        const sample = SAMPLE_ANALYSES.find((s) => s.id === analysisId) || SAMPLE_ANALYSES[0];
        setAnalysis(sample);
      } catch (err) {
        console.error('Error loading analysis:', err);
        setAnalysis(SAMPLE_ANALYSES[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  const handleDownloadPDF = () => {
    setIsExporting(true);
    showToast('Generating high-resolution ATS analysis PDF...', 'info');

    const element = document.getElementById('report-container');
    if (!element) {
      window.print();
      setIsExporting(false);
      return;
    }

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${analysis?.file_name || 'Resume'}_ATS_Analysis_Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsExporting(false);
        showToast('Report downloaded successfully!', 'success');
      })
      .catch((err) => {
        console.error('PDF export error:', err);
        window.print();
        setIsExporting(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-700">Loading comprehensive resume analysis...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <EmptyState
        title="No analysis report found"
        description="Upload your resume in PDF format to generate your personalized ATS score and improvement roadmap."
        actionText="Upload Resume"
        actionLink="/upload"
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 no-print">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Export Report (PDF)</span>
          </button>

          <Link
            to={`/job-matcher?resumeId=${analysis.id || ''}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Briefcase className="w-4 h-4" />
            <span>Match Job Description</span>
          </Link>
        </div>
      </div>

      {/* Main Printable Report Container */}
      <div id="report-container" className="space-y-8 bg-transparent">
        {/* 1. Overview Banner & Circular ATS Score */}
        <OverviewSection analysis={analysis} onDownloadPDF={handleDownloadPDF} />

        {/* 2. Strengths & Weaknesses */}
        <StrengthsWeaknesses
          strengths={analysis.strengths || []}
          weaknesses={analysis.weaknesses || []}
        />

        {/* 3. Skills Detection */}
        <SkillsBreakdown
          detectedSkills={analysis.detected_skills || analysis.detectedSkills || []}
        />

        {/* 4. Missing Skills */}
        <MissingSkillsCard
          missingSkills={analysis.missing_skills || analysis.missingSkills || []}
        />

        {/* 5. Keyword Optimization */}
        <KeywordAnalysisCard
          keywords={analysis.keywords || { strong: [], recommended: [] }}
        />

        {/* 6. Section-by-Section ATS Audit */}
        <SectionAuditGrid
          sectionScores={analysis.section_scores || analysis.sectionScores || {}}
          formattingIssues={analysis.formatting_issues || analysis.formattingIssues || []}
          suggestions={analysis.suggestions || []}
        />

        {/* 7. Recommended Job Roles */}
        <RecommendedRoles
          recommendedRoles={analysis.recommended_roles || analysis.recommendedRoles || []}
          resumeId={analysis.id}
        />
      </div>
    </div>
  );
}
