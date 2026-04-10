import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import OnboardingPage from './pages/Onboarding';
import HomePage from './pages/Home';
import CropDoctorPage from './pages/CropDoctor';
import CalculatorPage from './pages/Calculator';
import CalendarPage from './pages/Calendar';
import MandiPricesPage from './pages/MandiPrices';
import AuthPage from './pages/Auth';
import SettingsDrawer from './pages/Settings';
import axios from 'axios';
import { Leaf } from 'lucide-react';

const PROFILE_API = 'http://127.0.0.1:5000/api/profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('kisansathi_token');
      const userId = localStorage.getItem('kisansathi_userId');
      const username = localStorage.getItem('kisansathi_username');

      if (token && userId) {
        setUser({ token, userId, username });
        try {
          // Fetch profile for this specific user
          const { data } = await axios.get(`${PROFILE_API}/user/${userId}`);
          setProfile(data);
        } catch (err) {
          console.log("No profile found for user yet.");
          setProfile(null);
        }
      }
      setIsLoading(false);
    };
    initAuth();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLoginSuccess = async (authData) => {
    setUser({
      token: authData.token,
      userId: authData.userId,
      username: authData.username
    });
    
    // Check if user already has a profile in DB
    try {
      const { data } = await axios.get(`${PROFILE_API}/user/${authData.userId}`);
      setProfile(data);
    } catch (err) {
      setProfile(null);
    }
  };

  const handleProfileUpdate = async (profileUpdateData) => {
    try {
      // Tie profile to user
      const payload = { ...profileUpdateData, userId: user.userId };
      const { data } = await axios.post(PROFILE_API, payload);
      setProfile(data);
      return data;
    } catch (err) {
      console.error("Error saving profile", err);
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setProfile(null);
    setShowSettings(false);
  };

  if (isLoading) {
    return (
      <div className="app-shell flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto flex items-center justify-center mb-4 animate-bounce">
            <Leaf size={32} className="text-white" />
          </div>
          <p className="text-green-800 font-bold text-lg">KisanSathi</p>
          <p className="text-gray-400 text-sm">Preparing your fields...</p>
        </div>
      </div>
    );
  }

  // Phase 1: Not Logged In
  if (!user) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Phase 2: Logged In (Show Dashboard Shell)
  const renderPage = () => {
    if (!profile) {
       // If no profile, we stay on Home but show the Onboarding prompt later
       return <HomePage profile={null} onOpenSettings={() => setShowSettings(true)} />;
    }

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
      <main className="page-container">
        {!isOnline && (
          <div className="offline-banner">
            <span>📡</span> No internet connection — showing cached data
          </div>
        )}
        <div className="page-inner">
          {renderPage()}
        </div>
      </main>
      {showSettings && (
        <SettingsDrawer
          profile={profile}
          onClose={() => setShowSettings(false)}
          onUpdate={handleProfileUpdate}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

