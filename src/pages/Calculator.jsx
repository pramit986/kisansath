import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calculateResources, getWaterChartData, getCurrentSeason } from '../utils/calculations';

const CROPS = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Vegetables', 'Soybean', 'Maize'];
const SEASONS = ['Kharif', 'Rabi', 'Zaid'];
const STAGES = ['Sowing', 'Vegetative', 'Flowering', 'Harvest'];
const RISK_COLORS = { Low: '#22C55E', Medium: '#F59E0B', High: '#EF4444' };
const STAGE_COLORS = ['#74C69D', '#2D6A4F', '#40916C', '#95D5B2'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-3" style={{ border: '1px solid #E5E7EB' }}>
        <p className="font-bold text-text-primary text-sm">{label}</p>
        <p className="text-sm" style={{ color: '#2D6A4F' }}>💧 {payload[0].value}K litres/acre</p>
      </div>
    );
  }
  return null;
};

export default function CalculatorPage({ profile }) {
  const [crop, setCrop] = useState(profile.crop || 'Rice');
  const [acres, setAcres] = useState(profile.acres || 1);
  const [season, setSeason] = useState(getCurrentSeason());
  const [stage, setStage] = useState('Vegetative');
  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = () => {
    const res = calculateResources(crop, acres, season, stage);
    const chart = getWaterChartData(crop, acres);
    setResults(res);
    setChartData(chart);
    setHasCalculated(true);
  };

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header */}
      <div className="gradient-green px-8 py-6">
        <h1 className="text-white text-2xl font-extrabold mb-1">Smart Calculator 🧮</h1>
        <p className="text-green-200 text-sm">Get exact resource recommendations for your farm</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="col-span-1">
            <div className="card animate-slide-up">
              <h2 className="font-bold text-text-primary text-lg mb-5">Farm Details</h2>
              <div className="space-y-5">
                {/* Crop */}
                <div>
                  <label className="input-label">Crop Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CROPS.map(c => (
                      <button
                        key={c}
                        id={`calc-crop-${c.toLowerCase()}`}
                        onClick={() => setCrop(c)}
                        className="py-2 px-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                          background: crop === c ? '#2D6A4F' : '#F8F9FA',
                          color: crop === c ? 'white' : '#6B7280',
                          border: `2px solid ${crop === c ? '#2D6A4F' : '#E5E7EB'}`,
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Acres */}
                <div>
                  <label className="input-label">
                    Farm Size: <span className="font-extrabold" style={{ color: '#2D6A4F' }}>{acres} acres</span>
                  </label>
                  <input
                    id="calc-acres"
                    type="range"
                    min={0.5}
                    max={50}
                    step={0.5}
                    value={acres}
                    onChange={e => setAcres(parseFloat(e.target.value))}
                    className="w-full"
                    style={{ accentColor: '#2D6A4F' }}
                  />
                  <div className="flex justify-between text-xs text-text-secondary mt-1">
                    <span>0.5 acres</span><span>50 acres</span>
                  </div>
                </div>

                {/* Season */}
                <div>
                  <label className="input-label">Season</label>
                  <div className="grid grid-cols-3 gap-2">
                    {SEASONS.map(s => (
                      <button
                        key={s}
                        id={`calc-season-${s.toLowerCase()}`}
                        onClick={() => setSeason(s)}
                        className="py-2.5 rounded-xl text-xs font-semibold transition-all text-center"
                        style={{
                          background: season === s ? '#EFF6FF' : '#F8F9FA',
                          color: season === s ? '#1E40AF' : '#6B7280',
                          border: `2px solid ${season === s ? '#3B82F6' : '#E5E7EB'}`,
                        }}
                      >
                        {s === 'Kharif' ? '🌧️' : s === 'Rabi' ? '❄️' : '☀️'}<br/>{s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Growth Stage */}
                <div>
                  <label className="input-label">Growth Stage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {STAGES.map(s => (
                      <button
                        key={s}
                        id={`calc-stage-${s.toLowerCase()}`}
                        onClick={() => setStage(s)}
                        className="py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-left"
                        style={{
                          background: stage === s ? '#F0FDF4' : '#F8F9FA',
                          color: stage === s ? '#2D6A4F' : '#6B7280',
                          border: `2px solid ${stage === s ? '#2D6A4F' : '#E5E7EB'}`,
                        }}
                      >
                        {s === 'Sowing' ? '🌱' : s === 'Vegetative' ? '🌿' : s === 'Flowering' ? '🌸' : '🌾'} {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button id="calc-submit" onClick={handleCalculate} className="btn-primary">
                  📊 Calculate Resources
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="col-span-2">
            {hasCalculated && results ? (
              <div className="space-y-5 animate-slide-up">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <ResultCard id="res-water" emoji="💧" title="Daily Water Need" value={results.dailyWater} unit="litres/day" sub={`Best: ${results.irrigationTime}`} color="#3B82F6" bg="#EFF6FF" />
                  <ResultCard id="res-fertilizer" emoji="🌿" title="Weekly Fertilizer" value={`N:${results.weeklyN} P:${results.weeklyP} K:${results.weeklyK}`} unit="kg each" sub={results.fertilizerType} color="#2D6A4F" bg="#F0FDF4" />
                  <ResultCard id="res-pest" emoji="🐛" title="Pesticide Schedule" value={`${results.pestFrequency}x/month`} unit="" sub={`Risk: ${results.pestRisk}`} color={RISK_COLORS[results.pestRisk]} bg={results.pestRisk === 'High' ? '#FEF2F2' : results.pestRisk === 'Medium' ? '#FFFBEB' : '#F0FDF4'} />
                  <ResultCard id="res-labor" emoji="👨‍🌾" title="Labor Estimate" value={results.laborDays} unit="person-days" sub="This week's requirement" color="#8B5CF6" bg="#F5F3FF" />
                  <ResultCard id="res-cost" emoji="💰" title="Weekly Cost Est." value={`₹${results.weeklyCost}`} unit="" sub="Approximate input cost" color="#F59E0B" bg="#FFFBEB" />
                  <ResultCard id="res-yield" emoji="📈" title="Expected Yield" value={results.expectedYield} unit="quintals" sub={`For ${acres} acres (est.)`} color="#059669" bg="#ECFDF5" />
                </div>

                {/* Chart + Tip side by side */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="card">
                    <h3 className="font-bold text-text-primary mb-1">💧 Water by Growth Stage</h3>
                    <p className="text-xs text-text-secondary mb-4">Daily requirement (thousand litres) for {acres} acres</p>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={chartData} barSize={36}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                        <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="water" radius={[8, 8, 0, 0]}>
                          {chartData.map((_, i) => <Cell key={i} fill={STAGE_COLORS[i]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="card flex-1" style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', border: '1.5px solid #86EFAC' }}>
                      <p className="text-sm font-bold text-green-800 mb-1">💡 Smart Savings Tip</p>
                      <p className="text-sm text-green-700 leading-relaxed">
                        By optimizing irrigation (drip or AWD technique), you could save approximately{' '}
                        <strong>₹{results.savingsPerSeason}</strong> per season on water and electricity costs.
                      </p>
                    </div>
                    <div className="card" style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A' }}>
                      <p className="text-sm font-bold text-amber-800 mb-1">📋 Summary</p>
                      <div className="space-y-1 text-sm text-amber-700">
                        <div>Crop: <strong>{crop}</strong> · {acres} acres</div>
                        <div>Season: <strong>{season}</strong> · Stage: <strong>{stage}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center animate-fade-in" style={{ minHeight: 400 }}>
                <div className="text-7xl mb-4">🧮</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Ready to Calculate</h3>
                <p className="text-text-secondary text-center max-w-sm">
                  Fill in your farm details on the left and click "Calculate Resources" to get a personalized resource plan for your farm.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ id, emoji, title, value, unit, sub, color, bg }) {
  return (
    <div id={id} className="card card-hover p-4 animate-count-up">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <span className="text-xs font-bold text-text-secondary">{title}</span>
      </div>
      <div className="text-lg font-extrabold mb-0.5" style={{ color }}>{value}</div>
      {unit && <div className="text-xs text-text-secondary">{unit}</div>}
      <div className="mt-2 px-2 py-1 rounded-lg text-xs font-medium inline-block" style={{ background: bg, color }}>{sub}</div>
    </div>
  );
}
