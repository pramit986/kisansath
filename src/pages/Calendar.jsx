import React, { useState, useEffect, useRef } from 'react';
import { cropCalendarData, activityColors } from '../data/cropCalendarData';
import { CheckCircle, Circle } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const UPCOMING_ALERTS_TEMPLATES = {
  Rice: [
    { days: 3, msg: 'Check for pest activity in field', priority: 'medium' },
    { days: 7, msg: 'Irrigation due — check soil moisture', priority: 'high' },
    { days: 14, msg: 'Fertilizer application scheduled', priority: 'high' },
    { days: 21, msg: 'Crop health inspection recommended', priority: 'low' },
  ],
  Wheat: [
    { days: 5, msg: 'Irrigation CRI stage — very critical', priority: 'high' },
    { days: 10, msg: 'Apply top dressing urea fertilizer', priority: 'high' },
    { days: 18, msg: 'Check for yellow rust disease', priority: 'medium' },
    { days: 25, msg: 'Aphid scouting recommended', priority: 'medium' },
  ],
  Cotton: [
    { days: 4, msg: 'Bollworm pheromone trap check', priority: 'high' },
    { days: 9, msg: 'Whitefly monitoring — sticky traps', priority: 'high' },
    { days: 15, msg: 'Second picking of cotton bolls', priority: 'medium' },
  ],
  Sugarcane: [
    { days: 7, msg: 'Earthing up + potash application', priority: 'medium' },
    { days: 14, msg: 'Borer monitoring in internodes', priority: 'high' },
    { days: 20, msg: 'Check factory booking status', priority: 'medium' },
  ],
  Vegetables: [
    { days: 2, msg: 'Daily harvest — maintain supply chain', priority: 'high' },
    { days: 5, msg: 'Drip fertigation — NPK application', priority: 'high' },
    { days: 10, msg: 'Disease scouting (mildew, blight)', priority: 'medium' },
  ],
  Soybean: [
    { days: 6, msg: 'FAW (Fall Army Worm) scouting', priority: 'high' },
    { days: 12, msg: 'Flowering stage — ensure moisture', priority: 'high' },
    { days: 20, msg: 'Pod development check + foliar spray', priority: 'medium' },
  ],
  Maize: [
    { days: 4, msg: 'FAW in whorl — carbofuran application', priority: 'high' },
    { days: 10, msg: 'Top dressing nitrogen before tasseling', priority: 'high' },
    { days: 18, msg: 'Silking stage irrigation — critical', priority: 'high' },
  ],
};

const PRIORITY_STYLES = {
  high: { bg: '#FEF2F2', border: '#FECACA', color: '#DC2626', icon: '🔴', label: 'Urgent' },
  medium: { bg: '#FFFBEB', border: '#FDE68A', color: '#D97706', icon: '🟡', label: 'Important' },
  low: { bg: '#F0FDF4', border: '#BBF7D0', color: '#16A34A', icon: '🟢', label: 'Routine' },
};

