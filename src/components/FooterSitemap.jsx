import { Github, Twitter, Mail, Star } from 'lucide-react';

const links = {
  Product: ['Overview', 'Scheduler', 'Assistant', 'Mobile App'],
  Company: ['About', 'Careers', 'Press'],
  Resources: ['Docs', 'Help Center', 'Community'],
  Legal: ['Privacy', 'Terms']
};

const testimonials = [
  {
    quote: 'UniSync helped our capstone team stay aligned. We stopped missing tiny deadlines.',
    name: 'Aarav P.',
    role: 'CS Major'
  },
  {
    quote: 'The adaptive nudges are a game changer. I actually use my free time well now.',
    name: 'Mia L.',
    role: 'Design Student'
  },
  {
    quote: 'Natural language adds make it effortless to capture thoughts on the go.',
    name: 'Diego S.',
    role: 'Engineering'
  }
];

export default function FooterSitemap() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center gap-2 text-slate-700">
              <Star className="text-yellow-500" />
              <span className="text-xl font-semibold">What students say</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-slate-700">“{t.quote}”</p>
                  <p className="mt-3 text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-4xl font-extrabold">900k+</p>
            <p className="text-slate-600">benefited from using UniSync</p>
            <p className="mt-4 text-sm text-slate-500">Live activity: 1,824 planning actions in the last hour.</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="mb-3 text-sm font-semibold text-slate-700">{title}</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {items.map((l) => (
                  <li key={l} className="cursor-pointer hover:text-indigo-600">{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} UniSync. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a aria-label="Twitter" className="hover:text-indigo-600" href="#"><Twitter size={18} /></a>
            <a aria-label="GitHub" className="hover:text-indigo-600" href="#"><Github size={18} /></a>
            <a aria-label="Email" className="hover:text-indigo-600" href="#"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
