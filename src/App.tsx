import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { QuickAddModal } from './components/QuickAddModal';
import { JudgeTourModal } from './components/JudgeTourModal';
import { ToastContainer } from './components/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { CampusEventsPage } from './pages/CampusEventsPage';
import { LostAndFoundPage } from './pages/LostAndFoundPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProductivityPage } from './pages/ProductivityPage';

const AppContent: React.FC = () => {
  const { currentPage, isAuthenticated } = useApp();

  // 1. Landing Page
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage />
        <GlobalSearchModal />
        <QuickAddModal />
        <JudgeTourModal />
        <ToastContainer />
      </>
    );
  }

  // 2. Authentication Page or Protected Route Redirect
  if (currentPage === 'auth' || !isAuthenticated) {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  // 3. Authenticated Dashboard Application Shell
  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Fixed Top Bar */}
      <Navbar />

      {/* Main Workspace Body */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Center Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto pb-24 md:pb-12 overflow-x-hidden">
          {currentPage === 'dashboard' && <DashboardOverview />}
          {currentPage === 'assistant' && <AiAssistantPage />}
          {currentPage === 'planner' && <StudyPlannerPage />}
          {currentPage === 'assignments' && <AssignmentsPage />}
          {currentPage === 'events' && <CampusEventsPage />}
          {currentPage === 'lost_found' && <LostAndFoundPage />}
          {currentPage === 'announcements' && <AnnouncementsPage />}
          {currentPage === 'productivity' && <ProductivityPage />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Interactive Modals & Toast System */}
      <GlobalSearchModal />
      <QuickAddModal />
      <JudgeTourModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