export default function CalendarPage({ profile }) {
  const crop = profile.crop || 'Rice';
  const calData = cropCalendarData[crop] || cropCalendarData.Rice;
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('kisansathi_tasks') || '{}');
    setCompletedTasks(saved);
  }, []);

  const toggleTask = (taskId) => {
    const updated = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(updated);
    localStorage.setItem('kisansathi_tasks', JSON.stringify(updated));
  };

  const monthTasks = calData.tasks[MONTHS[selectedMonth]] || [];
  const completedCount = monthTasks.filter(t => completedTasks[t.id]).length;
  const progress = monthTasks.length > 0 ? Math.round((completedCount / monthTasks.length) * 100) : 0;
  const upcomingAlerts = UPCOMING_ALERTS_TEMPLATES[crop] || UPCOMING_ALERTS_TEMPLATES.Rice;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header */}
      <div className="gradient-green px-8 py-6">
        <h1 className="text-white text-2xl font-extrabold mb-0.5">Crop Calendar 📅</h1>
        <p className="text-green-200 text-sm">{crop} — Full Year Activity Guide for {profile.village}, {profile.state}</p>
      </div>

      <div className="p-8">
        {/* Month Row + Legend */}
        <div className="card mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary text-lg">Select Month</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activityColors).map(([key, val]) => (
                <span key={key} className="activity-pill text-xs" style={{ background: val.bg, color: val.text }}>
                  {val.emoji} {val.label}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            {MONTHS.map((month, idx) => {
              const monthData = calData.months[idx];
              const isActive = selectedMonth === idx;
              const isCurrent = idx === currentMonth;
              const hasActivities = monthData?.activities?.filter(a => a !== 'rest').length > 0;

              return (
                <button
                  key={month}
                  id={`month-${month.toLowerCase()}`}
                  onClick={() => setSelectedMonth(idx)}
                  className="flex flex-col items-center p-2 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive ? '#2D6A4F' : isCurrent ? '#F0FDF4' : '#F8F9FA',
                    border: `2px solid ${isActive ? '#2D6A4F' : isCurrent ? '#86EFAC' : 'transparent'}`,
                  }}
                >
                  <span className="text-xs font-bold mb-1" style={{ color: isActive ? 'white' : isCurrent ? '#2D6A4F' : '#6B7280' }}>{month}</span>
                  {hasActivities ? (
                    <div className="flex gap-0.5">
                      {monthData.activities.slice(0, 2).map((a, i) => (
                        <div key={i} className="w-2 h-2 rounded-full" style={{ background: isActive ? 'rgba(255,255,255,0.6)' : (activityColors[a]?.text || '#9CA3AF') }} />
                      ))}
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left: Year Timeline */}
          <div className="col-span-1">
            <div className="card animate-slide-up">
              <h3 className="font-bold text-text-primary mb-4">📆 Full Year Timeline</h3>
              <div className="space-y-1">
                {calData.months.map((monthData, idx) => (
                  <button
                    key={idx}
                    id={`timeline-${MONTHS[idx].toLowerCase()}`}
                    onClick={() => setSelectedMonth(idx)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200"
                    style={{ background: selectedMonth === idx ? '#F0FDF4' : 'transparent' }}
                  >
                    <div className="w-8 text-xs font-bold text-text-secondary text-left flex-shrink-0 flex items-center gap-1">
                      {MONTHS[idx]}
                      {idx === currentMonth && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2D6A4F' }} />}
                    </div>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {monthData.activities.map((act, i) => (
                        <span
                          key={i}
                          style={{ background: activityColors[act]?.bg || '#F3F4F6', color: activityColors[act]?.text || '#6B7280', fontSize: 10, padding: '1px 6px', borderRadius: 20, fontWeight: 600 }}
                        >
                          {activityColors[act]?.emoji} {activityColors[act]?.label}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Current Month Tasks */}
          <div className="col-span-1">
            <div className="card animate-slide-up">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-text-primary">{MONTHS[selectedMonth]} Tasks</h3>
                  <p className="text-xs text-text-secondary">{monthTasks.length} tasks for {crop}</p>
                </div>
                {monthTasks.length > 0 && (
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: '#2D6A4F' }}>{progress}%</div>
                    <div className="text-xs text-text-secondary">done</div>
                  </div>
                )}
              </div>

              {monthTasks.length > 0 && (
                <div className="progress-bar mb-4">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              )}

              {monthTasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">😴</div>
                  <p className="text-text-secondary text-sm">Rest period — no major tasks this month</p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 480 }}>
                  {monthTasks.map((task) => {
                    const done = completedTasks[task.id];
                    return (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-3 rounded-2xl transition-all duration-200"
                        style={{ background: done ? '#F0FDF4' : '#F8F9FA' }}
                      >
                        <button id={`task-${task.id}`} onClick={() => toggleTask(task.id)} className="flex-shrink-0 mt-0.5">
                          {done ? <CheckCircle size={20} style={{ color: '#2D6A4F' }} /> : <Circle size={20} style={{ color: '#D1D5DB' }} />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className={`text-sm font-semibold ${done ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                              {task.icon} {task.name}
                            </div>
                            <span className="badge flex-shrink-0 text-xs" style={{ background: task.priority === 'high' ? '#FEE2E2' : '#FEF3C7', color: task.priority === 'high' ? '#991B1B' : '#92400E' }}>
                              {task.priority === 'high' ? 'Urgent' : 'Normal'}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{task.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Upcoming Alerts */}
          <div className="col-span-1">
            <div className="animate-slide-up">
              <h3 className="section-header">⚠️ Upcoming Alerts (Next 30 Days)</h3>
              <div className="space-y-3">
                {upcomingAlerts.map((alert, i) => {
                  const style = PRIORITY_STYLES[alert.priority];
                  return (
                    <div key={i} id={`alert-${i}`} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: style.bg, border: `1.5px solid ${style.border}` }}>
                      <div className="text-2xl flex-shrink-0">{style.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: style.color }}>{alert.msg}</p>
                        <p className="text-xs mt-0.5" style={{ color: style.color, opacity: 0.7 }}>In {alert.days} days</p>
                      </div>
                      <span className="badge text-xs flex-shrink-0" style={{ background: style.border, color: style.color }}>{style.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Season Info */}
              <div className="card mt-4" style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', border: '1.5px solid #86EFAC' }}>
                <h4 className="font-bold text-green-800 mb-2">🌱 This Month Highlights</h4>
                <div className="space-y-1">
                  {(calData.months[selectedMonth]?.activities || []).map((act, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium" style={{ color: activityColors[act]?.text || '#6B7280' }}>
                      <span>{activityColors[act]?.emoji}</span>
                      <span>{activityColors[act]?.label}</span>
                    </div>
                  ))}
                  {calData.months[selectedMonth]?.activities?.length === 0 && (
                    <p className="text-sm text-green-700">Rest period — prepare for next season</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
