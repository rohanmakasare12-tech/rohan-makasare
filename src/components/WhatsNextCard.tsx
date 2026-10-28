import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  AlertTriangle,
  Flame,
  CheckCircle,
  RefreshCw,
  Zap,
} from 'lucide-react';

export const WhatsNextCard: React.FC = () => {
  const {
    whatsNext,
    whatsNextScenario,
    setWhatsNextScenario,
    recalculateWhatsNext,
    startTimer,
    setCurrentPage,
  } = useApp();

  const handleStartAction = () => {
    if (whatsNext.actionType === 'start_pomodoro') {
      startTimer(whatsNext.estimatedMinutes || 45, whatsNext.title);
      setCurrentPage('planner');
    } else if (whatsNext.actionType === 'rsvp_event') {
      setCurrentPage('events');
    } else {
      setCurrentPage('assignments');
    }
  };

  const handleSecondaryAction = () => {
    setCurrentPage('planner');
  };

  const isCritical = whatsNext.urgency === 'critical';
  const isHigh = whatsNext.urgency === 'high';

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-purple-950/20 border-2 border-indigo-200/80 dark:border-indigo-800/60 shadow-lg shadow-indigo-500/5 transition-all">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-44 h-44 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                ✨ What's Next?
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-300/40 dark:border-indigo-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                AI Priority Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Synthesized from active deadlines, class schedule & study progress
            </p>
          </div>
        </div>

        {/* Recalculate button */}
        <button
          onClick={recalculateWhatsNext}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border border-indigo-200 dark:border-indigo-800 shadow-xs transition-all hover:scale-105 active:scale-95"
          title="Recalculate recommendation with fresh data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Recalculate</span>
        </button>
      </div>

      {/* Main Core Recommendation Content */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center relative z-10">
        <div className="lg:col-span-8 space-y-3">
          {/* Context Banner */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
            <div className="mt-0.5 shrink-0">
              {isCritical ? (
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              ) : isHigh ? (
                <Flame className="w-5 h-5 text-amber-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                "{whatsNext.context}"
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {whatsNext.reason}
              </p>
            </div>
          </div>

          {/* Action Recommendation Box */}
          <div className="p-4 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/15 border border-indigo-300/60 dark:border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  Recommended Action:
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {whatsNext.recommendedAction}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 shrink-0 font-medium">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Est. {whatsNext.estimatedMinutes} mins</span>
            </div>
          </div>
        </div>

        {/* Right CTA Buttons */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
          <button
            onClick={handleStartAction}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Task</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleSecondaryAction}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 shadow-xs transition-all hover:scale-[1.01]"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>View Schedule</span>
          </button>
        </div>
      </div>

      {/* Judge Simulation Controls */}
      <div className="mt-5 pt-4 border-t border-indigo-100 dark:border-indigo-900/40 flex flex-wrap items-center justify-between gap-2 text-xs relative z-10">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
          ⚖️ Judge Demo Scenarios:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setWhatsNextScenario('auto')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              whatsNextScenario === 'auto'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
          >
            Due Tomorrow (Live)
          </button>
          <button
            onClick={() => setWhatsNextScenario('exam_crunch')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              whatsNextScenario === 'exam_crunch'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
          >
            Exam Crunch (48h)
          </button>
          <button
            onClick={() => setWhatsNextScenario('hackathon')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              whatsNextScenario === 'hackathon'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
          >
            Hackathon Eve
          </button>
          <button
            onClick={() => setWhatsNextScenario('all_caught_up')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              whatsNextScenario === 'all_caught_up'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
          >
            All Cleared
          </button>
        </div>
      </div>
    </div>
  );
};
