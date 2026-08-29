import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Sparkles, Shield, AlertCircle, FileCheck, CheckCircle2, Clock } from 'lucide-react';
import { analyzeAPI } from '../lib/api';
import { useToast } from '../context/ToastContext';
import DragDropUploader from '../components/upload/DragDropUploader';
import LoadingState from '../components/common/LoadingState';

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleAnalyzeFile = async (file) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('resume', file);

      showToast('Uploading PDF & running AI ATS Scanner...', 'info');

      const response = await analyzeAPI.uploadResume(formData);

      if (response && response.data) {
        triggerConfetti();
        showToast('Resume analysis complete! ATS score generated.', 'success');
        const analysisId = response.data.analysisId || response.data.analysis?.id;
        navigate(`/analysis?id=${analysisId}`);
      } else {
        throw new Error('Analysis completed with empty response data');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      showToast(error.message || 'Failed to analyze resume. Please ensure PDF has readable text.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeText = async (text) => {
    try {
      setIsLoading(true);
      showToast('Parsing resume text & running ATS Scanner...', 'info');

      const response = await analyzeAPI.analyzeText({
        text,
        fileName: 'Pasted_Resume_Text.pdf'
      });

      if (response && response.data) {
        triggerConfetti();
        showToast('Resume analysis complete! ATS score generated.', 'success');
        const analysisId = response.data.analysisId || response.data.analysis?.id;
        navigate(`/analysis?id=${analysisId}`);
      } else {
        throw new Error('Analysis completed with empty response data');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      showToast(error.message || 'Failed to analyze text.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Title & Instructions */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Resume & ATS Scanner</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Upload Your Resume for Instant Scoring
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Our AI parser extracts your qualifications, calculates your 100-point ATS score, detects missing skills, and recommends targeted fixes.
        </p>
      </div>

      {isLoading ? (
        <LoadingState
          title="AI ATS Scanner In Progress"
          steps={[
            { label: 'Uploading & validating PDF format', icon: Shield },
            { label: 'Extracting text and standard section headers', icon: FileCheck },
            { label: 'Running Gemini AI skill and keyword extraction', icon: Sparkles },
            { label: 'Computing 100-pt ATS score & career recommendations', icon: CheckCircle2 }
          ]}
        />
      ) : (
        <>
          <DragDropUploader
            onAnalyzeFile={handleAnalyzeFile}
            onAnalyzeText={handleAnalyzeText}
            isLoading={isLoading}
          />

          {/* Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-center shadow-xs">
              <Shield className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
              <h4 className="text-xs font-bold text-slate-800">100% Private</h4>
              <p className="text-[11px] text-slate-400">Strict Row Level Security</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-center shadow-xs">
              <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
              <h4 className="text-xs font-bold text-slate-800">Fast Analysis</h4>
              <p className="text-[11px] text-slate-400">Results in under 10 seconds</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-center shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-violet-600 mx-auto mb-1.5" />
              <h4 className="text-xs font-bold text-slate-800">Zero Guesswork</h4>
              <p className="text-[11px] text-slate-400">Transparent 8-section audit</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
