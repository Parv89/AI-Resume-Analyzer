import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

export default function SkillDistributionChart({ detectedSkills = [] }) {
  const techCount = detectedSkills.filter(s => s.type === 'technical').length || 8;
  const softCount = detectedSkills.filter(s => s.type === 'soft').length || 4;

  const data = [
    { name: 'Technical Skills', value: techCount, color: '#4f46e5' },
    { name: 'Soft Skills', value: softCount, color: '#06b6d4' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-slate-800">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-slate-300">
            Detected: <span className="font-bold text-white">{payload[0].value}</span> competencies
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(val) => <span className="text-xs text-slate-600 font-medium">{val}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
