import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Trash2,
  Key,
  Check,
  Calendar,
  Clock,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const AiAssistantPage: React.FC = () => {
  const {
    chatMessages,
    isAiTyping,
    sendChatMessage,
    clearChat,
    geminiApiKey,
    setGeminiApiKey,
    setCurrentPage,
    startTimer,
    showToast,
  } = useApp();

  const [input, setInput] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(geminiApiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Create a study plan for my exams',
    'What should I study today?',
    'Help me prioritize my assignments',
    'I have an exam in 5 days',
    'Find upcoming campus events',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiTyping) return;
    const msg = input.trim();
    setInput('');
    sendChatMessage(msg);
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  const handleActionClick = (action: any) => {
    if (action.actionType === 'start_pomodoro') {
      const minutes = action.payload?.minutes || 45;
      const subject = action.payload?.subject || 'Focused Study';
      startTimer(minutes, subject);
      setCurrentPage('planner');
    } else if (action.actionType === 'navigate') {
      setCurrentPage(action.payload?.page || 'assignments');
    } else if (action.actionType === 'send_prompt') {
      sendChatMessage(action.payload?.prompt);
    }
  };

  const handleSaveApiKey = () => {
    setGeminiApiKey(tempKey.trim());
    setShowKeyModal(false);
    showToast(
      tempKey.trim() ? 'Gemini API Key Saved' : 'Switched to Built-in Intelligence Engine',
      undefined,
      'info'
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] max-w-4xl mx-auto animate-fade-in">
      {/* Top Header Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                CampusMate AI
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Online & Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your personal academic and campus assistant.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyModal(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Configure Gemini API Key"
          >
            <Key className="w-4 h-4" />
          </button>
          <button
            onClick={clearChat}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-inner">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-slate-800 text-white dark:bg-slate-700'
                    : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-xs rounded-tr-none'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs rounded-tl-none space-y-2.5'
                }`}
              >
                {/* Render formatted message content */}
                <div
                  className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none break-words"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownToHtml(msg.content),
                  }}
                />

                {/* Suggested Action Pills inside bot bubble */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1 ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isAiTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-400 ml-1">CampusMate AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pills */}
      <div className="py-2.5 overflow-x-auto flex items-center gap-2 shrink-0 no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">
          Try asking:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(prompt)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all shrink-0 hover:border-indigo-300 shadow-xs"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about assignments, exams, or campus events..."
          className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <button
          type="submit"
          disabled={!input.trim() || isAiTyping}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-all shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Optional Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-500" />
              Configure Gemini API (Optional)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              CampusMate AI comes with built-in simulated campus intelligence. You can optionally paste a Google Gemini API Key here for live Gemini Flash generation.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gemini API Key
              </label>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Safe simple markdown parser helper
function formatMarkdownToHtml(markdown: string): string {
  let html = markdown
    // Headings
    .replace(/^### (.*$)/gim, '<h3 class="font-bold text-sm text-slate-900 dark:text-white mt-2 mb-1">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="font-bold text-xs text-slate-900 dark:text-white mt-1.5 mb-0.5">$1</h4>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Table rows simple format
    .replace(/\|(.*)\|/g, (match) => {
      if (match.includes(':---')) return '';
      const cells = match.split('|').filter(c => c.trim().length > 0);
      return `<div class="grid grid-cols-4 gap-2 py-1 border-b border-slate-100 dark:border-slate-800 text-[11px]">${cells.map(c => `<div>${c.trim()}</div>`).join('')}</div>`;
    })
    // Bullet points
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-xs my-0.5">$1</li>')
    // Line breaks
    .replace(/\n\n/g, '<div class="my-1.5"></div>')
    .replace(/\n/g, '<br/>');

  return html;
}
