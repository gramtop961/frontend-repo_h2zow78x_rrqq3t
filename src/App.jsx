import { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import SchedulerSection from './components/SchedulerSection';
import FAQAndAbout from './components/FAQAndAbout';
import FooterSitemap from './components/FooterSitemap';

function seedEvents() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const mk = (offsetDays, h, m, title, type) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offsetDays);
    d.setHours(h, m, 0, 0);
    return { id: `${title}-${d.getTime()}`.replace(/\s+/g, '-'), title, when: d, type };
  };
  return [
    mk(0, 9, 0, 'Math Lecture', 'lecture'),
    mk(0, 15, 0, 'AI Project Sprint', 'task'),
    mk(1, 10, 0, 'Physics Lecture', 'lecture'),
    mk(2, 11, 0, 'Group Meeting', 'task'),
    mk(3, 13, 0, 'CS Lecture', 'lecture'),
    mk(5, 18, 0, 'Write Essay Draft', 'task'),
  ];
}

export default function App() {
  const [items, setItems] = useState(seedEvents());

  const addItem = ({ title, when, type }) => {
    const id = `${title}-${when.getTime()}`.replace(/\s+/g, '-');
    setItems((prev) => [...prev, { id, title, when, type: type || 'task' }]);
  };

  const updateItem = (id, patch) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const upcoming = useMemo(() =>
    [...items].filter((i) => new Date(i.when) >= new Date()).sort((a,b) => new Date(a.when) - new Date(b.when)).slice(0, 3)
  , [items]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeroSection onQuickAdd={addItem} />
      <SchedulerSection items={items} onAdd={addItem} onUpdate={updateItem} upcoming={upcoming} />
      <FAQAndAbout />
      <FooterSitemap />
    </div>
  );
}
