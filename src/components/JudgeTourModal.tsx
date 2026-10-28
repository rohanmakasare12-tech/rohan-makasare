import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Compass,
  Zap,
  Target,
  Layers,
  Award,
} from 'lucide-react';

export const JudgeTourModal: React.FC = () => {
  const { isTourOpen, setIsTourOpen, setCurrentPage, triggerCelebration } = useApp();
  const [step, setStep] = useState(0);

  if (!isTourOpen) return null;

  const steps = [
    {
      title: 'Welcome Hackathon Judges! 🏆',
      track: 'PromptWars × KickToTech 2026 • Education & Student Life Track',
      badge: '3-Minute Elevator Pitch',
      icon: Award,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Welcome to <strong className="text-indigo-600 dark:text-indigo-400">CampusMate AI</strong> — built from scratch to solve real academic friction for modern college students.
          </p>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs">
            <strong>The Problem:</strong> Students suffer from notification overload across fragmented WhatsApp groups, Discord servers, LMS portals, and paper notebooks. Deadlines are missed, study schedules slip, and important circulars get lost.
          </div>
          <p className="text-xs">
            CampusMate AI centralizes everything with an intelligent system that decides <em>what truly matters next</em>.
          </p>
        </div>
      ),
    },
    {
      title: 'Star Differentiator: "What\'s Next?" Engine ✨',
      track: 'Predictive Academic Prioritization',
      badge: 'Core Innovation',
      icon: Zap,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Instead of giving students a passive, overwhelming list of 20 tasks, our proprietary <strong>"What's Next?"</strong> engine evaluates:
          </p>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
              <span><strong>Deadline Proximity:</strong> Flags assignments due within 24–48 hours.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
              <span><strong>Task Weight & Progress:</strong> Detects unstarted deliverables (e.g. Mechanics Assignment at 0%).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
              <span><strong>Actionable Triggers:</strong> 1-click execution to launch a 45m Pomodoro study session.</span>
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            Judges can test live scenarios directly on the dashboard card using the scenario toggles!
          </p>
        </div>
      ),
    },
    {
      title: 'Comprehensive Campus Life Ecosystem 🏛️',
      track: 'All-in-One Architecture',
      badge: 'Unified Platform',
      icon: Layers,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            CampusMate AI goes far beyond a to-do list. It consolidates the full spectrum of university life:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">🤖 AI Academic Assistant</span>
              <span className="text-slate-500 text-[11px]">Generates 5-day study plans and breaks tasks into subtasks.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">📚 Study Planner & Timer</span>
              <span className="text-slate-500 text-[11px]">Built-in Pomodoro with timetable and daily goal logs.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">🔎 Lost & Found Board</span>
              <span className="text-slate-500 text-[11px]">Campus recovery board for ID cards, calculators & laptops.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">📊 Recharts Analytics</span>
              <span className="text-slate-500 text-[11px]">Weekly study distribution, completion rates & streaks.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ready for Live Judging Demo! 🚀',
      track: 'Polished • Responsive • Hackathon Ready',
      badge: 'Interactive Demo',
      icon: Target,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            The entire interface is responsive, supports light/dark mode, persists data in local storage, and includes pre-seeded realistic engineering college data.
          </p>
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
            <strong>Recommended 3-Minute Demo Flow:</strong>
            <ol className="list-decimal list-inside mt-1.5 space-y-1 text-slate-600 dark:text-slate-300">
              <li>Review the <strong>Landing Page</strong> and click "Open My Dashboard".</li>
              <li>Inspect the <strong>What's Next?</strong> recommendation card and trigger "Start Task".</li>
              <li>Open the <strong>AI Assistant</strong> and click "Create a study plan for my exams".</li>
              <li>Check the <strong>Assignments Kanban</strong> and click "AI Breakdown" on a task.</li>
            </ol>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      triggerCelebration();
      setIsTourOpen(false);
      setCurrentPage('dashboard');
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {current.badge}
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                {current.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{current.track}</p>
            </div>
          </div>
          <button
            onClick={() => setIsTourOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 min-h-[220px]">{current.content}</div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === step
                    ? 'w-6 bg-indigo-600'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <span>{step === steps.length - 1 ? 'Start Exploring App' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
