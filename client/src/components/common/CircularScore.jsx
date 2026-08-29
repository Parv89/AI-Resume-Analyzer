import React from 'react';

export default function CircularScore({ score = 0, size = 180, strokeWidth = 12, showDetails = true }) {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));
  
  // Radius & circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const getColorConfig = (val) => {
    if (val >= 90) {
      return {
        stroke: '#10b981', // emerald-500
        bgRing: 'text-emerald-100',
        text: 'text-emerald-600',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        level: 'Excellent'
      };
    }
    if (val >= 75) {
      return {
        stroke: '#4f46e5', // indigo-600
        bgRing: 'text-indigo-100',
        text: 'text-indigo-600',
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        level: 'Good'
      };
    }
    if (val >= 60) {
      return {
        stroke: '#f59e0b', // amber-500
        bgRing: 'text-amber-100',
        text: 'text-amber-600',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        level: 'Average'
      };
    }
    if (val >= 40) {
      return {
        stroke: '#f97316', // orange-500
        bgRing: 'text-orange-100',
        text: 'text-orange-600',
        badge: 'bg-orange-50 text-orange-700 border-orange-200',
        level: 'Needs Improvement'
      };
    }
    return {
      stroke: '#ef4444', // red-500
      bgRing: 'text-red-100',
      text: 'text-red-600',
      badge: 'bg-red-50 text-red-700 border-red-200',
      level: 'Poor'
    };
  };

  const config = getColorConfig(clampedScore);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100"
          />
          {/* Animated Value Arc */}
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

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900">
            {clampedScore}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            / 100
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 flex flex-col items-center">
          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold border ${config.badge}`}>
            {config.level}
          </span>
        </div>
      )}
    </div>
  );
}
