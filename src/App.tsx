import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import { Login, Signup } from './pages/Auth';
import { DashboardLayout } from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import PortfolioPage from './pages/Portfolio';
import { SignalsPage, MarketPage, AcademyPage, SettingsPage, AboutPage } from './pages/SubPages';
import { TermsPage, PrivacyPage, NotFoundPage } from './pages/Legal';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/Primitives';

// Wrapper to handle loading screen on initial load only
function AppContent() {
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show loading screen on initial app load, not on route changes
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hasLoaded]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // Don't show loading on auth pages or dashboard - only on landing
  const showLoading = loading && !hasLoaded && location.pathname === '/';

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={showLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/signals" element={<SignalsPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <CustomCursor />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="noise-overlay">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}
