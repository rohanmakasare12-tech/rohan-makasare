import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  Brain,
  Clock,
} from 'lucide-react';
import { mockProductivityData } from '../data/mockData';

export const ProductivityPage: React.FC = () => {
  const { profile, tasks } = useApp();

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const totalCount = tasks.length;
  const currentCompletionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 90;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Productivity & Academic Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Data-driven insights into your study habits, syllabus mastery, and cognitive stamina.
          </p>
        </div>

        {/* Efficiency Score Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xs">
          <Zap className="w-4 h-4 text-indigo-500" />
          <span>Productivity Index: {currentCompletionRate}%</span>
        </div>
      </div>

      {/* 4 Summary Micro-Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Total Study Time</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {profile.totalStudyHours} hrs
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            ↑ 14% vs previous week
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Streak Record</span>
          <p className="text-2xl font-black text-amber-500 mt-1">
            🔥 {profile.streakDays} Days
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Personal best: 14 days
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">On-Time Completion</span>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            96.2%
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Zero missed lab deadlines
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Burnout Risk</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            Low (Optimal)
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Balanced rest intervals
          </span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Weekly Study Hours Bar Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Weekly Study Time vs Target (Hours)
              </h3>
              <p className="text-xs text-slate-400">
                Mon–Sun breakdown of focused Pomodoro sessions
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-3 h-3 rounded-md bg-indigo-600" /> Actual
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-3 rounded-md bg-slate-300 dark:bg-slate-700" /> Target
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockProductivityData.weeklyStudyHours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="hours" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Actual Hours" />
                <Bar dataKey="target" fill="#CBD5E1" radius={[6, 6, 0, 0]} name="Target Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Subject Distribution Pie Chart (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Subject Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Hours invested per academic subject
            </p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockProductivityData.subjectDistribution}
                  dataKey="hours"
                  nameKey="subject"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {mockProductivityData.subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {mockProductivityData.subjectDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.subject}
                </span>
                <span className="font-mono font-semibold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Burnout Prevention & Cognitive Energy Advisor */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-white dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-600/20">
            <Brain className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>AI Cognitive Energy & Fatigue Diagnostic</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                State: Peak Focus
              </span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Based on your 26.5 hours logged this week and completion of the Cloud Computing lab, your cognitive load is well-distributed. 
              With <strong>PromptWars 2026 Hackathon</strong> starting tomorrow, avoid cramming past 11:00 PM tonight. 
              Wrap up the 45-minute <em>Engineering Mechanics</em> study session before dinner to ensure full memory consolidation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
