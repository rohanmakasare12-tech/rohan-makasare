import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Megaphone,
  AlertCircle,
  Clock,
  Download,
  CheckCircle,
  FileText,
  Filter,
  CheckCheck,
  Search,
} from 'lucide-react';
import { Department } from '../types';

export const AnnouncementsPage: React.FC = () => {
  const {
    announcements,
    markAnnouncementAsRead,
    markAllAnnouncementsRead,
    showToast,
  } = useApp();

  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const departments: ('All' | Department)[] = [
    'All',
    'Examination Cell',
    'Academics',
    'Placement & Training',
    'Student Affairs',
    'Dean Office',
  ];

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesDept =
      selectedDept === 'All' || ann.department === selectedDept;
    const matchesQuery =
      searchQuery === '' ||
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const handleDownloadPdf = (title: string) => {
    const fakeContent = `CAMPUS CIRCULAR\nTitle: ${title}\nIssued by: Apex Institute of Technology\nAuthentication: Verified Official Document\nDate: October 2026`;
    const blob = new Blob([fakeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Circular-${title.slice(0, 15)}.txt`;
    a.click();
    showToast('Circular Downloaded', 'Official academic notice saved', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Campus Circulars & Notices
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official broadcasts from Examination Cell, Dean's Office, and Placement Division.
          </p>
        </div>

        <button
          onClick={markAllAnnouncementsRead}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-emerald-500" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter by Department */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedDept === dept
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => {
          const isUrgent = ann.urgency === 'urgent';
          const isImportant = ann.urgency === 'important';
          return (
            <div
              key={ann.id}
              onClick={() => markAnnouncementAsRead(ann.id)}
              className={`p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all cursor-pointer ${
                !ann.hasRead
                  ? 'border-indigo-300 dark:border-indigo-700 shadow-sm ring-2 ring-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {ann.department}
                    </span>

                    {isUrgent ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Urgent Notice
                      </span>
                    ) : isImportant ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        Important
                      </span>
                    ) : null}

                    {!ann.hasRead && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {ann.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ann.content}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {ann.date}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadPdf(ann.title);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
