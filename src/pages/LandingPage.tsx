import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  BookOpen,
  Bot,
  Zap,
  TrendingUp,
  Search,
  Bell,
  Play,
  Layers,
  Award,
  Users,
  Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, setIsTourOpen, isAuthenticated, setAuthMode } = useApp();

  const handleOpenDashboard = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setAuthMode('login');
      setCurrentPage('auth');
    }
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setCurrentPage('auth');
  };

  const handleSeeHowItWorks = () => {
    setIsTourOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                CampusMate <span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                PromptWars '26
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#preview" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Dashboard Preview
            </a>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleSeeHowItWorks}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              <span>Judge Tour</span>
            </button>
            <button
              onClick={handleSignIn}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleOpenDashboard}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Open My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-blue-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Track Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>PromptWars × KickToTech 2026 • Education & Student Life Track</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Your Campus. Your Studies.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
              One Intelligent Companion.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CampusMate AI helps students organize assignments, plan their studies, discover campus events and make smarter decisions about what to do next.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={handleOpenDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Open My Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleSeeHowItWorks}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all border border-slate-200 dark:border-slate-700"
            >
              <Play className="w-4 h-4 text-indigo-500 fill-indigo-500" />
              <span>See How It Works</span>
            </button>
          </div>

          {/* Trust stats pill */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> All-in-One Architecture
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time "What's Next?" AI
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Responsive & Hackathon-Ready
            </span>
          </div>
        </div>

        {/* Dashboard Preview / Mockup */}
        <div id="preview" className="max-w-6xl mx-auto px-4 sm:px-6 mt-14 relative z-10">
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent border border-indigo-200/70 dark:border-slate-800 shadow-2xl">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
              {/* Fake Window Bar */}
              <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    campusmate.ai/dashboard
                  </span>
                </div>
                <button
                  onClick={handleOpenDashboard}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Click to Open Live App
                </button>
              </div>

              {/* Interactive Mockup Body */}
              <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                {/* Mock Top Recommendation Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50/60 to-white dark:from-slate-800 dark:via-indigo-950/40 dark:to-slate-800 border-2 border-indigo-300/80 dark:border-indigo-700/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> What's Next Recommendation
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        DUE TOMORROW
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      "Your Engineering Mechanics assignment is due tomorrow and you have not started it yet."
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Recommendation: Complete a 45-minute study session now.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleOpenDashboard}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs"
                    >
                      Start Task
                    </button>
                    <button
                      onClick={handleOpenDashboard}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      View Schedule
                    </button>
                  </div>
                </div>

                {/* Mock 4 Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400">Pending Tasks</span>
                    <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">4</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400">Completed Tasks</span>
                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">18</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400">Study Hours</span>
                    <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">26.5h</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400">Productivity</span>
                    <p className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">94%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Key Feature Cards */}
      <section id="features" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Designed for High-Performing College Students
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Everything you need to stay on top of academics, exams, and campus life without cognitive overload.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                1. AI Study Planning
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                Automatically breaks heavy syllabi and looming exams into spaced-repetition study blocks. Includes an integrated Pomodoro timer with progress tracking.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Spaced repetition & timetable
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Automated subtask breakdowns
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                2. Smart Campus Assistant
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                A 24/7 intelligent academic advisor trained on college context. Ask for exam cram schedules, task prioritization matrices, or campus event highlights.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Context-aware student queries
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Interactive action triggers in chat
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative">
              <div className="absolute top-4 right-4">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Star Feature
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                3. "What's Next?" Recommendations
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                Eliminates student analysis paralysis by synthesizing deadlines, urgency, and progress into a single, high-impact recommended next step.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Dynamic deadline weighting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  One-tap start for focus sessions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section: Plan -> Prioritize -> Act -> Improve */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              The Proven Loop
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Plan → Prioritize → Act → Improve
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              A frictionless workflow that transforms chaos into predictable academic success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Plan</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Consolidate your courses, assignment due dates, and lab schedules in one unified calendar.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Prioritize</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                The "What's Next?" algorithm filters noise and points you to the single most critical task.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Act</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Launch focused 25–45 min Pomodoro blocks with zero distractions and checklist execution.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4">
                04
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Improve</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Review your study streaks, subject balance, and productivity analytics on Recharts graphs.
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white text-center shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to Experience CampusMate AI?
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                Prepared with live interactive demo data for PromptWars × KickToTech 2026. Explore the dashboard right now.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleOpenDashboard}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <span>Launch Live Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">CampusMate AI</span>
            <span>• PromptWars 2026 Hackathon Submission</span>
          </div>
          <p>© 2026 CampusMate AI. Built for Education & Student Life Track.</p>
        </div>
      </footer>
    </div>
  );
};
