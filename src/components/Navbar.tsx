import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  Sparkles,
  Plus,
  Sun,
  Moon,
  Calendar,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  Compass,
  LogOut,
  LogIn,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    profile,
    currentUser,
    isAuthenticated,
    logout,
    setAuthMode,
    announcements,
    markAnnouncementAsRead,
    isDarkMode,
    toggleDarkMode,
    setIsSearchOpen,
    setIsQuickAddOpen,
    setIsTourOpen,
    setCurrentPage,
    resetDemoData,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadAnnouncements = announcements.filter((a) => !a.hasRead);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date: "Wednesday, Oct 28, 2026"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Mobile Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
            title="Return to Landing Page"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                  CampusMate <span className="text-indigo-600 dark:text-indigo-400">AI</span>
                </span>
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40">
                  PromptWars '26
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Smart Student Hub
              </p>
            </div>
          </button>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search assignments, events, circulars...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Judge Tour Button */}
          <button
            onClick={() => setIsTourOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold shadow-xs transition-all hover:scale-105 active:scale-95"
            title="Interactive 3-minute walk-through for Hackathon Judges"
          >
            <Compass className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>3-Min Tour</span>
          </button>

          {/* Quick Add Button */}
          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-sm shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Add</span>
          </button>

          {/* Date pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>{formattedDate}</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              title="Announcements & Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadAnnouncements.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-3 z-50 animate-slide-up">
                <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">Campus Circulars</span>
                    {unreadAnnouncements.length > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        {unreadAnnouncements.length} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage('announcements');
                      setIsNotifOpen(false);
                    }}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    View all <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {announcements.slice(0, 4).map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() => {
                        markAnnouncementAsRead(ann.id);
                        setCurrentPage('announcements');
                        setIsNotifOpen(false);
                      }}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                        !ann.hasRead ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          {ann.department}
                        </span>
                        <span className="text-[10px] text-slate-400">{ann.date}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-900 dark:text-slate-100 mt-1 line-clamp-2">
                        {ann.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Authenticated Profile Pill OR Sign In Button */}
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/20"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">{profile.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{profile.semester}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 animate-slide-up">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <img src={profile.avatarUrl} alt={profile.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <h5 className="font-semibold text-xs text-slate-900 dark:text-white truncate">{profile.name}</h5>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser?.email || 'student@apex.edu'}</p>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium truncate">{profile.major}</p>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <div className="flex justify-between items-center text-xs py-1 px-2 text-slate-600 dark:text-slate-300">
                      <span>Study Streak</span>
                      <span className="font-bold text-amber-500">🔥 {profile.streakDays} Days</span>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1 px-2 text-slate-600 dark:text-slate-300">
                      <span>Total Hours</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{profile.totalStudyHours}h</span>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1 px-2 text-slate-600 dark:text-slate-300">
                      <span>Current GPA</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.gpa} / 10.0</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <button
                      onClick={() => {
                        resetDemoData();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Demo State
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setCurrentPage('auth');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
