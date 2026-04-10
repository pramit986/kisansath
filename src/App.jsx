import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import OnboardingPage from './pages/Onboarding';
import HomePage from './pages/Home';
import CropDoctorPage from './pages/CropDoctor';
import CalculatorPage from './pages/Calculator';
import CalendarPage from './pages/Calendar';
import MandiPricesPage from './pages/MandiPrices';
import SettingsDrawer from './pages/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const saved = localStorage.getItem('kisansathi_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
    setIsLoading(false);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOnboardingComplete = (newProfile) => {
    localStorage.setItem('kisansathi_profile', JSON.stringify(newProfile));
    setProfile(newProfile);
  };

  const handleProfileUpdate = (updated) => {
    localStorage.setItem('kisansathi_profile', JSON.stringify(updated));
    setProfile(updated);
  };

  const handleClearData = () => {
    localStorage.clear();
    setProfile(null);
    setShowSettings(false);
  };

  if (isLoading) {
    return (
      <div className="app-shell flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🌱</div>
          <p className="text-primary font-semibold">Loading KisanSathi...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="app-shell">
        <OnboardingPage onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage profile={profile} onOpenSettings={() => setShowSettings(true)} />;
      case 'doctor':
        return <CropDoctorPage profile={profile} />;
      case 'calculator':
        return <CalculatorPage profile={profile} />;
      case 'calendar':
        return <CalendarPage profile={profile} />;
      case 'prices':
        return <MandiPricesPage profile={profile} />;
      default:
        return <HomePage profile={profile} onOpenSettings={() => setShowSettings(true)} />;
    }
  };

  return (
    <div className="app-shell">
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ marginLeft: 240, minHeight: '100vh', background: '#F8F9FA' }}>
        {!isOnline && (
          <div className="offline-banner">
            <span>📡</span> No internet connection — showing cached data
          </div>
        )}
        {renderPage()}
      </main>
      {showSettings && (
        <SettingsDrawer
          profile={profile}
          onClose={() => setShowSettings(false)}
          onUpdate={handleProfileUpdate}
          onClearData={handleClearData}
        />
      )}
    </div>
  );
}
