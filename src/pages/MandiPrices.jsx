import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cropPrices, nearbyMandis, weekDays, marketInsights, govtSchemes } from '../data/mandiData';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-3" style={{ border: '1px solid #E5E7EB' }}>
        <p className="font-bold text-text-primary text-xs mb-1">{label}</p>
        <p className="text-sm font-bold" style={{ color: '#2D6A4F' }}>₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

export default function MandiPricesPage({ profile }) {
  const [selectedCrop, setSelectedCrop] = useState(profile.crop || 'Rice');
  const lastUpdated = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const selectedData = cropPrices[selectedCrop];
  const chartData = weekDays.map((day, i) => ({
    day,
    price: selectedData?.weekData[i],
  }));

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header */}
      <div className="gradient-green px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white text-2xl font-extrabold mb-0.5">Mandi Prices 📊</h1>
            <p className="text-green-200 text-sm">Maharashtra, India — Real-time market rates</p>
          </div>
          <div className="text-right">
            <div className="badge mb-1" style={{ background: 'rgba(255,255,255,0.2)', color: '#D1FAE5' }}>🔴 Live Data</div>
            <p className="text-green-300 text-xs">Updated {lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Top: Price Cards Grid */}
        <div className="mb-6">
          <h2 className="section-header mb-4">Today's Crop Prices</h2>
          <div className="grid grid-cols-7 gap-3">
            {Object.entries(cropPrices).map(([crop, data]) => {
              const change = data.current - data.yesterday;
              const pct = ((change / data.yesterday) * 100).toFixed(1);
              const isUp = change >= 0;
              const isSelected = selectedCrop === crop;

              return (
                <button
                  key={crop}
                  id={`price-${crop.toLowerCase()}`}
                  onClick={() => setSelectedCrop(crop)}
                  className="card card-hover text-left p-3 transition-all duration-200"
                  style={{
                    border: `2px solid ${isSelected ? '#2D6A4F' : 'transparent'}`,
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                  }}
                >
                  <div className="text-2xl text-center mb-2">{data.emoji}</div>
                  <div className="font-bold text-text-primary text-xs text-center mb-1">{crop}</div>
                  <div className="text-base font-extrabold text-center" style={{ color: '#1B1B1B' }}>
                    ₹{data.current.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-text-secondary text-center">/quintal</div>
                  <div className="flex items-center justify-center gap-1 mt-1.5">
                    {isUp ? <TrendingUp size={10} style={{ color: '#22C55E' }} /> : <TrendingDown size={10} style={{ color: '#EF4444' }} />}
                    <span className={`text-xs font-bold ${isUp ? 'price-up' : 'price-down'}`}>
                      {isUp ? '+' : ''}₹{Math.abs(change)} ({Math.abs(pct)}%)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle Row: Chart + Market Insight + Mandis */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Price Trend Chart */}
          <div className="col-span-2 card animate-slide-up">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-text-primary text-lg">{selectedData?.emoji} {selectedCrop} — 7-Day Price Trend</h3>
              <div className="flex items-center gap-2">
                <span className={`badge ${(selectedData?.current - selectedData?.yesterday) >= 0 ? 'badge-green' : 'badge-red'}`}>
                  {(selectedData?.current - selectedData?.yesterday) >= 0 ? '↑ Rising' : '↓ Falling'}
                </span>
              </div>
            </div>
            <p className="text-xs text-text-secondary mb-4">₹ per quintal — Maharashtra Mandis</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} tickFormatter={v => `₹${(v/1000).toFixed(1)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" stroke="#2D6A4F" strokeWidth={3} dot={{ r: 5, fill: '#2D6A4F', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 7, fill: '#F4A261' }} />
              </LineChart>
            </ResponsiveContainer>

            {/* Range info */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm">
                <span className="text-text-secondary">52-week Low: </span>
                <strong style={{ color: '#DC2626' }}>₹{selectedData?.min.toLocaleString('en-IN')}</strong>
              </div>
              <div className="text-sm">
                <span className="text-text-secondary">52-week High: </span>
                <strong style={{ color: '#059669' }}>₹{selectedData?.max.toLocaleString('en-IN')}</strong>
              </div>
              <div className="text-sm">
                <span className="text-text-secondary">Today's Rate: </span>
                <strong style={{ color: '#2D6A4F' }}>₹{selectedData?.current.toLocaleString('en-IN')}/quintal</strong>
              </div>
            </div>
          </div>

          {/* Market Insight + Govt Schemes */}
          <div className="col-span-1 space-y-4">
            <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', border: '1.5px solid #FDE68A' }}>
              <p className="text-xs font-bold text-amber-700 mb-2">💡 Market Insight — {selectedCrop}</p>
              <p className="text-sm text-amber-800 font-medium leading-relaxed">{marketInsights[selectedCrop]}</p>
            </div>
            <div className="card">
              <h4 className="font-bold text-text-primary mb-3">🏛️ Govt Schemes</h4>
              <div className="space-y-3">
                {govtSchemes.map((scheme, i) => (
                  <div key={i} id={`scheme-${i}`} className="p-3 rounded-xl" style={{ background: scheme.color, border: `1px solid ${scheme.borderColor}` }}>
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-lg flex-shrink-0">{scheme.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-text-primary">{scheme.name}</div>
                        <div className="text-xs text-text-secondary leading-relaxed">{scheme.description}</div>
                      </div>
                    </div>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer" id={`scheme-link-${i}`} className="text-xs font-semibold flex items-center gap-1 mt-1" style={{ color: '#2D6A4F' }}>
                      Learn More <ExternalLink size={10} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Nearby Mandis Table */}
        <div className="card animate-slide-up">
          <h2 className="font-bold text-text-primary text-lg mb-4">🏪 Nearby Mandis — Maharashtra</h2>
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8F9FA' }}>
                  {['Mandi Name', 'Location', 'Distance', 'Today\'s Price', 'Best Crop', 'Timing', 'Status'].map(h => (
                    <th key={h} className="text-left p-4 text-xs font-bold text-text-secondary uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nearbyMandis.map((mandi, i) => (
                  <tr key={i} id={`mandi-${mandi.city.toLowerCase()}`} style={{ borderTop: '1px solid #F3F4F6', background: mandi.isBestDeal ? '#F0FDF4' : 'transparent' }}>
                    <td className="p-4">
                      <div className="font-semibold text-text-primary">{mandi.name}</div>
                      {mandi.isBestDeal && <span className="badge badge-green text-xs mt-1">🏆 Best Deal</span>}
                    </td>
                    <td className="p-4 text-sm text-text-secondary">{mandi.city}</td>
                    <td className="p-4 text-sm text-text-secondary">{mandi.distance}</td>
                    <td className="p-4">
                      <div className="text-base font-bold text-text-primary">₹{mandi.price.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-text-secondary">/quintal</div>
                    </td>
                    <td className="p-4">
                      <span className="badge" style={{ background: '#F0FDF4', color: '#2D6A4F' }}>{mandi.crop}</span>
                    </td>
                    <td className="p-4 text-sm text-text-secondary">{mandi.timing}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-xs text-green-600 font-semibold">Open</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
