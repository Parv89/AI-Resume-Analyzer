import React from 'react';

export default function ProgressBar({ value = 0, max = 100, label, showValue = true, color = 'indigo' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorMap = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    blue: 'bg-blue-600',
    violet: 'bg-violet-600'
  };

  const barColor = colorMap[color] || colorMap.indigo;

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          {label && <span className="text-slate-600">{label}</span>}
          {showValue && <span className="text-slate-900 font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
