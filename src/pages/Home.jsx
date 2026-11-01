import React, { useState, useEffect } from 'react';
import { Settings, RefreshCw, Droplets, Wind, Eye, ArrowRight } from 'lucide-react';
import { getDailyTip } from '../data/farmingTips';
import { SkeletonCard, SkeletonText } from '../components/SkeletonCard';
import VoiceNavigator from '../components/VoiceNavigator';
import { useTranslation } from 'react-i18next';

const getWeatherEmoji = (desc) => {
  if (!desc) return '⛅';
  const d = desc.toLowerCase();
  if (d.includes('sunny') || d.includes('clear')) return '☀️';
  if (d.includes('partly')) return '⛅';
  if (d.includes('cloud')) return '☁️';
  if (d.includes('rain') || d.includes('drizzle')) return '🌧️';
  if (d.includes('thunder') || d.includes('storm')) return '⛈️';
  if (d.includes('fog') || d.includes('mist')) return '🌫️';
  if (d.includes('haze')) return '😶‍🌫️';
  if (d.includes('snow')) return '🌨️';
  if (d.includes('wind')) return '💨';
  return '⛅';
};

const getFarmingAlert = (weather) => {
  if (!weather) return { message: '✅ Good conditions for farming today', color: '#22c55e', bg: '#F0FDF4' };
  const { rainChance = 0, temp = 25, windKmph = 10 } = weather;
  if (rainChance > 50) return { message: '🌧️ Rain expected — Skip irrigation today & protect harvested grain', color: '#3B82F6', bg: '#EFF6FF' };
  if (temp > 35) return { message: '☀️ Very hot — Water crops in evening to reduce evaporation', color: '#F59E0B', bg: '#FFFBEB' };
  if (windKmph > 20) return { message: '💨 High winds — Avoid spraying pesticides or fertilizers today', color: '#6366F1', bg: '#EEF2FF' };
  return { message: '✅ Good conditions for farming today', color: '#22c55e', bg: '#F0FDF4' };
};

const getDaysToHarvest = (crop, sowingDate) => {
  const harvestDays = {
    Rice: 120, Wheat: 150, Cotton: 180, Sugarcane: 365,
    Vegetables: 90, Soybean: 100, Maize: 110,
  };
  const total = harvestDays[crop] || 120;
  const sown = new Date(sowingDate || Date.now() - 60 * 24 * 60 * 60 * 1000);
  const harvest = new Date(sown.getTime() + total * 24 * 60 * 60 * 1000);
  const remaining = Math.round((harvest - Date.now()) / (1000 * 60 * 60 * 24));
  return Math.max(0, remaining);
};

const getDailyWater = (crop, acres) => {
  const waterPerAcre = {
    Rice: 4800, Wheat: 1200, Cotton: 1800, Sugarcane: 3500,
    Vegetables: 1800, Soybean: 1200, Maize: 1500,
  };
  return Math.round((waterPerAcre[crop] || 1500) * (acres || 1)).toLocaleString('en-IN');
};

const getWeatherScore = (weather) => {
  if (!weather) return 7;
  const { temp, rainChance = 0, windKmph = 10 } = weather;
  let score = 8;
  if (rainChance > 70) score -= 2;
  if (rainChance > 30) score -= 1;
  if (temp > 38) score -= 2;
  if (temp > 33) score -= 1;
  if (temp < 10) score -= 2;
  if (windKmph > 25) score -= 1;
  return Math.max(1, Math.min(10, score));
};

