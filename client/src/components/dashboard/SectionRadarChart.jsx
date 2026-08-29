import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';

export default function SectionRadarChart({ sectionScores = {} }) {
  const radarData = [
    { section: 'Contact', score: Number(sectionScores.contact) || 90, fullMark: 100 },
    { section: 'Summary', score: Number(sectionScores.summary) || 80, fullMark: 100 },
    { section: 'Skills', score: Number(sectionScores.skills) || 85, fullMark: 100 },
    { section: 'Experience', score: Number(sectionScores.experience) || 75, fullMark: 100 },
    { section: 'Projects', score: Number(sectionScores.projects) || 80, fullMark: 100 },
    { section: 'Education', score: Number(sectionScores.education) || 90, fullMark: 100 },
    { section: 'Keywords', score: Number(sectionScores.keywords) || 75, fullMark: 100 },
    { section: 'Formatting', score: Number(sectionScores.formatting) || 85, fullMark: 100 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-slate-800">
          <p className="font-semibold">{payload[0].payload.section}</p>
          <p className="text-indigo-300">
            Score: <span className="font-bold text-white">{payload[0].value}</span> / 100
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="section" stroke="#64748b" fontSize={10} tickLine={false} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={9} />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Section Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#818cf8"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
