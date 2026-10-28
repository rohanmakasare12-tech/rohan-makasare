import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Loader2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { AuthMode } from '../types';

export const AuthPage: React.FC = () => {
  const {
    authMode,
    setAuthMode,
    login,
    signup,
    resetPassword,
    quickDemoLogin,
    setCurrentPage,
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('aarav.sharma@apex.edu');
  const [loginPassword, setLoginPassword] = useState('campusmate2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupCollege, setSignupCollege] = useState('');
  const [signupBranch, setSignupBranch] = useState('');
  const [signupYear, setSignupYear] = useState('3rd Year');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Validation & Loading states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Email format regex validator
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const newErrors: Record<string, string> = {};

    if (!loginEmail.trim()) {
      newErrors.loginEmail = 'Email address is required.';
    } else if (!isValidEmail(loginEmail)) {
      newErrors.loginEmail = 'Please enter a valid college email.';
    }

    if (!loginPassword) {
      newErrors.loginPassword = 'Password is required.';
    } else if (loginPassword.length < 8) {
      newErrors.loginPassword = 'Password must contain at least 8 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await login(loginEmail, loginPassword, rememberMe);
      if (!res.success && res.error) {
        setGeneralError(res.error);
      }
    } catch (err) {
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const newErrors: Record<string, string> = {};

    if (!signupName.trim()) newErrors.signupName = 'Full name is required.';
    if (!signupEmail.trim()) {
      newErrors.signupEmail = 'College email is required.';
    } else if (!isValidEmail(signupEmail)) {
      newErrors.signupEmail = 'Please enter a valid college email.';
    }

    if (!signupPassword) {
      newErrors.signupPassword = 'Password is required.';
    } else if (signupPassword.length < 8) {
      newErrors.signupPassword = 'Password must contain at least 8 characters.';
    }

    if (signupPassword !== signupConfirmPassword) {
      newErrors.signupConfirmPassword = 'Passwords do not match.';
    }

    if (!signupCollege.trim()) newErrors.signupCollege = 'College name is required.';
    if (!signupBranch.trim()) newErrors.signupBranch = 'Course / Branch is required.';
    if (!agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms & Privacy Policy.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        collegeName: signupCollege,
        courseBranch: signupBranch,
        year: signupYear,
      });

      if (!res.success && res.error) {
        setGeneralError(res.error);
      }
    } catch (err) {
      setGeneralError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const newErrors: Record<string, string> = {};

    if (!forgotEmail.trim()) {
      newErrors.forgotEmail = 'Email address is required.';
    } else if (!isValidEmail(forgotEmail)) {
      newErrors.forgotEmail = 'Please enter a valid college email.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await resetPassword(forgotEmail);
      setForgotSuccess(true);
    } catch (err) {
      setGeneralError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Simple Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('landing')}
          className="flex items-center gap-2 group text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing Page</span>
        </button>

        <span className="text-[11px] font-medium text-slate-400 hidden sm:inline-block">
          PromptWars × KickToTech 2026 • Education & Student Life Track
        </span>
      </div>

      {/* Main Authentication Section: 2-Column Desktop Grid */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT SIDE — BRANDING & VALUE PROPOSITION */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 pr-6 relative">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 right-0 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Logo */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
                  CampusMate <span className="text-indigo-600 dark:text-indigo-400">AI</span>
                </h1>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  "Your Campus. Your Studies. One Intelligent Companion."
                </p>
              </div>
            </div>

            {/* Headline & Subheading */}
            <div className="space-y-3 relative z-10">
              <h2 className="text-3xl xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Welcome back, Student 👋
              </h2>
              <p className="text-sm xl:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                Manage your studies, assignments, events and campus life — all in one intelligent place.
              </p>
            </div>

            {/* 3 Feature Highlights */}
            <div className="space-y-3 relative z-10 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-sm">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  AI-powered study planning & spaced-repetition schedules
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-sm">
                <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Smart assignment management with automated milestone breakdowns
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-sm">
                <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Personalized "What's Next?" campus recommendations
                </span>
              </div>
            </div>

            {/* Floating Judge Test Callout */}
            <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                  Hackathon Judge Demonstration
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Quick-load pre-configured engineering student profile.
                </span>
              </div>
              <button
                type="button"
                onClick={quickDemoLogin}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0 hover:scale-105"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>1-Click Login</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE — AUTHENTICATION CARD (LOGIN / SIGN UP / FORGOT PASSWORD) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none animate-slide-up relative">
              {/* General error alert */}
              {generalError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{generalError}</span>
                </div>
              )}

              {/* -------------------- 1. LOGIN VIEW -------------------- */}
              {authMode === 'login' && (
                <div>
                  <div className="text-center sm:text-left mb-6">
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-base text-slate-900 dark:text-white">
                        CampusMate AI
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Welcome Back
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Sign in to continue to CampusMate AI
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                            if (errors.loginEmail) setErrors((prev) => ({ ...prev, loginEmail: '' }));
                          }}
                          placeholder="Enter your college email"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.loginEmail
                              ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20'
                              : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20'
                          }`}
                        />
                      </div>
                      {errors.loginEmail && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.loginEmail}</p>
                      )}
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            if (errors.loginPassword) setErrors((prev) => ({ ...prev, loginPassword: '' }));
                          }}
                          placeholder="Enter your password"
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.loginPassword
                              ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20'
                              : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.loginPassword && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.loginPassword}</p>
                      )}
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>Remember me</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setGeneralError(null);
                          setErrors({});
                          setAuthMode('forgot_password');
                        }}
                        className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Primary Sign In Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span className="bg-white dark:bg-slate-900 px-3">OR</span>
                    </div>
                  </div>

                  {/* Social Logins */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={quickDemoLogin}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-2.5 shadow-2xs"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={quickDemoLogin}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-2.5 shadow-2xs"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 23 23">
                        <path fill="#f35325" d="M1 1h10v10H1z" />
                        <path fill="#81bc06" d="M12 1h10v10H12z" />
                        <path fill="#05a6f0" d="M1 12h10v10H1z" />
                        <path fill="#ffba08" d="M12 12h10v10H12z" />
                      </svg>
                      <span>Continue with Microsoft</span>
                    </button>
                  </div>

                  {/* Switch to Sign Up */}
                  <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    <span>Don't have an account? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setGeneralError(null);
                        setErrors({});
                        setAuthMode('signup');
                      }}
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}

              {/* -------------------- 2. SIGN UP VIEW -------------------- */}
              {authMode === 'signup' && (
                <div>
                  <div className="text-center sm:text-left mb-5">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Create your CampusMate account
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Join thousands of students organizing their academic life
                    </p>
                  </div>

                  <form onSubmit={handleSignupSubmit} className="space-y-3">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g., Aarav Sharma"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                      {errors.signupName && (
                        <p className="text-[10px] text-rose-500 mt-0.5">{errors.signupName}</p>
                      )}
                    </div>

                    {/* College Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                        College Email
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="e.g., student@apex.edu"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      </div>
                      {errors.signupEmail && (
                        <p className="text-[10px] text-rose-500 mt-0.5">{errors.signupEmail}</p>
                      )}
                    </div>

                    {/* Password & Confirm Password Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showSignupPassword ? 'text' : 'password'}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="Min. 8 chars"
                            className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                          >
                            {showSignupPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {errors.signupPassword && (
                          <p className="text-[10px] text-rose-500 mt-0.5">{errors.signupPassword}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showSignupConfirmPassword ? 'text' : 'password'}
                            value={signupConfirmPassword}
                            onChange={(e) => setSignupConfirmPassword(e.target.value)}
                            placeholder="Re-enter"
                            className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                          >
                            {showSignupConfirmPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        {errors.signupConfirmPassword && (
                          <p className="text-[10px] text-rose-500 mt-0.5">{errors.signupConfirmPassword}</p>
                        )}
                      </div>
                    </div>

                    {/* College Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                        College Name
                      </label>
                      <input
                        type="text"
                        value={signupCollege}
                        onChange={(e) => setSignupCollege(e.target.value)}
                        placeholder="e.g., Apex Institute of Technology"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                      />
                      {errors.signupCollege && (
                        <p className="text-[10px] text-rose-500 mt-0.5">{errors.signupCollege}</p>
                      )}
                    </div>

                    {/* Course / Branch & Year */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                          Course / Branch
                        </label>
                        <input
                          type="text"
                          value={signupBranch}
                          onChange={(e) => setSignupBranch(e.target.value)}
                          placeholder="e.g., CS & AI"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                        />
                        {errors.signupBranch && (
                          <p className="text-[10px] text-rose-500 mt-0.5">{errors.signupBranch}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                          Year
                        </label>
                        <select
                          value={signupYear}
                          onChange={(e) => setSignupYear(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="Final Year">Final Year</option>
                        </select>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600 dark:text-slate-400 select-none">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 mt-0.5 cursor-pointer shrink-0"
                        />
                        <span>I agree to the Terms & Privacy Policy</span>
                      </label>
                      {errors.agreeTerms && (
                        <p className="text-[10px] text-rose-500 mt-0.5">{errors.agreeTerms}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Switch to Login */}
                  <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                    <span>Already have an account? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setGeneralError(null);
                        setErrors({});
                        setAuthMode('login');
                      }}
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}

              {/* -------------------- 3. FORGOT PASSWORD VIEW -------------------- */}
              {authMode === 'forgot_password' && (
                <div>
                  <div className="text-center sm:text-left mb-6">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Reset your password
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Enter your college email address and we'll send you a password reset link.
                    </p>
                  </div>

                  {forgotSuccess ? (
                    <div className="space-y-4 py-2 animate-fade-in">
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold">Reset Email Sent!</strong>
                          <span>
                            If an account exists with this email, we've sent password reset instructions.
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setForgotSuccess(false);
                          setAuthMode('login');
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Login</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="e.g., student@apex.edu"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                        </div>
                        {errors.forgotEmail && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.forgotEmail}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Reset Link...</span>
                          </>
                        ) : (
                          <span>Send Reset Link</span>
                        )}
                      </button>

                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setGeneralError(null);
                            setErrors({});
                            setAuthMode('login');
                          }}
                          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-1 mx-auto"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back to Login</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="py-4 text-center text-xs text-slate-400">
        <span>© 2026 CampusMate AI. Built for PromptWars × KickToTech 2026.</span>
      </div>
    </div>
  );
};
