import React, { useState } from 'react';
import { X, ChevronRight, Trash2, Globe, Info, Edit3, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CROPS = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Vegetables', 'Soybean', 'Maize'];
const SOIL_TYPES = ['Red', 'Black', 'Alluvial', 'Sandy'];

export default function SettingsDrawer({ profile, onClose, onUpdate, onLogout }) {
  const { t, i18n } = useTranslation();
  const [isEditing, setIsEditing] = useState(!profile); // Auto-edit if profile missing
  const [editData, setEditData] = useState(profile || {
    name: '',
    village: '',
    state: '',
    crop: '',
    acres: 0,
    soilType: '',
    challenges: []
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    // Strict validation for vacancy
    if (!editData.name || !editData.village || !editData.state || !editData.crop || !editData.soilType || editData.acres <= 0) {
      setError("Please fill in ALL farming details.");
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      await onUpdate(editData);
      setIsEditing(false);
    } catch {
      setError("Failed to save. Check intermediate connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const username = localStorage.getItem('kisansathi_username') || 'Farmer';

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('kisansathi_lang', lang);
  };

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="settings-drawer overflow-y-auto" style={{ zIndex: 300 }}>
        {/* Header */}
        <div className="gradient-green px-5 pt-12 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl">{t('settings.title')}</h2>
              <p className="text-green-200 text-sm">KisanSathi v1.0</p>
            </div>
            <button id="settings-close" onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Account Section */}
          <div className="card">
            <h3 className="font-bold text-text-primary mb-3">{t('settings.account')}</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                  {username[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">{username}</p>
                  <p className="text-xs text-text-secondary">{t('settings.verifiedFarmer')}</p>
                </div>
              </div>
              <button 
                id="logout-btn"
                onClick={onLogout}
                className="text-xs font-bold text-red-600 px-3 py-1.5 rounded-xl border border-red-100 hover:bg-red-50 transition-all"
              >
                {t('settings.logout')}
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">{t('settings.farmerProfile')}</h3>
              {!isEditing ? (
                <button id="edit-profile" onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#2D6A4F' }}>
                  <Edit3 size={14} /> {t('settings.edit')}
                </button>
              ) : (
                <button 
                  id="save-profile" 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="flex items-center gap-1.5 text-sm font-semibold transition-opacity" 
                  style={{ color: '#059669', opacity: isSaving ? 0.6 : 1 }}
                >
                  <Save size={14} /> {isSaving ? t('settings.saving') : t('settings.save')}
                </button>
              )}
            </div>

            {!isEditing && profile ? (
              <div className="space-y-2">
                {[
                  { label: t('settings.name'), value: profile.name, emoji: '👤' },
                  { label: t('settings.village'), value: profile.village, emoji: '📍' },
                  { label: t('settings.state'), value: profile.state, emoji: '🗺️' },
                  { label: t('settings.primaryCrop'), value: profile.crop, emoji: '🌱' },
                  { label: t('settings.farmSize', { acres: profile.acres }), value: '', emoji: '📐' },
                  { label: t('home.soilType'), value: `${profile.soilType} Soil`, emoji: '🌍' },
                ].map(({ label, value, emoji }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-text-secondary">{emoji} {label}</span>
                    <span className="text-sm font-semibold text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            ) : !isEditing ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🚜</div>
                <p className="text-sm font-bold text-gray-900">{t('settings.farmNotSetup')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('settings.setupPrompt')}</p>
                <button onClick={() => setIsEditing(true)} className="mt-4 text-sm font-bold text-green-700">{t('settings.setUpProfile')}</button>
              </div>
            ) : (
              <div className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-bold animate-shake">
                    ⚠️ {error}
                  </div>
                )}
                <div>
                  <label className="input-label">Name</label>
                  <input id="edit-name" className="input-field" value={editData.name} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="input-label">Village/City</label>
                  <input id="edit-village" className="input-field" value={editData.village} onChange={e => setEditData(p => ({ ...p, village: e.target.value }))} />
                </div>
                <div>
                  <label className="input-label">State</label>
                  <input id="edit-state" className="input-field" value={editData.state} onChange={e => setEditData(p => ({ ...p, state: e.target.value }))} />
                </div>
                <div>
                  <label className="input-label">Primary Crop</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CROPS.map(c => (
                      <button key={c} id={`edit-crop-${c.toLowerCase()}`} onClick={() => setEditData(p => ({ ...p, crop: c }))}
                        className="py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                        style={{ borderColor: editData.crop === c ? '#2D6A4F' : '#E5E7EB', color: editData.crop === c ? '#2D6A4F' : '#6B7280', background: editData.crop === c ? '#F0FDF4' : 'white' }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="input-label">Farm Size: {editData.acres} acres</label>
                  <input id="edit-acres" type="range" min={0.5} max={50} step={0.5} value={editData.acres}
                    onChange={e => setEditData(p => ({ ...p, acres: parseFloat(e.target.value) }))}
                    className="w-full" style={{ accentColor: '#2D6A4F' }}
                  />
                </div>
                <div>
                  <label className="input-label">Soil Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SOIL_TYPES.map(s => (
                      <button key={s} id={`edit-soil-${s.toLowerCase()}`} onClick={() => setEditData(p => ({ ...p, soilType: s }))}
                        className="py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                        style={{ borderColor: editData.soilType === s ? '#2D6A4F' : '#E5E7EB', color: editData.soilType === s ? '#2D6A4F' : '#6B7280', background: editData.soilType === s ? '#F0FDF4' : 'white' }}
                      >
                        {s} Soil
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="card">
            <h3 className="font-bold text-text-primary mb-3">{t('settings.preferences')}</h3>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Globe size={16} style={{ color: '#6B7280' }} />
                <span className="text-sm text-text-primary">{t('settings.language')}</span>
              </div>
              <div className="flex gap-2">
                <button id="lang-en" onClick={() => handleLanguageChange('en')} className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all" style={{ background: i18n.language === 'en' ? '#2D6A4F' : '#F3F4F6', color: i18n.language === 'en' ? 'white' : '#6B7280' }}>
                  EN
                </button>
                <button id="lang-hi" onClick={() => handleLanguageChange('hi')} className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all" style={{ background: i18n.language === 'hi' ? '#2D6A4F' : '#F3F4F6', color: i18n.language === 'hi' ? 'white' : '#6B7280' }}>
                  हि
                </button>
                <button id="lang-mr" onClick={() => handleLanguageChange('mr')} className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all" style={{ background: i18n.language === 'mr' ? '#2D6A4F' : '#F3F4F6', color: i18n.language === 'mr' ? 'white' : '#6B7280' }}>
                  म
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">🔔</span>
                <span className="text-sm text-text-primary">Notifications</span>
              </div>
              <div className="w-10 h-6 rounded-full relative cursor-pointer" style={{ background: '#2D6A4F' }}>
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </div>
          </div>

          {/* About */}
          <div className="card">
            <h3 className="font-bold text-text-primary mb-3">ℹ️ About KisanSathi</h3>
            <div className="p-3 rounded-2xl mb-3" style={{ background: '#F0FDF4' }}>
              <div className="text-2xl mb-2">🌱</div>
              <p className="text-sm text-text-primary font-semibold">KisanSathi v1.0</p>
              <p className="text-xs text-text-secondary mt-1">Smart Farming. Better Life.</p>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Built with ❤️ for Indian farmers. Powered by AI to help you grow more, earn more, and farm smarter.
              </p>
            </div>
            <div className="space-y-2">
              {[
                { icon: '🤖', label: 'AI Advisor (Crop Doctor)' },
                { icon: '📊', label: 'Real Mandi Price Data' },
                { icon: '🌦️', label: 'Live Weather Integration' },
                { icon: '📅', label: 'Personalized Crop Calendar' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span>{icon}</span> <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center py-4">
            <p className="text-xs text-text-secondary">Version 1.0.0 • Made with ❤️ for Indian Farmers</p>
          </div>
        </div>
      </div>
    </>
  );
}
