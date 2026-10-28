import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Sparkles,
  Calendar,
  CheckCircle2,
  Volume2,
  VolumeX,
  Target,
  Flame,
  BookOpen,
} from 'lucide-react';
import { mockScheduleToday } from '../data/mockData';

export const StudyPlannerPage: React.FC = () => {
  const {
    timerSeconds,
    timerTotal,
    isTimerRunning,
    timerMode,
    timerSubject,
    startTimer,
    pauseTimer,
    resetTimer,
    switchTimerMode,
    profile,
    tasks,
    showToast,
  } = useApp();

  const [ambientSound, setAmbientSound] = useState<string>('off');

  // Format MM:SS
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;

  const progressPercent = Math.round(
    ((timerTotal - timerSeconds) / timerTotal) * 100
  );

  const toggleSound = (sound: string) => {
    if (ambientSound === sound) {
      setAmbientSound('off');
      showToast('Ambient Sound Paused', undefined, 'info');
    } else {
      setAmbientSound(sound);
      showToast(`Ambient Sound: ${sound}`, 'Focus soundtrack playing', 'info');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Study Planner & Focus Suite
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pomodoro deep-work blocks, lecture timetables, and spaced study milestones.
          </p>
        </div>

        {/* Streak Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-bold">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>{profile.streakDays}-Day Focus Streak</span>
        </div>
      </div>

      {/* Main Grid: Pomodoro Focus Center on Left, Timetable on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Full Pomodoro Timer & Ambient Sounds */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative overflow-hidden">
            {/* Ambient Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Mode Switcher */}
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 mb-6">
              <button
                onClick={() => switchTimerMode('focus')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timerMode === 'focus'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Focus Session (45m)
              </button>
              <button
                onClick={() => switchTimerMode('break')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  timerMode === 'break'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" /> Break (10m)
              </button>
            </div>

            {/* Current Subject Focus Target */}
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Active Focus Target
            </p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {timerSubject}
            </h3>

            {/* Circular / Large Timer Display */}
            <div className="my-8 relative flex items-center justify-center">
              <div className="w-56 h-56 rounded-full border-8 border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center relative shadow-inner">
                {/* SVG Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-1000 ease-linear"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={628}
                    strokeDashoffset={628 - (628 * progressPercent) / 100}
                    strokeLinecap="round"
                  />
                </svg>

                <span className="font-mono text-5xl font-black text-slate-900 dark:text-white tracking-tight relative z-10">
                  {timeFormatted}
                </span>
                <span className="text-xs font-medium text-slate-400 mt-1 relative z-10">
                  {progressPercent}% Complete
                </span>
              </div>
            </div>

            {/* Play / Pause / Reset Controls */}
            <div className="flex items-center justify-center gap-3">
              {isTimerRunning ? (
                <button
                  onClick={pauseTimer}
                  className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Session</span>
                </button>
              ) : (
                <button
                  onClick={() => startTimer(timerTotal / 60, timerSubject)}
                  className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Focus Session</span>
                </button>
              )}

              <button
                onClick={resetTimer}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Reset session"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Ambient Sound Simulator */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-semibold text-slate-400 block mb-2.5">
                🎧 Ambient Focus Soundscapes
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['🌧️ Rain & Thunder', '☕ Library Cafe', '🎧 Lo-Fi Beats', '🌊 Ocean Waves'].map(
                  (sound, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleSound(sound)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        ambientSound === sound
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300'
                      }`}
                    >
                      {sound}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Today's Schedule & Study Goal */}
        <div className="lg:col-span-5 space-y-6">
          {/* Daily Goal Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-500" />
                <span>Daily Study Goal</span>
              </h4>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                135 / 180 mins
              </span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full"
                style={{ width: '75%' }}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              45 more minutes required to maintain your 6-day consistency streak!
            </p>
          </div>

          {/* Today's Full Schedule */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>Full Daily Timetable</span>
            </h4>

            <div className="space-y-3">
              {mockScheduleToday.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {slot.subject}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {slot.time} • {slot.room}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      slot.status === 'current'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        : slot.status === 'past'
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {slot.status === 'current' ? 'Live Now' : slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
