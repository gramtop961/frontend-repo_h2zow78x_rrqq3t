import { useState } from 'react';
import { Rocket, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

function parseNaturalLanguage(input) {
  // Very lightweight parser handling a few common phrases
  const now = new Date();
  let title = input;
  let when = new Date(now);

  // Extract title before time hints if provided with quotes
  const quoted = input.match(/"([^"]+)"/);
  if (quoted) {
    title = quoted[1];
  }

  // tomorrow at 8 PM
  const m1 = input.match(/tomorrow\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (m1) {
    when.setDate(now.getDate() + 1);
    let h = parseInt(m1[1], 10);
    const mm = m1[2] ? parseInt(m1[2], 10) : 0;
    const ap = m1[3] ? m1[3].toLowerCase() : null;
    if (ap === 'pm' && h < 12) h += 12;
    if (ap === 'am' && h === 12) h = 0;
    when.setHours(h, mm, 0, 0);
    return { title, when };
  }

  // on YYYY-MM-DD at HH:MM
  const m2 = input.match(/on\s+(\d{4}-\d{2}-\d{2})\s+at\s+(\d{1,2}):(\d{2})/i);
  if (m2) {
    const [y, mo, d] = m2[1].split('-').map(Number);
    const h = parseInt(m2[2], 10);
    const mm = parseInt(m2[3], 10);
    when = new Date(y, mo - 1, d, h, mm, 0, 0);
    return { title, when };
  }

  // in X hours
  const m3 = input.match(/in\s+(\d+)\s+hours?/i);
  if (m3) {
    when.setHours(now.getHours() + parseInt(m3[1], 10));
    return { title, when };
  }

  // Default: same day, next hour
  when.setHours(now.getHours() + 1, 0, 0, 0);
  return { title, when };
}

export default function HeroSection({ onQuickAdd }) {
  const [query, setQuery] = useState('Remind me to study for math tomorrow at 8 PM');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const { title, when } = parseNaturalLanguage(query);
    onQuickAdd({ title, when, type: 'task' });
    setQuery('');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-fuchsia-500 blur-3xl" />
        <div className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-cyan-400 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-12">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm backdrop-blur">
            <Sparkles size={16} className="text-yellow-300" />
            <span>Adaptive. Conversational. Collaborative.</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            UniSync — Your Smart Academic Life Organizer
          </h1>
          <p className="mt-6 text-lg text-indigo-100">
            Stay ahead with intelligent scheduling, context-aware reminders, and gorgeous visual planning tools. Reduce stress, reclaim focus, and thrive.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
              <Rocket size={18} />
              <span>900k+ students benefited</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
              <MessageCircle size={18} />
              <span>Type to add plans instantly</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex w-full items-center gap-2 rounded-xl bg-white p-2 text-indigo-900 shadow-lg">
            <MessageCircle className="ml-2 text-indigo-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., \"Revise biology\" tomorrow at 7pm"
              className="w-full rounded-md px-3 py-3 outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 active:scale-[.98]"
            >
              Add
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div className="relative z-10 mt-12 grid flex-1 grid-cols-2 gap-4 lg:mt-0">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-indigo-100">Next up</p>
            <p className="mt-2 text-xl font-semibold">AI Project Sprint</p>
            <p className="text-sm text-indigo-200">Today • 3:00–5:00 PM</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-indigo-100">Focus suggestion</p>
            <p className="mt-2 text-xl font-semibold">Free 2h slot before class</p>
            <p className="text-sm text-indigo-200">Want to polish your essay?</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-indigo-100">Adaptive Mode</p>
            <p className="mt-2 text-indigo-50">Interface prioritizes urgent tasks and near deadlines based on your workload.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
