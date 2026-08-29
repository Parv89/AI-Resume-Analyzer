import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function ATSScoreHistoryChart({ data = [] }) {
  const chartData = data.length > 0
    ? data.map((item, index) => ({
        name: item.file_name?.length > 15 ? item.file_name.substring(0, 12) + '...' : item.file_name || `Analysis #${index + 1}`,
        score: Number(item.ats_score) || 75,
        date: new Date(item.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }))
    : [
        { name: 'Initial Scan', score: 62, date: 'Scan 1' },
        { name: 'Added Keywords', score: 74, date: 'Scan 2' },
        { name: 'Quantified Bullets', score: 81, date: 'Scan 3' },
        { name: 'Latest Optimization', score: 87, date: 'Scan 4' }
      ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-800">
          <p className="font-semibold">{label}</p>
          <p className="text-indigo-300 mt-1">
            ATS Score: <span className="font-bold text-white text-sm">{payload[0].value}</span> / 100
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#4f46e5"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#scoreGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
