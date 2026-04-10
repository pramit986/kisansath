import React, { useState, useRef, useEffect } from 'react';
import { Send, Leaf, AlertCircle, Info } from 'lucide-react';

const QUICK_QUESTIONS = [
  { emoji: '🍃', text: 'Leaves turning yellow' },
  { emoji: '💧', text: 'How much to irrigate?' },
  { emoji: '🐛', text: 'Pest attack on crops' },
  { emoji: '🌱', text: 'Best fertilizer for my crop' },
  { emoji: '📅', text: 'When to harvest?' },
  { emoji: '🌦️', text: 'Weather affecting my crop' },
];

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';

export default function CropDoctorPage({ profile }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('kisansathi_chat') || '[]');
    setMessages(saved);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const saveMessages = (msgs) => {
    localStorage.setItem('kisansathi_chat', JSON.stringify(msgs.slice(-20)));
  };

  const getSystemPrompt = () => `You are KisanSathi, a warm and knowledgeable agricultural advisor for Indian farmers. The farmer's profile is:
- Name: ${profile.name}
- Crop: ${profile.crop}
- Farm Size: ${profile.acres} acres
- Location: ${profile.village}, ${profile.state}
- Soil Type: ${profile.soilType}

Rules:
- Always give practical, actionable advice
- Keep responses short (3-5 lines max)
- Use simple English, avoid jargon
- Be encouraging and empathetic
- Add 1 relevant emoji per response
- If serious disease/pest, recommend consulting local agricultural officer
- Always relate advice to their specific crop (${profile.crop}) and location (${profile.village}, ${profile.state})
- Use Indian farming context, reference Indian crops, seasons, and practices`;

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setError('');

    const userMsg = { role: 'user', content: text, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const recent = JSON.parse(localStorage.getItem('kisansathi_recent_questions') || '[]');
    const newRecent = [text, ...recent.filter(q => q !== text)].slice(0, 5);
    localStorage.setItem('kisansathi_recent_questions', JSON.stringify(newRecent));

    try {
      if (!CLAUDE_API_KEY) {
        await new Promise(r => setTimeout(r, 1500));
        const fallbacks = {
          'yellow': `🍋 Yellowing leaves in ${profile.crop} often indicate nitrogen deficiency or iron deficiency. For ${profile.soilType} soil in ${profile.state}, apply urea top dressing (20-25 kg/acre) and monitor results over 7-10 days. If new leaves are yellow with green veins, it's iron deficiency — apply ferrous sulfate foliar spray.`,
          'irrigat': `💧 For your ${profile.acres}-acre ${profile.crop} farm, you need approximately ${Math.round(1500 * profile.acres)} litres per day during this stage. In ${profile.village}'s climate, water early morning (6-8 AM) to reduce evaporation losses. Check if soil is moist 6 inches deep before irrigating again.`,
          'pest': `🐛 Best approach for pest control on ${profile.crop}: start with pest monitoring (inspect 10 plants per acre). Use chemical control only when pest count exceeds economic threshold. Contact your local agricultural officer for free spray recommendations.`,
          'fertiliz': `🌿 For ${profile.crop} on ${profile.acres} acres with ${profile.soilType} soil: apply NPK in the ratio recommended for your growth stage. This week, you'll need approximately ${Math.round(2.5 * profile.acres)}kg Nitrogen, ${Math.round(1.2 * profile.acres)}kg Phosphorus, ${Math.round(1.5 * profile.acres)}kg Potassium. Apply before or during irrigation for best results.`,
          'harvest': `🌾 ${profile.crop} harvest timing depends on maturity indicators. Look for visual signs: grain color change, dry leaves at bottom. After harvest, dry to 12-14% moisture before storage. Check mandi prices on the Prices tab to pick the best selling time!`,
          'weather': `🌦️ Weather conditions in ${profile.village} today suggest moderate farming activity. If temperature is above 35°C, water in evening. Avoid pesticide spraying if wind is strong. High humidity + warm weather = higher fungal disease risk for ${profile.crop}.`,
        };
        const key = Object.keys(fallbacks).find(k => text.toLowerCase().includes(k));
        const aiContent = key ? fallbacks[key] : `🌱 For your ${profile.crop} farm in ${profile.village}, I'd recommend monitoring crop health regularly. Based on your ${profile.soilType} soil type and ${profile.acres} acres, focus on proper irrigation timing and balanced fertilization. Feel free to ask specific questions!`;
        const aiMsg = { role: 'assistant', content: aiContent, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
        const final = [...updatedMessages, aiMsg];
        setMessages(final);
        saveMessages(final);
      } else {
        const history = updatedMessages.slice(-10).map(m => ({ role: m.role, content: m.content }));
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5',
            max_tokens: 300,
            system: getSystemPrompt(),
            messages: history,
          }),
        });
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        const aiContent = data.content?.[0]?.text || 'I apologize, I could not generate a response.';
        const aiMsg = { role: 'assistant', content: aiContent, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
        const final = [...updatedMessages, aiMsg];
        setMessages(final);
        saveMessages(final);
      }
    } catch (err) {
      const errorMsg = {
        role: 'assistant',
        content: `⚠️ I'm having trouble connecting right now. As a general tip for your ${profile.crop}: ensure proper irrigation and monitor crop health daily. Try again in a moment!`,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      const final = [...updatedMessages, errorMsg];
      setMessages(final);
      saveMessages(final);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('kisansathi_chat');
  };

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="gradient-green px-8 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Leaf size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl">🌿 Crop Doctor</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                <span className="text-green-200 text-sm">AI Agricultural Expert — Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: '#D1FAE5' }}>
              Advising for: <strong>{profile.crop}</strong> · {profile.acres} acres · {profile.village}
            </div>
            {messages.length > 0 && (
              <button id="clear-chat" onClick={clearChat} className="text-green-200 text-sm px-4 py-2 rounded-xl font-medium" style={{ background: 'rgba(255,255,255,0.15)' }}>
                Clear Chat
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Two-panel layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0, minHeight: 0 }}>
        {/* Left Panel — Quick Questions & Profile */}
        <div style={{ borderRight: '1px solid #E5E7EB', background: 'white', padding: 24, overflowY: 'auto' }}>
          <h3 className="font-bold text-text-primary mb-4">Quick Questions</h3>
          <div className="space-y-2 mb-6">
            {QUICK_QUESTIONS.map(({ emoji, text }) => (
              <button
                key={text}
                id={`quick-${text.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => sendMessage(text)}
                className="w-full text-left p-3 rounded-xl transition-all card-hover flex items-center gap-3"
                style={{ background: '#F8F9FA', border: '1.5px solid #E5E7EB' }}
              >
                <span className="text-lg">{emoji}</span>
                <span className="text-sm font-medium text-text-primary">{text}</span>
              </button>
            ))}
          </div>

          <h3 className="font-bold text-text-primary mb-3">Your Profile</h3>
          <div className="p-4 rounded-2xl space-y-2" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            {[
              { label: 'Crop', value: profile.crop },
              { label: 'Area', value: `${profile.acres} acres` },
              { label: 'Soil', value: `${profile.soilType}` },
              { label: 'Location', value: `${profile.village}, ${profile.state}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-green-700 font-medium">{label}:</span>
                <span className="text-green-900 font-semibold">{value}</span>
              </div>
            ))}
          </div>

          {!CLAUDE_API_KEY && (
            <div className="mt-4 p-3 rounded-2xl flex items-start gap-2" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
              <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                Add <strong>VITE_CLAUDE_API_KEY</strong> to your .env file to enable full Claude AI responses. Demo mode is active.
              </p>
            </div>
          )}
        </div>

        {/* Right Panel — Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#F8F9FA' }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }} className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in" style={{ minHeight: 300 }}>
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="font-bold text-text-primary text-xl mb-2">Hello, {profile.name.split(' ')[0]}! 👋</h2>
                <p className="text-text-secondary">I'm your personal Crop Doctor. Ask me anything about your {profile.crop} farming, or pick a quick question from the left panel!</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-auto" style={{ background: '#2D6A4F' }}>
                        <Leaf size={14} className="text-white" />
                      </div>
                    )}
                    <div style={{ maxWidth: '65%' }}>
                      {msg.role === 'user' ? (
                        <div className="chat-bubble-user">{msg.content}</div>
                      ) : (
                        <div className={`chat-bubble-ai ${msg.isError ? 'opacity-75' : ''}`}>{msg.content}</div>
                      )}
                      <div className={`text-xs text-text-secondary mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2D6A4F' }}>
                      <Leaf size={14} className="text-white" />
                    </div>
                    <div className="chat-bubble-ai py-3 px-4">
                      <div className="flex gap-2 items-center">
                        <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '16px 32px', background: 'white', borderTop: '1px solid #E5E7EB' }}>
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <div className="flex gap-3 items-center">
              <input
                ref={inputRef}
                id="chat-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder={`Ask anything about your ${profile.crop} farm in ${profile.village}...`}
                className="input-field flex-1"
                style={{ borderRadius: 16 }}
                disabled={isTyping}
              />
              <button
                id="chat-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="h-12 px-6 rounded-2xl flex items-center gap-2 font-semibold text-sm transition-all flex-shrink-0"
                style={{
                  background: input.trim() && !isTyping ? 'linear-gradient(135deg, #2D6A4F, #40916C)' : '#E5E7EB',
                  color: input.trim() && !isTyping ? 'white' : '#9CA3AF',
                  boxShadow: input.trim() ? '0 4px 12px rgba(45,106,79,0.3)' : 'none',
                }}
              >
                <Send size={16} /> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
