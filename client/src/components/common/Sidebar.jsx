import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FileCheck,
  Briefcase,
  History,
  FileText,
  Settings,
  LogOut,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, isDemoMode, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Analyze Resume', path: '/upload', icon: UploadCloud, highlight: true },
    { label: 'Resume Analysis', path: '/analysis', icon: FileCheck },
    { label: 'Job Matcher', path: '/job-matcher', icon: Briefcase },
    { label: 'Analysis History', path: '/history', icon: History },
    { label: 'Saved Reports', path: '/reports', icon: FileText },
    { label: 'Settings & Profile', path: '/profile', icon: Settings }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">
                Resume<span className="text-indigo-400">IQ</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                ATS Scanner SaaS
              </span>
            </div>
          </NavLink>
        </div>

        {/* Mode Status Pill */}
        {isDemoMode && (
          <div className="mx-4 my-3 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="font-medium">Demo Exploration Mode</span>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : item.highlight
                      ? 'text-indigo-300 hover:bg-indigo-950/50 hover:text-indigo-200'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="ml-auto text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md">
                    AI
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Pro Banner / Tips */}
        <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-violet-900/40 border border-indigo-500/20 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATS Pro Tip</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Target a score above 80% to reliably bypass automated recruiter filters.
          </p>
        </div>

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-700/60 border border-indigo-400/30 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
              {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="truncate">
              <p className="text-xs font-medium text-white truncate">
                {user?.user_metadata?.full_name || 'ResumeIQ User'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {user?.email || 'user@resumeiq.ai'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
