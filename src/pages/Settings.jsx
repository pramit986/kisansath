import React, { useState } from 'react';
import { X, ChevronRight, Trash2, Globe, Info, Edit3, Save } from 'lucide-react';

const CROPS = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Vegetables', 'Soybean', 'Maize'];
const SOIL_TYPES = ['Red', 'Black', 'Alluvial', 'Sandy'];

export default function SettingsDrawer({ profile, onClose, onUpdate, onClearData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profile });
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
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
              <h2 className="text-white font-bold text-xl">Settings ⚙️</h2>
              <p className="text-green-200 text-sm">KisanSathi v1.0</p>
            </div>
            <button id="settings-close" onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Profile Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">👤 Farmer Profile</h3>
              {!isEditing ? (
                <button id="edit-profile" onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#2D6A4F' }}>
                  <Edit3 size={14} /> Edit
                </button>
              ) : (
                <button id="save-profile" onClick={handleSave} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#059669' }}>
                  <Save size={14} /> Save
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-2">
                {[
                  { label: 'Name', value: profile.name, emoji: '👤' },
                  { label: 'Village/City', value: profile.village, emoji: '📍' },
                  { label: 'State', value: profile.state, emoji: '🗺️' },
                  { label: 'Primary Crop', value: profile.crop, emoji: '🌱' },
                  { label: 'Farm Size', value: `${profile.acres} acres`, emoji: '📐' },
                  { label: 'Soil Type', value: `${profile.soilType} Soil`, emoji: '🌍' },
                ].map(({ label, value, emoji }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-text-secondary">{emoji} {label}</span>
                    <span className="text-sm font-semibold text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="input-label">Name</label>
                  <input id="edit-name" className="input-field" value={editData.name} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="input-label">Village/City</label>
                  <input id="edit-village" className="input-field" value={editData.village} onChange={e => setEditData(p => ({ ...p, village: e.target.value }))} />
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
            <h3 className="font-bold text-text-primary mb-3">🌐 Preferences</h3>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Globe size={16} style={{ color: '#6B7280' }} />
                <span className="text-sm text-text-primary">Language</span>
              </div>
              <div className="flex gap-2">
                <button id="lang-en" className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all" style={{ background: '#2D6A4F', color: 'white' }}>
                  EN
                </button>
                <button id="lang-hi" className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all" style={{ background: '#F3F4F6', color: '#6B7280' }}>
                  हि
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

          {/* Danger Zone */}
          <div className="card" style={{ border: '1.5px solid #FEE2E2' }}>
            <h3 className="font-bold mb-3" style={{ color: '#DC2626' }}>⚠️ Danger Zone</h3>
            {!showClearConfirm ? (
              <button
                id="clear-data-btn"
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl w-full"
                style={{ background: '#FEF2F2', color: '#DC2626' }}
              >
                <Trash2 size={16} /> Clear All Data & Start Over
              </button>
            ) : (
              <div className="p-3 rounded-xl" style={{ background: '#FEF2F2' }}>
                <p className="text-sm font-semibold text-red-700 mb-3">Are you sure? All your data, chat history, and settings will be permanently deleted.</p>
                <div className="flex gap-2">
                  <button id="confirm-clear" onClick={onClearData} className="flex-1 py-2 rounded-xl text-sm font-bold text-white" style={{ background: '#DC2626' }}>
                    Yes, Clear All
                  </button>
                  <button id="cancel-clear" onClick={() => setShowClearConfirm(false)} className="flex-1 py-2 rounded-xl text-sm font-bold" style={{ background: '#F3F4F6', color: '#6B7280' }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center py-4">
            <p className="text-xs text-text-secondary">Version 1.0.0 • Made with ❤️ for Indian Farmers</p>
          </div>
        </div>
      </div>
    </>
  );
}
