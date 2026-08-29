import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = FileText,
  title = 'No analyses yet',
  description = 'Upload your first resume in PDF format to discover missing skills, generate your ATS score, and receive AI recommendations.',
  actionText = 'Upload Your First Resume',
  actionLink = '/upload',
  onAction
}) {
  return (
    <div className="bg-white rounded-3xl border border-dashed border-slate-300/80 p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-md">
        {description}
      </p>

      {actionLink ? (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : onAction ? (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : null}
    </div>
  );
}
