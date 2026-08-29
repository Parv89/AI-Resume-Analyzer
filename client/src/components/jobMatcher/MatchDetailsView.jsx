import React from 'react';
import { Check, X, AlertCircle, Sparkles, CheckCircle2, ListFilter, Target } from 'lucide-react';
import MatchScoreGauge from './MatchScoreGauge';
import ProgressBar from '../common/ProgressBar';

export default function MatchDetailsView({ matchResult, jobTitle }) {
  if (!matchResult) return null;

  const score = matchResult.match_score || matchResult.matchScore || 75;
  const level = matchResult.match_level || matchResult.matchLevel || 'Good';
  const summary = matchResult.summary || 'Job match analysis completed.';
  const matchedSkills = matchResult.matched_skills || matchResult.matchedSkills || [];
  const missingSkills = matchResult.missing_skills || matchResult.missingSkills || [];
  const matchingKeywords = matchResult.matching_keywords || matchResult.matchingKeywords || [];
  const missingKeywords = matchResult.missing_keywords || matchResult.missingKeywords || [];
  const recommendations = matchResult.recommendations || [];
  const breakdown = matchResult.breakdown || {
    skillsMatch: 85,
    experienceMatch: 80,
    keywordMatch: 75,
    educationMatch: 90
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Match Score */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-premium">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <MatchScoreGauge score={score} level={level} size={160} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Target Role: {jobTitle || 'Specified Job'}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Match Result: <span className="text-indigo-600">{score}% {level}</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {summary}
            </p>

            {/* Breakdown Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <ProgressBar label="Skills Fit" value={breakdown.skillsMatch || 80} color="indigo" />
              <ProgressBar label="Experience" value={breakdown.experienceMatch || 75} color="emerald" />
              <ProgressBar label="Keywords" value={breakdown.keywordMatch || 70} color="amber" />
              <ProgressBar label="Education" value={breakdown.educationMatch || 90} color="violet" />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Match vs Missing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Matched Skills & Qualifications ({matchedSkills.length})
            </h4>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
              Overlapping
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{typeof skill === 'object' ? skill.name : skill}</span>
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No exact skill matches detected.</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              Missing Job Requirements ({missingSkills.length})
            </h4>
            <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-bold">
              Gaps Detected
            </span>
          </div>

          <div className="space-y-2.5">
            {missingSkills.length > 0 ? (
              missingSkills.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-rose-900">
                      {typeof item === 'object' ? item.name : item}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-rose-600">
                      {typeof item === 'object' ? item.importance || 'Required' : 'Required'}
                    </span>
                  </div>
                  {item.advice && (
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {item.advice}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No critical missing skills found!</p>
            )}
          </div>
        </div>
      </div>

      {/* Keywords Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft">
        <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-indigo-600" />
          Job Description Keyword Comparison
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-emerald-700 block mb-2">
              ✓ Keywords Found in Both
            </span>
            <div className="flex flex-wrap gap-1.5">
              {matchingKeywords.map((k, i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700">
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
            <span className="text-xs font-semibold text-amber-800 block mb-2">
              + Keywords to Add from Job Posting
            </span>
            <div className="flex flex-wrap gap-1.5">
              {missingKeywords.map((k, i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-white border border-amber-200 rounded-lg text-amber-900 font-medium">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tailoring Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-premium">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold">Actionable Tailoring Recommendations</h4>
              <p className="text-xs text-indigo-200">How to optimize your resume before submitting</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
