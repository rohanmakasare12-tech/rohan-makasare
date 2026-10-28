import React from 'react';
import { useApp, NavigationPage } from '../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  CheckSquare,
  CalendarDays,
  Search,
  Megaphone,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    tasks,
    announcements,
    timerSeconds,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    timerSubject,
  } = useApp();

  const pendingTasksCount = tasks.filter((t) => t.status !== 'completed').length;
  const unreadAnnouncementsCount = announcements.filter((a) => !a.hasRead).length;

  const navItems: { id: NavigationPage; label: string; icon: any; badge?: number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'planner', label: 'Study Planner', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: CheckSquare, badge: pendingTasksCount, badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' },
    { id: 'events', label: 'Campus Events', icon: CalendarDays },
    { id: 'lost_found', label: 'Lost & Found', icon: Search },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, badge: unreadAnnouncementsCount > 0 ? unreadAnnouncementsCount : undefined, badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
    { id: 'productivity', label: 'Productivity', icon: BarChart3 },
  ];

  // Helper to format MM:SS
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const formattedTimer = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors hidden md:flex min-h-[calc(100vh-4rem)]">
      {/* Navigation Links */}
      <div className="p-4 space-y-1.5">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Academic Workspace
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-xs border border-indigo-200/50 dark:border-indigo-800/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-200 text-slate-700'}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom widgets & Pomodoro Card */}
      <div className="p-4 space-y-3 border-t border-slate-100 dark:border-slate-800">
        {/* Active Focus Session Widget */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/60 dark:border-indigo-800/40 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              Focus Pomodoro
            </span>
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-100">{formattedTimer}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate mt-1">
            {timerSubject}
          </p>
          <div className="flex items-center gap-1.5 mt-2.5">
            {isTimerRunning ? (
              <button
                onClick={pauseTimer}
                className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <Pause className="w-3 h-3" /> Pause
              </button>
            ) : (
              <button
                onClick={() => startTimer(45, timerSubject)}
                className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <Play className="w-3 h-3" /> Start (45m)
              </button>
            )}
            <button
              onClick={resetTimer}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
              title="Reset timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hackathon Callout */}
        <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>PromptWars 2026</span>
          </div>
          <button
            onClick={() => setCurrentPage('landing')}
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-0.5"
          >
            Landing <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
