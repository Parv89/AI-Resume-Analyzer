import React, { useState } from 'react';
import { Cpu, Users, Code, Filter } from 'lucide-react';
import SkillTag from '../common/SkillTag';

export default function SkillsBreakdown({ detectedSkills = [] }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'technical' | 'soft'

  const techSkills = detectedSkills.filter((s) => s.type === 'technical');
  const softSkills = detectedSkills.filter((s) => s.type === 'soft');

  const displayedSkills =
    filter === 'technical'
      ? techSkills
      : filter === 'soft'
      ? softSkills
      : detectedSkills;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-soft mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Detected Skills & Competencies
            </h3>
            <p className="text-xs text-slate-400">
              Found {detectedSkills.length} total skills ({techSkills.length} Technical, {softSkills.length} Soft)
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl text-xs font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white text-indigo-600 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({detectedSkills.length})
          </button>
          <button
            onClick={() => setFilter('technical')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'technical'
                ? 'bg-white text-indigo-600 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Technical ({techSkills.length})
          </button>
          <button
            onClick={() => setFilter('soft')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === 'soft'
                ? 'bg-white text-indigo-600 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Soft Skills ({softSkills.length})
          </button>
        </div>
      </div>

      {/* Skills Grid / Tag Cloud */}
      {displayedSkills.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {displayedSkills.map((skill, idx) => (
            <SkillTag
              key={idx}
              name={skill.name || skill}
              type={skill.type || (idx % 2 === 0 ? 'technical' : 'soft')}
              category={skill.category}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">No skills detected in this category.</p>
      )}
    </div>
  );
}
