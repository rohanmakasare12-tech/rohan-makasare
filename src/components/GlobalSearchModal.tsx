import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  CheckSquare,
  Calendar,
  Megaphone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    tasks,
    events,
    announcements,
    lostAndFound,
    setCurrentPage,
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredTasks = q
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : tasks.slice(0, 3);

  const filteredEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q)
      )
    : events.slice(0, 2);

  const filteredAnnouncements = q
    ? announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      )
    : announcements.slice(0, 2);

  const filteredLost = q
    ? lostAndFound.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q)
      )
    : [];

  const handleSelect = (page: any) => {
    setCurrentPage(page);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a subject, assignment, event, or announcement..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                Assignments ({filteredTasks.length})
              </p>
              <div className="space-y-1.5">
                {filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleSelect('assignments')}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {t.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {t.subject} • Due {t.dueDate}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.priority === 'high'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                Campus Events ({filteredEvents.length})
              </p>
              <div className="space-y-1.5">
                {filteredEvents.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => handleSelect('events')}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {e.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {e.date} • {e.venue}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {e.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements */}
          {filteredAnnouncements.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-rose-500" />
                Circulars & Announcements
              </p>
              <div className="space-y-1.5">
                {filteredAnnouncements.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => handleSelect('announcements')}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {a.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {a.department} • {a.date}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lost & Found if matching */}
          {filteredLost.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                Lost & Found Items
              </p>
              <div className="space-y-1.5">
                {filteredLost.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => handleSelect('lost_found')}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {l.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{l.location}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {l.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredTasks.length === 0 &&
            filteredEvents.length === 0 &&
            filteredAnnouncements.length === 0 &&
            filteredLost.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm">No campus items found for "{query}".</p>
                <p className="text-xs mt-1">Try searching for "Mechanics", "Hackathon", or "Library".</p>
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Navigate with click or touch</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
