import React, { useState } from 'react';
import { Leaf, Sun, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

const CHALLENGES = [
  { id: 'water', label: 'Water Scarcity', emoji: '💧' },
  { id: 'pest', label: 'Pest Control', emoji: '🐛' },
  { id: 'yield', label: 'Low Yield', emoji: '📉' },
  { id: 'market', label: 'Market Price', emoji: '💰' },
  { id: 'weather', label: 'Weather Risk', emoji: '🌦️' },
  { id: 'soil', label: 'Soil Health', emoji: '🌱' },
];

const CROPS = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Vegetables', 'Soybean', 'Maize'];
const SOIL_TYPES = ['Red', 'Black', 'Alluvial', 'Sandy'];

export default function OnboardingPage({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', village: '', state: '', crop: '', acres: 2, soilType: '', challenges: [],
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Please enter your name';
      if (!formData.village.trim()) newErrors.village = 'Please enter your village/city';
      if (!formData.state) newErrors.state = 'Please select your state';
    }
    if (step === 2) {
      if (!formData.crop) newErrors.crop = 'Please select your primary crop';
      if (!formData.soilType) newErrors.soilType = 'Please select soil type';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) setStep(s => s + 1);
      else handleSubmit();
    }
  };

  const handleSubmit = () => {
    onComplete({
      ...formData,
      createdAt: new Date().toISOString(),
      sowingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  const toggleChallenge = (id) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(id)
        ? prev.challenges.filter(c => c !== id)
        : [...prev.challenges, id],
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 32 }} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                <Leaf size={32} color="white" />
              </div>
              <div style={{
                position: 'absolute', top: -8, right: -8,
                width: 28, height: 28, borderRadius: '50%',
                background: '#F4A261',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sun size={14} color="white" />
              </div>
            </div>
          </div>
          <h1 style={{ color: 'white', fontSize: 32, fontWeight: 800, margin: '0 0 4px' }}>KisanSathi</h1>
          <p style={{ color: '#86EFAC', fontSize: 13, fontWeight: 600, letterSpacing: 2, margin: '0 0 6px', textTransform: 'uppercase' }}>Smart Farming. Better Life.</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0 }}>Your AI-powered farming companion 🌾</p>
        </div>

        {/* Form Card */}
        <div style={{ background: 'white', borderRadius: 24, boxShadow: '0 24px 64px rgba(0,0,0,0.3)', overflow: 'hidden' }} className="animate-slide-up">
          {/* Progress */}
          <div style={{ padding: '24px 28px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Step {step} of 3
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2D6A4F' }}>
                {step === 1 ? 'Personal Info' : step === 2 ? 'Farm Details' : 'Your Challenges'}
              </span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 24 }}>
              <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            {/* Step dots */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700,
                    background: s <= step ? '#2D6A4F' : '#F3F4F6',
                    color: s <= step ? 'white' : '#9CA3AF',
                    transform: s === step ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s',
                  }}>
                    {s < step ? <Check size={14} /> : s}
                  </div>
                  {s < 3 && <div style={{ width: 32, height: 2, borderRadius: 2, background: s < step ? '#2D6A4F' : '#E5E7EB' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div style={{ padding: '0 28px 28px' }}>
            {step === 1 && (
              <div className="animate-slide-up">
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B1B1B', marginBottom: 20 }}>Tell us about yourself 👋</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label className="input-label">Full Name</label>
                    <input id="onb-name" className="input-field" placeholder="e.g. Ramesh Kumar" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                    {errors.name && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="input-label">Village / City</label>
                    <input id="onb-village" className="input-field" placeholder="e.g. Pune, Nagpur, Nashik..." value={formData.village} onChange={e => setFormData(p => ({ ...p, village: e.target.value }))} />
                    {errors.village && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{errors.village}</p>}
                  </div>
                  <div>
                    <label className="input-label">State</label>
                    <select id="onb-state" className="input-field" value={formData.state} onChange={e => setFormData(p => ({ ...p, state: e.target.value }))}>
                      <option value="">Select your state...</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{errors.state}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-slide-up">
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B1B1B', marginBottom: 20 }}>Tell us about your farm 🌾</h2>
                <div>
                  <label className="input-label">Primary Crop</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                    {CROPS.map(crop => (
                      <button key={crop} id={`crop-${crop.toLowerCase()}`} onClick={() => setFormData(p => ({ ...p, crop }))}
                        style={{
                          padding: '10px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                          border: `2px solid ${formData.crop === crop ? '#2D6A4F' : '#E5E7EB'}`,
                          background: formData.crop === crop ? '#F0FDF4' : 'white',
                          color: formData.crop === crop ? '#2D6A4F' : '#6B7280',
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}>{crop}</button>
                    ))}
                  </div>
                  {errors.crop && <p style={{ color: '#EF4444', fontSize: 12, marginBottom: 12 }}>{errors.crop}</p>}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label className="input-label">Farm Size: <strong style={{ color: '#2D6A4F' }}>{formData.acres} acres</strong></label>
                  <input id="onb-acres" type="range" min={0.5} max={50} step={0.5} value={formData.acres}
                    onChange={e => setFormData(p => ({ ...p, acres: parseFloat(e.target.value) }))}
                    style={{ width: '100%', accentColor: '#2D6A4F' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                    <span>0.5 acres</span><span>50 acres</span>
                  </div>
                </div>
                <div>
                  <label className="input-label">Soil Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {SOIL_TYPES.map(soil => (
                      <button key={soil} id={`soil-${soil.toLowerCase()}`} onClick={() => setFormData(p => ({ ...p, soilType: soil }))}
                        style={{
                          padding: '10px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                          border: `2px solid ${formData.soilType === soil ? '#2D6A4F' : '#E5E7EB'}`,
                          background: formData.soilType === soil ? '#F0FDF4' : 'white',
                          color: formData.soilType === soil ? '#2D6A4F' : '#6B7280',
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}>{soil} Soil</button>
                    ))}
                  </div>
                  {errors.soilType && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{errors.soilType}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-slide-up">
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1B1B1B', marginBottom: 4 }}>What challenges do you face? 🤔</h2>
                <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>Select all that apply — we'll personalize your experience</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                  {CHALLENGES.map(({ id, label, emoji }) => {
                    const selected = formData.challenges.includes(id);
                    return (
                      <button key={id} id={`challenge-${id}`} onClick={() => toggleChallenge(id)}
                        style={{
                          padding: 12, borderRadius: 16, textAlign: 'left', cursor: 'pointer', position: 'relative',
                          border: `2px solid ${selected ? '#2D6A4F' : '#E5E7EB'}`,
                          background: selected ? '#F0FDF4' : 'white',
                          transition: 'all 0.2s',
                        }}>
                        {selected && (
                          <div style={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={11} color="white" />
                          </div>
                        )}
                        <div style={{ fontSize: 22, marginBottom: 4 }}>{emoji}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: selected ? '#2D6A4F' : '#6B7280' }}>{label}</div>
                      </button>
                    );
                  })}
                </div>
                <div style={{ padding: 14, borderRadius: 16, background: '#F0FDF4', border: '1.5px solid #BBF7D0', marginBottom: 4 }}>
                  <p style={{ fontSize: 13, color: '#166534', fontWeight: 500, margin: 0 }}>
                    🎉 You're almost ready! KisanSathi will give you personalized advice based on your {formData.crop || 'chosen'} farming in {formData.village || 'your village'}, {formData.state || 'your state'}.
                  </p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {step > 1 && (
                <button id="onb-back" onClick={() => setStep(s => s - 1)}
                  style={{
                    flex: '0 0 40%', padding: '13px', borderRadius: 14, fontSize: 15, fontWeight: 600,
                    border: '2px solid #2D6A4F', background: 'transparent', color: '#2D6A4F', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              <button id={step === 3 ? 'onb-submit' : 'onb-next'} onClick={handleNext}
                style={{
                  flex: 1, padding: '13px', borderRadius: 14, fontSize: 15, fontWeight: 700,
                  background: 'linear-gradient(135deg, #2D6A4F, #40916C)', color: 'white', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  boxShadow: '0 4px 16px rgba(45,106,79,0.35)',
                }}>
                {step === 3 ? '🚀 Get Started' : <><span>Next</span> <ChevronRight size={18} /></>}
              </button>
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 20 }}>
          Made with ❤️ for Indian Farmers
        </p>
      </div>
    </div>
  );
}
