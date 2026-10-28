import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckSquare,
  Search,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Priority, ItemType, ItemCategory } from '../types';

export const QuickAddModal: React.FC = () => {
  const {
    isQuickAddOpen,
    setIsQuickAddOpen,
    addTask,
    addLostFoundItem,
    startTimer,
    setCurrentPage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'task' | 'lostfound' | 'timer'>('task');

  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('Computer Science');
  const [taskDueDate, setTaskDueDate] = useState('Tomorrow');
  const [taskPriority, setTaskPriority] = useState<Priority>('high');
  const [taskMinutes, setTaskMinutes] = useState(45);

  // Lost & Found form state
  const [lfTitle, setLfTitle] = useState('');
  const [lfType, setLfType] = useState<ItemType>('lost');
  const [lfCategory, setLfCategory] = useState<ItemCategory>('Electronics');
  const [lfLocation, setLfLocation] = useState('Central Library');
  const [lfContact, setLfContact] = useState('aarav.sharma@apex.edu');

  if (!isQuickAddOpen) return null;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask({
      title: taskTitle.trim(),
      subject: taskSubject,
      subjectCode: taskSubject.slice(0, 3).toUpperCase() + '200',
      dueDate: taskDueDate,
      priority: taskPriority,
      status: 'pending',
      progress: 0,
      estimatedMinutes: Number(taskMinutes),
      tags: ['New Task'],
      subtasks: [
        { id: `st-${Date.now()}-1`, title: 'Review lecture notes & requirements', completed: false },
        { id: `st-${Date.now()}-2`, title: 'Draft and complete deliverable', completed: false },
      ],
      aiTip: 'AI Tip: Tackle this in 2 Pomodoro sprints.',
    });

    setTaskTitle('');
    setIsQuickAddOpen(false);
  };

  const handleReportLostFound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lfTitle.trim()) return;

    addLostFoundItem({
      title: lfTitle.trim(),
      type: lfType,
      category: lfCategory,
      location: lfLocation,
      dateReported: 'Just now',
      finderOrOwner: lfType === 'lost' ? 'Aarav Sharma (You)' : 'Helpful Student',
      contact: lfContact,
      status: 'open',
      description: `Reported via Quick Actions on CampusMate AI.`,
    });

    setLfTitle('');
    setIsQuickAddOpen(false);
    setCurrentPage('lost_found');
  };

  const handleStartTimer = (mins: number) => {
    startTimer(mins, 'Focused Deep Study');
    setIsQuickAddOpen(false);
    setCurrentPage('planner');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Quick Action Hub</h3>
          </div>
          <button
            onClick={() => setIsQuickAddOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('task')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'task'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            New Assignment
          </button>
          <button
            onClick={() => setActiveTab('lostfound')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'lostfound'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Lost & Found
          </button>
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'timer'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Study Sprint
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === 'task' && (
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g., Finite Element Lab Report"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as Priority)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Est. Minutes
                  </label>
                  <input
                    type="number"
                    value={taskMinutes}
                    onChange={(e) => setTaskMinutes(Number(e.target.value))}
                    min={15}
                    step={15}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/20 mt-2"
              >
                Add Assignment to Schedule
              </button>
            </form>
          )}

          {activeTab === 'lostfound' && (
            <form onSubmit={handleReportLostFound} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Item Name / Description
                </label>
                <input
                  type="text"
                  required
                  value={lfTitle}
                  onChange={(e) => setLfTitle(e.target.value)}
                  placeholder="e.g., Apple Pencil (2nd Gen) with engraved initials"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Report Type
                  </label>
                  <select
                    value={lfType}
                    onChange={(e) => setLfType(e.target.value as ItemType)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="lost">I Lost an Item</option>
                    <option value="found">I Found an Item</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={lfCategory}
                    onChange={(e) => setLfCategory(e.target.value as ItemCategory)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="ID Cards">ID Cards</option>
                    <option value="Books & Notes">Books & Notes</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Campus Location
                </label>
                <input
                  type="text"
                  value={lfLocation}
                  onChange={(e) => setLfLocation(e.target.value)}
                  placeholder="e.g., Innovation Hub Lab 3 desk #10"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Info
                </label>
                <input
                  type="text"
                  value={lfContact}
                  onChange={(e) => setLfContact(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/20 mt-2"
              >
                Publish to Campus Board
              </button>
            </form>
          )}

          {activeTab === 'timer' && (
            <div className="space-y-4 text-center py-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a proven focus interval to power through your next study milestone:
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleStartTimer(25)}
                  className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200 dark:border-indigo-800 text-center transition-all group"
                >
                  <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    25m
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    Pomodoro Standard
                  </span>
                </button>
                <button
                  onClick={() => handleStartTimer(45)}
                  className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/80 border border-purple-200 dark:border-purple-800 text-center transition-all group"
                >
                  <span className="block text-2xl font-black text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    45m
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    Deep Focus Sprint
                  </span>
                </button>
                <button
                  onClick={() => handleStartTimer(60)}
                  className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 border border-blue-200 dark:border-blue-800 text-center transition-all group"
                >
                  <span className="block text-2xl font-black text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    60m
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    Exam Prep Block
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
