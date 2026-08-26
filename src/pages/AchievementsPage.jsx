import { useState } from 'react';
import { Award, Star, Trophy } from 'lucide-react';
import { PageHero, SectionHeader, Card, Badge } from '../components/ui';
import { achievements, stats } from '../data/achievements';

const categoryLabels = {
  academic: 'Academic',
  sports: 'Sports',
  cultural: 'Cultural',
  awards: 'Awards & Recognition',
};

const categoryColors = {
  academic: 'blue',
  sports: 'green',
  cultural: 'purple',
  awards: 'orange',
};

const categories = ['all', 'academic', 'sports', 'cultural', 'awards'];

export default function AchievementsPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? achievements : achievements.filter((a) => a.category === active);

  return (
    <div>
      <PageHero
        title="Achievements"
        subtitle="A proud record of excellence in academics, sports, arts, and beyond"
        breadcrumb="Achievements"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=85"
      />

      {/* Stats Banner */}
      <section className="py-14 px-4 bg-navy-950">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-bold font-serif text-white mb-1">{s.value}</p>
              <p className="text-navy-200 text-xs uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlighted Achievements */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Pride & Glory"
            title="Our Achievements"
            subtitle="Recognitions that reflect the hard work of our students, teachers, and the entire school community"
          />

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  active === cat
                    ? 'bg-navy-800 text-white border-navy-700'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy-200 hover:text-amber-600'
                }`}
              >
                {cat === 'all' ? 'All' : categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Card key={item.id} className={`p-7 ${item.highlight ? 'ring-2 ring-blue-200' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={categoryColors[item.category] || 'blue'}>{categoryLabels[item.category]}</Badge>
                  {item.highlight && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} className="fill-amber-400" />
                      <span className="text-xs font-semibold">Featured</span>
                    </div>
                  )}
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Award size={20} className="text-amber-600" />
                </div>
                <p className="text-amber-600 text-xs font-bold uppercase tracking-wide mb-1">{item.year}</p>
                <h3 className="font-bold text-navy-900 text-base mb-2 leading-snug">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {['academic', 'sports', 'cultural', 'awards'].map((cat) => {
        const items = achievements.filter((a) => a.category === cat);
        const highlights = items.filter((a) => a.highlight);
        if (highlights.length === 0) return null;
        return (
          <section key={cat} className={`py-16 px-4 ${cat === 'sports' ? 'bg-[#f8f9fc]' : cat === 'cultural' ? 'bg-white' : cat === 'awards' ? 'bg-[#f8f9fc]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Trophy size={28} className="text-amber-600" />
                <h2 className="font-serif text-2xl font-bold text-navy-900">{categoryLabels[cat]} Highlights</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {highlights.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                    <div className="w-12 h-12 bg-navy-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-amber-600 text-xs font-bold uppercase tracking-wide mb-1">{item.year}</p>
                      <h3 className="font-bold text-navy-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
