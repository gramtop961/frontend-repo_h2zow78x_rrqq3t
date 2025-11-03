import { useState } from 'react';
import { HelpCircle, ChevronDown, Users, Shield, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'How is UniSync different from a regular calendar? ',
    a: 'UniSync adapts to your workload and deadlines. It suggests focus windows, highlights priorities, and lets you reschedule by dragging tasks around.'
  },
  {
    q: 'Can I add tasks by typing natural phrases?',
    a: 'Yes. You can type things like “Remind me to study for math tomorrow at 8 PM” and UniSync will place it on your schedule.'
  },
  {
    q: 'Does it support collaboration for group projects?',
    a: 'You can share plans with teammates to coordinate milestones and split tasks seamlessly.'
  },
  {
    q: 'Will my data be secure?',
    a: 'All data is encrypted at rest and in transit. You control what you share and with whom.'
  }
];

export default function FAQAndAbout() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-slate-600">
            <HelpCircle size={18} />
            <span className="font-medium">FAQs</span>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown className={`${open === i ? 'rotate-180' : ''} transition-transform`} />
                </button>
                {open === i && (
                  <div className="px-4 pb-4 text-sm text-slate-600">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-2 text-slate-600">
            <Users size={18} />
            <span className="font-medium">About Us</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-lg font-semibold">Built for students, by student-first designers.</p>
            <p className="mt-3 text-slate-600">
              UniSync is a passion project to reimagine academic scheduling. We blend Human-Computer Interaction principles with real student feedback to deliver a personal assistant that feels intuitive and delightful.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-center gap-2"><Sparkles className="text-indigo-600" size={16} /> Adaptive priorities that change as your term evolves.</li>
              <li className="flex items-center gap-2"><Shield className="text-indigo-600" size={16} /> Privacy-first architecture.</li>
              <li className="flex items-center gap-2"><Users className="text-indigo-600" size={16} /> Collaboration that respects your focus time.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
