import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, AlertCircle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function DragDropUploader({ onAnalyzeFile, onAnalyzeText, isLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [mode, setMode] = useState('file'); // 'file' | 'text'
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please select a valid PDF document (.pdf)', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB', 'error');
      return;
    }

    setSelectedFile(file);
    showToast(`Loaded "${file.name}" ready for ATS analysis`, 'success');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (mode === 'file') {
      if (!selectedFile) {
        showToast('Please upload a PDF resume first', 'warning');
        return;
      }
      onAnalyzeFile(selectedFile);
    } else {
      if (!pastedText.trim() || pastedText.trim().length < 30) {
        showToast('Please paste at least 30 characters of resume text', 'warning');
        return;
      }
      onAnalyzeText(pastedText);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-premium max-w-2xl mx-auto">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-xs mx-auto mb-6">
        <button
          onClick={() => setMode('file')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            mode === 'file'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Upload PDF File
        </button>
        <button
          onClick={() => setMode('text')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            mode === 'text'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Paste Resume Text
        </button>
      </div>

      {mode === 'file' ? (
        <>
          {/* Drag & Drop Box */}
          {!selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-4 shadow-inner group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                Drag and drop your resume here
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                or <span className="text-indigo-600 font-semibold underline">browse files</span> from your computer
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>PDF format only • Max file size: 10MB</span>
              </div>
            </div>
          ) : (
            /* Selected File Card */
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{selectedFile.name}</h4>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(selectedFile.size)} • PDF Document
                  </p>
                </div>
              </div>

              <button
                onClick={handleRemoveFile}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Paste Text Option */
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Paste Full Resume Content
          </label>
          <textarea
            rows={8}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your resume text here (Summary, Work Experience, Skills, Education, Projects)..."
            className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
          />
          <p className="text-xs text-slate-400 mt-2">
            Tip: For highest ATS accuracy, we recommend uploading the original PDF directly.
          </p>
        </div>
      )}

      {/* Submit CTA */}
      <div className="mt-6">
        <button
          onClick={handleAnalyze}
          disabled={isLoading || (mode === 'file' && !selectedFile) || (mode === 'text' && !pastedText.trim())}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-md shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze Resume & Generate ATS Score</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
