import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckSquare,
  Plus,
  Clock,
  Sparkles,
  CheckCircle2,
  List,
  Columns3,
  Trash2,
  AlertTriangle,
  Play,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Priority, TaskStatus } from '../types';

export const AssignmentsPage: React.FC = () => {
  const {
    tasks,
    toggleTaskStatus,
    toggleSubtask,
    aiBreakdownTask,
    deleteTask,
    setIsQuickAddOpen,
    startTimer,
    setCurrentPage,
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'high'>('all');
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({
    'task-1': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'in_progress') return t.status === 'in_progress';
    if (filter === 'completed') return t.status === 'completed';
    if (filter === 'high') return t.priority === 'high' && t.status !== 'completed';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Assignments & Coursework
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track problem sets, lab reports, coding projects, and exam submissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View mode toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <Columns3 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Assignments' },
          { id: 'high', label: '🚨 High Priority' },
          { id: 'pending', label: 'Pending' },
          { id: 'in_progress', label: 'In Progress' },
          { id: 'completed', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              filter === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isExpanded = !!expandedTasks[task.id];
            const isDone = task.status === 'completed';
            return (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                  isDone
                    ? 'border-slate-200/60 dark:border-slate-800 opacity-80'
                    : task.priority === 'high'
                    ? 'border-rose-200/80 dark:border-rose-900/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="mt-1 w-5 h-5 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 flex items-center justify-center transition-colors"
                      title="Toggle completion"
                    >
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm font-bold ${
                            isDone
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            task.priority === 'high'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {task.subject} ({task.subjectCode})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> Due {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Progress */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <div className="w-20 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-500 w-8 text-right">
                      {task.progress}%
                    </span>

                    {!isDone && (
                      <button
                        onClick={() => {
                          startTimer(task.estimatedMinutes, task.title);
                          setCurrentPage('planner');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" /> Focus
                      </button>
                    )}

                    <button
                      onClick={() => aiBreakdownTask(task.id)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold transition-colors flex items-center gap-1"
                      title="Ask AI to break into subtasks"
                    >
                      <Sparkles className="w-3 h-3" /> AI Breakdown
                    </button>

                    <button
                      onClick={() => toggleExpand(task.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subtasks Accordion */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {task.aiTip && (
                      <div className="p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{task.aiTip}</span>
                      </div>
                    )}

                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Subtasks ({task.subtasks.filter((st) => st.completed).length} /{' '}
                      {task.subtasks.length})
                    </span>

                    <div className="space-y-1.5 pl-2">
                      {task.subtasks.map((st) => (
                        <label
                          key={st.id}
                          className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={st.completed}
                            onChange={() => toggleSubtask(task.id, st.id)}
                            className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className={st.completed ? 'line-through text-slate-400' : ''}>
                            {st.title}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['pending', 'in_progress', 'completed'] as TaskStatus[]).map((status) => {
            const statusTasks = tasks.filter((t) => t.status === status);
            const statusLabel =
              status === 'pending'
                ? 'To Do'
                : status === 'in_progress'
                ? 'In Progress'
                : 'Completed';
            return (
              <div
                key={status}
                className="p-4 rounded-3xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {statusLabel}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {statusTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {statusTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                          {t.title}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            t.priority === 'high'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.subject} • Due {t.dueDate}
                      </p>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                        <button
                          onClick={() => toggleTaskStatus(t.id)}
                          className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {t.status === 'completed' ? 'Re-open' : 'Mark Done'}
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {t.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
