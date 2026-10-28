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
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentPage, setCurrentPage, tasks, announcements } = useApp();

  const pendingTasksCount = tasks.filter((t) => t.status !== 'completed').length;
  const unreadAnnouncementsCount = announcements.filter((a) => !a.hasRead).length;

  const navItems: { id: NavigationPage; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'assistant', label: 'AI Chat', icon: Bot },
    { id: 'assignments', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'planner', label: 'Planner', icon: BookOpen },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'announcements', label: 'Alerts', icon: Megaphone, badge: unreadAnnouncementsCount },
    { id: 'lost_found', label: 'Lost', icon: Search },
    { id: 'productivity', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around overflow-x-auto gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-colors relative min-w-[50px] ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full text-[9px] font-bold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