export default function HomePage({ profile, onOpenSettings, onNavigate }) {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const tip = profile ? getDailyTip(profile.crop) : t('home.connectCrops');

  const fetchWeather = React.useCallback(async () => {
    setWeatherLoading(true);
    setWeatherError(false);
    try {
      const city = encodeURIComponent(profile?.village || 'New Delhi');
      const res = await fetch(`https://wttr.in/${city}?format=j1`);
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();
      const current = data.current_condition?.[0];
      const hourly = data.weather?.[0]?.hourly?.[4];
      setWeather({
        temp: parseInt(current?.temp_C || 25),
        feelsLike: parseInt(current?.FeelsLikeC || 23),
        desc: current?.weatherDesc?.[0]?.value || 'Partly Cloudy',
        humidity: parseInt(current?.humidity || 60),
        windKmph: parseInt(current?.windspeedKmph || 10),
        visibility: parseInt(current?.visibility || 10),
        rainChance: parseInt(hourly?.chanceofrain || hourly?.chanceOfRain || 20),
        uvIndex: parseInt(current?.uvIndex || 5),
      });
    } catch {
      setWeather({ temp: 28, desc: 'Partly Cloudy', humidity: 65, windKmph: 12, rainChance: 20, visibility: 10 });
      setWeatherError(true);
    } finally {
      setWeatherLoading(false);
      setIsRefreshing(false);
    }
  }, [profile?.village]);

  useEffect(() => {
    const q = JSON.parse(localStorage.getItem('kisansathi_recent_questions') || '[]');
    setRecentQuestions(q.slice(0, 3));
    fetchWeather();
  }, [profile, fetchWeather]); // Refresh when profile is set

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchWeather();
  };

  const alert = getFarmingAlert(weather);
  const daysToHarvest = profile ? getDaysToHarvest(profile.crop, profile.sowingDate) : "-";
  const weatherScore = getWeatherScore(weather);
  const userName = localStorage.getItem('kisansathi_username') || 'Farmer';

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Top Header Bar */}
      <div
        className="px-8 py-10 flex items-center justify-between relative overflow-hidden rounded-b-[40px] mb-8"
        style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)' }}
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10" style={{ background: '#74C69D' }} />
        <div className="absolute top-0 right-32 w-24 h-24 rounded-full opacity-10" style={{ background: '#F4A261' }} />
        <div className="relative">
          <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-2">{dateStr}</p>
          <h1 className="text-white text-4xl font-black tracking-tight">
            {t('home.welcome', { name: userName })}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            {profile ? (
              <>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-green-50 backdrop-blur-md border border-white/10">
                  🌱 {profile.crop}
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-amber-50 backdrop-blur-md border border-white/10">
                  📍 {profile.village}
                </span>
              </>
            ) : (
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-200 backdrop-blur-md border border-amber-500/30">
                {t('home.accountIncomplete')}
              </span>
            )}
          </div>
        </div>
        <button
          id="settings-btn"
          onClick={onOpenSettings}
          className="relative z-10 w-14 h-14 rounded-3xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
        >
          <Settings size={28} className="text-white" />
          {!profile && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-green-800 animate-pulse" />}
        </button>
      </div>

      <div className="max-w-[1240px] mx-auto">
        {/* Profile Completion Prompt */}
        {!profile && (
          <div className="card mb-8 p-0 overflow-hidden border-2 border-amber-100 bg-amber-50/30 animate-fade-in">
            <div className="flex items-stretch">
              <div className="bg-amber-100 p-8 flex items-center justify-center">
                <span className="text-5xl">🚜</span>
              </div>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-2 mb-2 text-amber-700">
                  <span className="font-black uppercase tracking-tighter text-sm">{t('home.actionRequired')}</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">{t('home.completeProfile')}</h2>
                <p className="text-gray-600 font-medium mb-6 max-w-xl">
                  {t('home.connectCrops')}
                </p>
                <button
                  onClick={onOpenSettings}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-amber-200 inline-flex items-center gap-2"
                >
                  {t('home.setupFarm')} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-8 animate-slide-up">
          <StatCard id="stat-harvest" emoji="🌾" label={t('home.daysToHarvest')} value={daysToHarvest} unit={t('home.days')} color="#2D6A4F" bg="#F0FDF4" />
          <StatCard id="stat-water" emoji="💧" label={t('home.todaysWater')} value={profile ? getDailyWater(profile.crop, profile.acres) : "-"} unit={t('home.litres')} color="#3B82F6" bg="#EFF6FF" />
          <StatCard id="stat-fertilizer" emoji="🌿" label={t('home.fertilizerDue')} value={profile ? (daysToHarvest % 14 < 3 ? 'Today' : `${14 - (daysToHarvest % 14)} ${t('home.days')}`) : "-"} unit="" color="#F59E0B" bg="#FFFBEB" />
          <StatCard id="stat-weather-score" emoji="⭐" label={t('home.weatherScore')} value={`${weatherScore}/10`} unit="" color="#8B5CF6" bg="#F5F3FF" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left column - wider */}
          <div className="col-span-2 space-y-6">
            {/* Weather Card */}
            <div className="card animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-text-primary text-lg">{t('home.liveWeather', { village: profile?.village || t('home.locationNotSet') })}</h2>
                <button id="refresh-weather" onClick={handleRefresh} disabled={!profile} className="p-2 rounded-xl flex items-center gap-2 text-sm font-medium" style={{ background: '#F0FDF4', color: '#2D6A4F', opacity: !profile ? 0.5 : 1 }}>
                  <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                  {t('home.refresh')}
                </button>
              </div>

              {weatherLoading ? (
                <div className="space-y-3">
                  <SkeletonCard height={80} />
                  <SkeletonText width="50%" />
                </div>
              ) : (
                <div className="flex items-start gap-8">
                  <div className="flex items-end gap-3">
                    <span className="text-6xl">{getWeatherEmoji(weather?.desc)}</span>
                    <div>
                      <div className="text-5xl font-extrabold text-text-primary">{weather?.temp}°C</div>
                      <div className="text-text-secondary text-base mt-1">{weather?.desc}</div>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <WeatherStat icon={<Droplets size={16} style={{ color: '#3B82F6' }} />} label={t('home.humidity')} value={`${weather?.humidity}%`} />
                    <WeatherStat icon={<Wind size={16} style={{ color: '#6B7280' }} />} label={t('home.wind')} value={`${weather?.windKmph} km/h`} />
                    <WeatherStat icon={<Eye size={16} style={{ color: '#8B5CF6' }} />} label={t('home.visibility')} value={`${weather?.visibility} km`} />
                    <WeatherStat icon={<span style={{ fontSize: 16 }}>🌧️</span>} label={t('home.rainChance')} value={`${weather?.rainChance}%`} />
                  </div>

                  <div className="flex-1 px-4 py-3 rounded-2xl flex items-center gap-2" style={{ background: alert.bg }}>
                    <p className="text-sm font-semibold leading-relaxed" style={{ color: alert.color }}>{alert.message}</p>
                  </div>
                </div>
              )}
              {weatherError && <p className="text-xs text-text-secondary mt-2 text-center">⚠️ Using estimated weather data</p>}
            </div>

            {/* Farm Summary */}
            <div className="card animate-slide-up">
              <h3 className="font-bold text-text-primary text-lg mb-4">{t('home.farmOverview')}</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: t('home.crop'), value: profile?.crop || t('home.notSet'), emoji: '🌱', desc: t('home.crop') },
                  { label: t('home.totalArea'), value: profile?.acres ? `${profile.acres} acres` : t('home.notSet'), emoji: '📐', desc: t('home.totalArea') },
                  { label: t('home.soilType'), value: profile?.soilType ? `${profile.soilType} Soil` : t('home.notSet'), emoji: '🌍', desc: t('home.soilType') },
                ].map(({ label, value, emoji, desc }) => (
                  <div key={label} className="p-4 rounded-2xl text-center" style={{ background: '#F8F9FA' }}>
                    <div className="text-3xl mb-2">{emoji}</div>
                    <div className="text-xs text-text-secondary mb-1">{desc}</div>
                    <div className="text-base font-bold text-text-primary">{value}</div>
                  </div>
                ))}
              </div>
              {profile?.challenges && profile.challenges.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-text-secondary font-semibold mb-2 uppercase tracking-wide">Focus Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.challenges.map((c) => (
                      <span key={c} className="badge badge-yellow capitalize">{c.replace('_', ' ')}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Today's Tip */}
            <div
              className="p-5 rounded-2xl relative overflow-hidden animate-slide-up"
              style={{ background: 'linear-gradient(135deg, #2D6A4F, #40916C)' }}
            >
              <div className="absolute -bottom-4 -right-4 text-7xl opacity-20">💡</div>
              <div className="relative">
                <p className="text-green-200 text-xs font-semibold uppercase tracking-wider mb-2">💡 Today's Tip</p>
                <p className="text-white text-sm font-medium leading-relaxed">{tip}</p>
              </div>
            </div>

            {/* Recent Questions */}
            {recentQuestions.length > 0 && (
              <div className="card animate-slide-up">
                <h3 className="font-bold text-text-primary mb-3">Recent from Crop Doctor 🌿</h3>
                <div className="space-y-2">
                  {recentQuestions.map((q, i) => (
                    <div key={i} className="tag w-full block text-left text-sm p-3">
                      {q.length > 55 ? q.substring(0, 55) + '...' : q}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="card animate-slide-up">
              <h3 className="font-bold text-text-primary mb-3">{t('home.quickActions')}</h3>
              <div className="space-y-2">
                {[
                  { emoji: '🌿', label: t('home.askDoctor'), sub: t('home.askDoctorSub') },
                  { emoji: '📊', label: t('home.calculate'), sub: t('home.calculateSub') },
                  { emoji: '📅', label: t('home.calendar'), sub: t('home.calendarSub') },
                  { emoji: '💰', label: t('home.mandiPrices'), sub: t('home.mandiPricesSub') },
                ].map(({ emoji, label, sub }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all card-hover" style={{ background: '#F8F9FA' }}>
                    <span className="text-xl">{emoji}</span>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">{label}</div>
                      <div className="text-xs text-text-secondary">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {onNavigate && <VoiceNavigator onNavigate={onNavigate} />}
    </div>
  );
}

function WeatherStat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#F8F9FA' }}>
      {icon}
      <div>
        <div className="text-xs text-text-secondary">{label}</div>
        <div className="text-sm font-bold text-text-primary">{value}</div>
      </div>
    </div>
  );
}

function StatCard({ id, emoji, label, value, unit, color }) {
  return (
    <div id={id} className="card card-hover animate-count-up p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{emoji}</span>
        <div className="w-2 h-2 rounded-full mt-1" style={{ background: color }} />
      </div>
      <div className="text-2xl font-extrabold mb-0.5" style={{ color }}>{value}</div>
      {unit && <div className="text-xs text-text-secondary">{unit}</div>}
      <div className="text-sm text-text-secondary mt-1 font-medium">{label}</div>
    </div>
  );
}
