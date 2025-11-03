import { useMemo, useState } from 'react';
import { Calendar as CalendarIcon, Clock, GripVertical, Plus, CheckCircle } from 'lucide-react';

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function getMonthMatrix(date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const startDay = (start.getDay() + 6) % 7; // make Monday=0
  const daysInMonth = end.getDate();
  const weeks = [];
  let current = 1 - startDay;
  while (current <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(date.getFullYear(), date.getMonth(), current);
      week.push(d);
      current++;
    }
    weeks.push(week);
  }
  return weeks;
}

function formatDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function SchedulerSection({ items, onAdd, onUpdate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('13:00');

  const matrix = useMemo(() => getMonthMatrix(currentMonth), [currentMonth]);

  const itemsByDay = useMemo(() => {
    const map = {};
    for (const it of items) {
      const key = formatDateKey(new Date(it.when));
      if (!map[key]) map[key] = [];
      map[key].push(it);
    }
    return map;
  }, [items]);

  const todayKey = formatDateKey(new Date());

  const handleDrop = (e, day) => {
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    const time = newTime || '12:00';
    const [hh, mm] = time.split(':').map(Number);
    const when = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hh, mm, 0, 0);
    onUpdate(id, { when });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const [hh, mm] = newTime.split(':').map(Number);
    const d = new Date();
    const when = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hh, mm, 0, 0);
    onAdd({ title: newTitle, when, type: 'task' });
    setNewTitle('');
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Schedule</h2>
          <p className="text-slate-500">Plan with a calendar, then focus on what matters today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          >
            ◀
          </button>
          <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm">
            {currentMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
          </div>
          <button
            className="rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          >
            ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="order-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:order-1 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-slate-600">
            <CalendarIcon size={18} />
            <span className="font-medium">Calendar</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-slate-500">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-2">
            {matrix.flat().map((day, idx) => {
              const inMonth = day.getMonth() === currentMonth.getMonth();
              const key = formatDateKey(day);
              return (
                <div
                  key={idx}
                  className={`min-h-[90px] rounded-lg border p-2 text-sm ${inMonth ? 'bg-white' : 'bg-slate-50 text-slate-400'} border-slate-200`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, day)}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className={`text-xs ${key === todayKey ? 'rounded bg-indigo-600 px-2 py-0.5 font-semibold text-white' : 'text-slate-500'}`}>
                      {day.getDate()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {(itemsByDay[key] || []).slice(0, 3).map((it) => (
                      <div
                        key={it.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', it.id)}
                        className={`group flex cursor-grab items-center gap-2 rounded-md px-2 py-1 text-xs ${it.type === 'lecture' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'}`}
                        title="Drag to reschedule"
                      >
                        <GripVertical size={14} className="text-slate-400" />
                        <span className="truncate">{it.title}</span>
                      </div>
                    ))}
                    {(itemsByDay[key] || []).length > 3 && (
                      <div className="text-[11px] text-slate-400">+{(itemsByDay[key].length - 3)} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-1 space-y-6 lg:order-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-slate-600">
              <Clock size={18} />
              <span className="font-medium">Today</span>
            </div>
            <ul className="space-y-3">
              {(itemsByDay[todayKey] || []).length === 0 && (
                <li className="text-sm text-slate-500">Nothing scheduled. Use your time wisely ✨</li>
              )}
              {(itemsByDay[todayKey] || [])
                .sort((a,b) => new Date(a.when) - new Date(b.when))
                .map((it) => (
                <li key={it.id} className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${it.type === 'lecture' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                  <div>
                    <p className="text-sm font-medium">{it.title}</p>
                    <p className="text-xs text-slate-500">{new Date(it.when).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-slate-600">
              <Plus size={18} />
              <span className="font-medium">Quick create</span>
            </div>
            <form onSubmit={handleCreate} className="flex flex-col gap-2">
              <input
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="Task title (e.g., Read Ch.5)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500">Time</label>
                <input
                  type="time"
                  className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                <CheckCircle size={16} /> Add to Today
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
