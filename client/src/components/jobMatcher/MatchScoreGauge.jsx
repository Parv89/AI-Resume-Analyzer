import React from 'react';

export default function MatchScoreGauge({ score = 0, level = 'Good', size = 150 }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference;

  const getColor = (s) => {
    if (s >= 85) return { stroke: '#10b981', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (s >= 70) return { stroke: '#4f46e5', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    if (s >= 50) return { stroke: '#f59e0b', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { stroke: '#ef4444', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const config = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={config.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-900">{score}%</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Job Match</span>
        </div>
      </div>

      <span className={`mt-2 text-xs font-bold px-3 py-0.5 rounded-full border ${config.badge}`}>
        {level} Compatibility
      </span>
    </div>
  );
}
