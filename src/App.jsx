import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import OnboardingPage from './pages/Onboarding';
import HomePage from './pages/Home';
import CropDoctorPage from './pages/CropDoctor';
import CalculatorPage from './pages/Calculator';
import CalendarPage from './pages/Calendar';
import MandiPricesPage from './pages/MandiPrices';
import SettingsDrawer from './pages/Settings';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('kisansathi_userId');
      if (userId) {
        try {
          const { data } = await axios.get(`${API_URL}/${userId}`);
          setProfile(data);
        } catch (err) {
          console.error("Failed to load profile", err);
          localStorage.removeItem('kisansathi_userId');
        }
      }
      setIsLoading(false);
    };
    fetchProfile();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOnboardingComplete = async (newProfile) => {
    try {
      const { data } = await axios.post(API_URL, newProfile);
      localStorage.setItem('kisansathi_userId', data._id);
      setProfile(data);
    } catch (err) {
      console.error("Error creating profile", err);
      alert("Failed to save profile. Is the backend running?");
    }
  };

  const handleProfileUpdate = async (updated) => {
    try {
      const { data } = await axios.put(`${API_URL}/${profile._id}`, updated);
      setProfile(data);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const handleClearData = async () => {
    if (profile?._id) {
      try {
        await axios.delete(`${API_URL}/${profile._id}`);
      } catch (err) {
        console.error("Error deleting profile", err);
      }
    }
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
