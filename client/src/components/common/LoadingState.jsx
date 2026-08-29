import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Sparkles, Cpu, FileSearch, ShieldCheck } from 'lucide-react';

export default function LoadingState({
  title = 'Analyzing Your Resume...',
  steps = [
    { label: 'Uploading & validating PDF document', icon: ShieldCheck },
    { label: 'Extracting text and structural sections', icon: FileSearch },
    { label: 'Running AI resume analysis & skill extraction', icon: Cpu },
    { label: 'Calculating transparent 100-pt ATS score', icon: Sparkles }
  ]
}) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-10 max-w-lg mx-auto shadow-premium text-center">
      {/* Animated Center Spinner */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-glow animate-spin">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-8">
        Please hold on while our AI engine scans your qualifications and compiles recommendations.
      </p>

      {/* Progress Steps */}
      <div className="space-y-3.5 text-left bg-slate-50 p-5 rounded-2xl border border-slate-100">
        {steps.map((step, idx) => {
          const StepIcon = step.icon || Cpu;
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                isDone
                  ? 'text-emerald-700 font-medium'
                  : isActive
                  ? 'text-indigo-700 font-semibold translate-x-1'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              ) : isActive ? (
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 text-[10px] text-slate-400">
                  {idx + 1}
                </div>
              )}
              <span className="flex-1 text-xs sm:text-sm">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
