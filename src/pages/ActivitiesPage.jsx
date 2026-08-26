import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { PageHero, SectionHeader, Card, Badge } from '../components/ui';
import { activities, activityCategories } from '../data/activities';

const categoryLabels = {
  all: 'All',
  academic: 'Academic',
  cultural: 'Cultural',
  sports: 'Sports',
  competitions: 'Competitions',
  celebrations: 'Celebrations',
  social: 'Social',
};

const categoryColors = {
  academic: 'blue',
  cultural: 'purple',
  sports: 'green',
  competitions: 'orange',
  celebrations: 'blue',
  social: 'gray',
};

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ActivitiesPage() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? activities : activities.filter((a) => a.category === active);

  return (
    <div>
      <PageHero
        title="Activities & Events"
        subtitle="A vibrant co-curricular life that brings out the best in every student"
        breadcrumb="Activities"
        bgImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=85"
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Beyond Academics"
            title="Co-Curricular Activities"
            subtitle="We believe every student has a talent waiting to be discovered. Our diverse activity programmes give them the stage to shine."
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {activityCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  active === cat
                    ? 'bg-navy-800 text-white border-navy-700 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy-200 hover:text-amber-600'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((activity) => (
              <Card key={activity.id}>
                <div className="h-44 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={categoryColors[activity.category] || 'blue'}>
                      {categoryLabels[activity.category]}
                    </Badge>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm mb-2 leading-snug">{activity.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{activity.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg font-semibold">No activities found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
