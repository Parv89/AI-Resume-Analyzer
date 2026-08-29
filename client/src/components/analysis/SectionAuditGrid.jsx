import React from 'react';
import {
  UserCheck,
  FileSpreadsheet,
  Code,
  Briefcase,
  FolderGit2,
  GraduationCap,
  KeyRound,
  LayoutTemplate
} from 'lucide-react';
import ScoreCard from '../common/ScoreCard';

export default function SectionAuditGrid({ sectionScores = {}, formattingIssues = [], suggestions = [] }) {
  const sections = [
    {
      title: 'Contact Information',
      score: Number(sectionScores.contact) || 90,
      maxScore: 100,
      weight: '10 pts',
      icon: UserCheck,
      problems: Number(sectionScores.contact) < 80 ? ['Missing LinkedIn profile or complete location details'] : [],
      suggestions: ['Ensure phone number, email, and customized LinkedIn profile are in header.']
    },
    {
      title: 'Professional Summary',
      score: Number(sectionScores.summary) || 80,
      maxScore: 100,
      weight: '10 pts',
      icon: FileSpreadsheet,
      problems: Number(sectionScores.summary) < 75 ? ['Summary could be more specific with years of experience and core value proposition'] : [],
      suggestions: ['Frame 2-3 lines with job title, specialized technologies, and top achievements.']
    },
    {
      title: 'Skills & Competencies',
      score: Number(sectionScores.skills) || 85,
      maxScore: 100,
      weight: '20 pts',
      icon: Code,
      problems: Number(sectionScores.skills) < 80 ? ['Some high-demand frameworks are missing from the skills bank'] : [],
      suggestions: ['Organize skills by categories (Languages, Frameworks, Cloud, Databases).']
    },
    {
      title: 'Work Experience',
      score: Number(sectionScores.experience) || 78,
      maxScore: 100,
      weight: '20 pts',
      icon: Briefcase,
      problems: Number(sectionScores.experience) < 80 ? ['Lack of quantified numerical results (% improvements, revenue, user scale)'] : [],
      suggestions: ['Use Google XYZ formula: Accomplished [X] as measured by [Y] by doing [Z].']
    },
    {
      title: 'Projects & Implementations',
      score: Number(sectionScores.projects) || 80,
      maxScore: 100,
      weight: '15 pts',
      icon: FolderGit2,
      problems: Number(sectionScores.projects) < 75 ? ['Projects lack live demonstration URLs or GitHub links'] : [],
      suggestions: ['Add links to GitHub repos or deployed live applications.']
    },
    {
      title: 'Education & Credentials',
      score: Number(sectionScores.education) || 90,
      maxScore: 100,
      weight: '10 pts',
      icon: GraduationCap,
      problems: [],
      suggestions: ['List degree, university name, and graduation year clearly.']
    },
    {
      title: 'Keyword Density',
      score: Number(sectionScores.keywords) || 80,
      maxScore: 100,
      weight: '10 pts',
      icon: KeyRound,
      problems: Number(sectionScores.keywords) < 75 ? ['Missing domain-specific terminology for target roles'] : [],
      suggestions: ['Review target job descriptions and include critical search keywords.']
    },
    {
      title: 'Formatting & ATS Compliance',
      score: Number(sectionScores.formatting) || 88,
      maxScore: 100,
      weight: '5 pts',
      icon: LayoutTemplate,
      problems: formattingIssues.length > 0 ? formattingIssues : [],
      suggestions: ['Avoid multi-column tables, charts, or images that confuse ATS text parsers.']
    }
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Section-by-Section ATS Audit
        </h3>
        <p className="text-xs text-slate-500">
          Transparent evaluation across all 8 standard recruiter scoring categories (100 pts total)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sections.map((section, idx) => (
          <ScoreCard
            key={idx}
            title={section.title}
            score={section.score}
            maxScore={section.maxScore}
            problems={section.problems}
            suggestions={section.suggestions}
            icon={section.icon}
          />
        ))}
      </div>
    </div>
  );
}
