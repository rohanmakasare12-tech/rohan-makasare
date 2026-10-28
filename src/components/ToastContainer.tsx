import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm transition-all duration-300 animate-slide-up backdrop-blur-md ${
              isSuccess
                ? 'bg-white/95 dark:bg-slate-900/95 border-emerald-500/30 text-slate-800 dark:text-slate-100 shadow-emerald-500/10'
                : isWarning
                ? 'bg-white/95 dark:bg-slate-900/95 border-amber-500/30 text-slate-800 dark:text-slate-100 shadow-amber-500/10'
                : 'bg-white/95 dark:bg-slate-900/95 border-indigo-500/30 text-slate-800 dark:text-slate-100 shadow-indigo-500/10'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-500" />}
              {!isSuccess && !isWarning && <Info className="w-5 h-5 text-indigo-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 dark:text-white leading-tight">{toast.title}</h4>
              {toast.message && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
