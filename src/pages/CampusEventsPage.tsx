import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  CalendarPlus,
  Search,
  Sparkles,
  Flame,
  Tag,
} from 'lucide-react';
import { EventCategory } from '../types';

export const CampusEventsPage: React.FC = () => {
  const { events, toggleRsvp, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Hackathon', 'Workshop', 'Tech', 'Career', 'Sports'];

  const filteredEvents = events.filter((ev) => {
    const matchesCat =
      selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleExportIcs = (eventTitle: string) => {
    // Generate simple .ics content simulation
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nSUMMARY:${eventTitle}\nDESCRIPTION:CampusMate AI Event Reminder\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${eventTitle.slice(0, 15)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar Invite Downloaded (.ics)', 'Import into Google or Apple Calendar', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarDays className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Campus Events & Hackathons
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover workshops, tech fests, club competitions, and career drives across campus.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-200 flex flex-col justify-between ${
              ev.featured
                ? 'border-indigo-300 dark:border-indigo-700 shadow-md ring-2 ring-indigo-500/10'
                : 'border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/40">
                  {ev.category}
                </span>

                {ev.featured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                    <Flame className="w-3 h-3 text-amber-500" /> Featured Event
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {ev.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              {/* Event Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ev.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Event Logistics */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>
                    {ev.date} • {ev.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{ev.venue}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-400">
                  <span>Host: {ev.organizer}</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                    <Users className="w-3 h-3 text-indigo-500" /> {ev.attendeesCount} Attending
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => handleExportIcs(ev.title)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
                title="Download .ics file"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Add to Calendar</span>
              </button>

              <button
                onClick={() => toggleRsvp(ev.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                  ev.isRsvp
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {ev.isRsvp ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Registered</span>
                  </>
                ) : (
                  <span>RSVP Now</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
