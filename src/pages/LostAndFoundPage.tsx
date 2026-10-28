import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Plus,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
} from 'lucide-react';
import { LostAndFoundItem } from '../types';

export const LostAndFoundPage: React.FC = () => {
  const {
    lostAndFound,
    markItemClaimed,
    setIsQuickAddOpen,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContactItem, setSelectedContactItem] = useState<LostAndFoundItem | null>(null);

  const filteredItems = lostAndFound.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesQuery =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Search className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Campus Lost & Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Centralized digital board to recover lost ID cards, calculators, chargers, and notebooks.
          </p>
        </div>

        <button
          onClick={() => setIsQuickAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Report Lost or Found Item</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Items ({lostAndFound.length})
          </button>
          <button
            onClick={() => setActiveTab('lost')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'lost'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Lost ({lostAndFound.filter((i) => i.type === 'lost').length})
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'found'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Found ({lostAndFound.filter((i) => i.type === 'found').length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items or places..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Lost & Found Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const isLost = item.type === 'lost';
          const isClaimed = item.status === 'claimed';
          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between ${
                isClaimed
                  ? 'border-slate-200/60 dark:border-slate-800 opacity-70'
                  : isLost
                  ? 'border-rose-200/80 dark:border-rose-900/40 shadow-xs'
                  : 'border-emerald-200/80 dark:border-emerald-900/40 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isLost
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {isLost ? '🔴 Lost Item' : '🟢 Found Item'}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.badge && (
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                    📍 {item.badge}
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Reported: {item.dateReported}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedContactItem(item)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Contact Info
                </button>

                {!isClaimed ? (
                  <button
                    onClick={() => markItemClaimed(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400">
                    Resolved & Returned
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Details Modal */}
      {selectedContactItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Contact Reporter
              </h3>
              <button
                onClick={() => setSelectedContactItem(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p>
                <strong>Item:</strong> {selectedContactItem.title}
              </p>
              <p>
                <strong>Reported By:</strong> {selectedContactItem.finderOrOwner}
              </p>
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                <span className="font-semibold block text-indigo-900 dark:text-indigo-200 mb-1">
                  Verified Contact Details:
                </span>
                <span className="font-mono text-xs text-indigo-700 dark:text-indigo-300">
                  {selectedContactItem.contact}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Please have your Student ID ready when collecting or handing over lost property.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setSelectedContactItem(null);
                  showToast('Contact info copied to clipboard!', undefined, 'info');
                }}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
