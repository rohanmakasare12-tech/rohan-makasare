import React from 'react';
import { useApp } from '../context/AppContext';
import { WhatsNextCard } from '../components/WhatsNextCard';
import { StatCards } from '../components/StatCards';
import {
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
  Plus,
  Play,
  BookOpen,
} from 'lucide-react';
import { mockScheduleToday } from '../data/mockData';

export const DashboardOverview: React.FC = () => {
  const {
    profile,
    tasks,
    events,
    announcements,
    toggleTaskStatus,
    setCurrentPage,
    setIsQuickAddOpen,
    startTimer,
  } = useApp();

  // Dynamic greeting based on current hour
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const pendingTasks = tasks.filter((t) => t.status !== 'completed').slice(0, 3);
  const featuredEvent = events.find((e) => e.featured) || events[0];
  const urgentAnnouncement =
    announcements.find((a) => a.urgency === 'urgent') || announcements[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {greeting}, {profile.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's what needs your attention today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
          <button
            onClick={() => {
              startTimer(45, 'Engineering Mechanics');
              setCurrentPage('planner');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
          >
            <Play className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
            <span>Quick 45m Sprint</span>
          </button>
        </div>
      </div>

      {/* 4 Animated Stat Counters */}
      <StatCards />

      {/* Star Differentiator: "What's Next?" Recommendation Card */}
      <WhatsNextCard />

      {/* 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Priority Deadlines & Today's Schedule */}
        <div className="lg:col-span-8 space-y-6">
          {/* Priority Assignments Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Priority Deliverables</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {tasks.filter((t) => t.status !== 'completed').length} Pending
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Deadlines prioritized by academic weight and due dates
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('assignments')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="mt-0.5 w-5 h-5 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 flex items-center justify-center transition-colors group-hover:scale-105"
                      title="Mark as completed"
                    >
                      {task.status === 'completed' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                    </button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {task.title}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            task.priority === 'high'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {task.subject}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> Due {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 w-8 text-right">
                      {task.progress}%
                    </span>
                    <button
                      onClick={() => {
                        startTimer(task.estimatedMinutes, task.title);
                        setCurrentPage('planner');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-colors"
                      title="Launch timer for this task"
                    >
                      Focus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Classes & Timetable */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>Today's Academic Schedule</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Lectures, laboratory practicals, and focus sprints
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('planner')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Full Timetable <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {mockScheduleToday.map((slot, idx) => {
                const isCurrent = slot.status === 'current';
                return (
                  <div key={idx} className="relative flex items-start gap-3">
                    <span
                      className={`absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                        isCurrent
                          ? 'bg-indigo-600 ring-4 ring-indigo-500/20 animate-pulse'
                          : slot.status === 'past'
                          ? 'bg-slate-400'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <div
                      className={`flex-1 p-3 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800'
                          : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {slot.subject}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {slot.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>{slot.professor}</span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Campus Pulse, Events & Assistant Teaser */}
        <div className="lg:col-span-4 space-y-6">
          {/* Ask AI Quick Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-lg shadow-indigo-600/20 relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-base leading-tight">CampusMate AI Assistant</h4>
                <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
                  Need a revision plan for Mechanics or want help breaking down Red-Black tree cases?
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('assistant')}
                className="w-full py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Chat with AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Featured Hackathon / Campus Event Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Featured Event
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                You're RSVP'd ✅
              </span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
              {featuredEvent.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
              {featuredEvent.description}
            </p>

            <div className="mt-3 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="text-slate-400">Date:</span>
                <span className="font-medium">{featuredEvent.date}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="text-slate-400">Venue:</span>
                <span className="font-medium">{featuredEvent.venue}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('events')}
              className="mt-3 w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>Explore All Events</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Urgent Announcement Alert */}
          {urgentAnnouncement && (
            <div className="p-5 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 shadow-xs">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-1.5">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Urgent Campus Notice
                </span>
              </div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                {urgentAnnouncement.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-3">
                {urgentAnnouncement.content}
              </p>
              <button
                onClick={() => setCurrentPage('announcements')}
                className="mt-3 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                Read Official Notice <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
