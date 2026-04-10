import React from 'react';
import { Home, MessageCircle, Calculator, Calendar, TrendingUp, Leaf, Sun } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'doctor', label: 'Crop Doctor', icon: MessageCircle },
  { id: 'calculator', label: 'Calculator', icon: Calculator },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'prices', label: 'Mandi Prices', icon: TrendingUp },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <aside className="sidebar-nav">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2D6A4F, #40916C)' }}
            >
              <Leaf size={20} className="text-white" />
            </div>
            <div
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: '#F4A261' }}
            >
              <Sun size={10} className="text-white" />
            </div>
          </div>
          <div>
            <div className="font-extrabold text-base" style={{ color: '#1B1B1B', lineHeight: 1.2 }}>KisanSathi</div>
            <div className="text-xs" style={{ color: '#6B7280' }}>Smart Farming</div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <div className="sidebar-items">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`nav-${id}`}
            className={`nav-item ${activeTab === id ? 'active' : ''}`}
            onClick={() => onTabChange(id)}
            aria-label={label}
          >
            <Icon className="nav-icon" strokeWidth={activeTab === id ? 2.5 : 1.8} />
            <span className="nav-label">{label}</span>
            {activeTab === id && (
              <div
                className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#2D6A4F' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div
          className="p-3 rounded-xl text-center"
          style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' }}
        >
          <p className="text-xs font-semibold" style={{ color: '#2D6A4F' }}>Made with ❤️ for</p>
          <p className="text-xs font-bold" style={{ color: '#2D6A4F' }}>Indian Farmers 🌾</p>
        </div>
      </div>
    </aside>
  );
}
