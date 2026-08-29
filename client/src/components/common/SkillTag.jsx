import React from 'react';

export default function SkillTag({ name, type = 'technical', category }) {
  const isTech = type === 'technical';
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
        isTech
          ? 'bg-indigo-50/80 text-indigo-700 border-indigo-200/60 hover:bg-indigo-100'
          : 'bg-teal-50/80 text-teal-700 border-teal-200/60 hover:bg-teal-100'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isTech ? 'bg-indigo-500' : 'bg-teal-500'
        }`}
      />
      <span>{name}</span>
      {category && (
        <span className="text-[10px] text-slate-400 font-normal">
          ({category})
        </span>
      )}
    </span>
  );
}
