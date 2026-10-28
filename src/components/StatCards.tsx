import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Flame,
  ArrowUpRight,
} from 'lucide-react';

// Smooth counter hook for hackathon presentation polish
function useAnimatedCount(target: number, duration: number = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startVal = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Number((startVal + (target - startVal) * easeProgress).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

export const StatCards: React.FC = () => {
  const { tasks, profile, setCurrentPage } = useApp();

  const pendingCount = tasks.filter((t) => t.status !== 'completed').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const productivityScore =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 90;

  const animatedPending = useAnimatedCount(pendingCount);
  const animatedCompleted = useAnimatedCount(completedCount);
  const animatedHours = useAnimatedCount(profile.totalStudyHours);
  const animatedScore = useAnimatedCount(productivityScore);

  const stats = [
    {
      label: 'Pending Tasks',
      value: Math.round(animatedPending),
      icon: ListTodo,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
      borderColor: 'border-amber-200/60 dark:border-amber-800/40',
      subtext: `${tasks.filter((t) => t.priority === 'high' && t.status !== 'completed').length} high priority`,
      badge: 'Action needed',
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
      onClick: () => setCurrentPage('assignments'),
    },
    {
      label: 'Completed Tasks',
      value: Math.round(animatedCompleted),
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      borderColor: 'border-emerald-200/60 dark:border-emerald-800/40',
      subtext: `+4 finished this week`,
      badge: 'Great pace',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      onClick: () => setCurrentPage('assignments'),
    },
    {
      label: 'Study Hours',
      value: `${animatedHours}h`,
      icon: Clock,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      borderColor: 'border-indigo-200/60 dark:border-indigo-800/40',
      subtext: `Target: 30h / week`,
      badge: `${profile.streakDays}-day streak 🔥`,
      badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
      onClick: () => setCurrentPage('planner'),
    },
    {
      label: 'Productivity',
      value: `${Math.round(animatedScore)}%`,
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
      borderColor: 'border-purple-200/60 dark:border-purple-800/40',
      subtext: `Top 5% on campus`,
      badge: 'Peak Flow',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      onClick: () => setCurrentPage('productivity'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            onClick={stat.onClick}
            className={`group p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border ${stat.borderColor} shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
              <div
                className={`w-9 h-9 rounded-xl ${stat.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.badgeColor}`}
              >
                {stat.badge}
              </span>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <span>{stat.subtext}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
