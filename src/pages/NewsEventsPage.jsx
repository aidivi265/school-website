import { useState } from 'react';
import { Calendar, Search, ChevronRight } from 'lucide-react';
import { PageHero, Card, Badge } from '../components/ui';
import { notices } from '../data/notices';
import { events } from '../data/events';
import { schoolConfig } from '../config/schoolConfig';

const { name } = schoolConfig;

const categoryColors = {
  Admissions: 'blue',
  Examination: 'orange',
  Holiday: 'green',
  Achievement: 'purple',
  Event: 'blue',
  Circular: 'gray',
  Academic: 'blue',
  Cultural: 'purple',
  Sports: 'green',
  Celebration: 'orange',
};

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function EventCard({ event }) {
  const date = new Date(event.date);
  return (
    <Card className="flex flex-col sm:flex-row overflow-hidden">
      <div className="sm:w-48 h-40 sm:h-auto overflow-hidden flex-shrink-0">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex items-stretch flex-1">
        <div className="bg-navy-800 text-white w-16 flex flex-col items-center justify-center flex-shrink-0 p-3">
          <span className="text-xl font-bold leading-none">{date.getDate()}</span>
          <span className="text-navy-200 text-xs uppercase">{date.toLocaleString('en-IN', { month: 'short' })}</span>
          <span className="text-blue-300 text-xs">{date.getFullYear()}</span>
        </div>
        <div className="p-5 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant={categoryColors[event.category] || 'blue'}>{event.category}</Badge>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-slate-500'}`}>
              {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
            </span>
          </div>
          <h3 className="font-bold text-navy-900 text-base mb-1">{event.title}</h3>
          <p className="text-slate-500 text-sm mb-2">{event.venue}</p>
          <p className="text-slate-500 text-sm line-clamp-2">{event.description}</p>
        </div>
      </div>
    </Card>
  );
}

export default function NewsEventsPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('news');
  const [noticeFilter, setNoticeFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');

  const noticeCategories = ['all', ...new Set(notices.map((n) => n.category))];
  const filteredNotices = notices
    .filter((n) => noticeFilter === 'all' || n.category === noticeFilter)
    .filter((n) => !query || n.title.toLowerCase().includes(query.toLowerCase()));

  const filteredEvents = events
    .filter((e) => eventFilter === 'all' || e.status === eventFilter)
    .filter((e) => !query || e.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHero
        title="News & Events"
        subtitle={`Stay updated with the latest happenings at ${name}`}
        breadcrumb="News & Events"
        bgImage="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=85"
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Search + Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            <div className="flex border border-slate-200 rounded-xl overflow-hidden">
              {[{ id: 'news', label: 'News & Notices' }, { id: 'events', label: 'Events' }].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-semibold transition-colors ${activeTab === tab.id ? 'bg-navy-800 text-white' : 'text-slate-600 hover:bg-[#f8f9fc]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news or events..."
                className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent w-64 transition-all"
              />
            </div>
          </div>

          {activeTab === 'news' && (
            <>
              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {noticeCategories.map((cat) => (
                  <button key={cat} onClick={() => setNoticeFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all border ${noticeFilter === cat ? 'bg-navy-800 text-white border-navy-700' : 'bg-white text-slate-600 border-slate-200 hover:border-navy-200'}`}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>

              {/* Notice Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotices.map((notice) => (
                  <Card key={notice.id}>
                    <div className="h-44 overflow-hidden">
                      <img src={notice.image} alt={notice.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={categoryColors[notice.category] || 'blue'}>{notice.category}</Badge>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <Calendar size={11} />{formatDate(notice.date)}
                        </span>
                      </div>
                      <h3 className="font-bold text-navy-900 text-sm mb-2 leading-snug">{notice.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-3">{notice.description}</p>
                      <button className="text-amber-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        Read More <ChevronRight size={12} />
                      </button>
                    </div>
                  </Card>
                ))}
                {filteredNotices.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-slate-400">No notices found matching your search.</div>
                )}
              </div>
            </>
          )}

          {activeTab === 'events' && (
            <>
              {/* Upcoming / Past filter */}
              <div className="flex gap-2 mb-8">
                {[{ id: 'all', label: 'All Events' }, { id: 'upcoming', label: 'Upcoming' }, { id: 'past', label: 'Past Events' }].map((f) => (
                  <button key={f.id} onClick={() => setEventFilter(f.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${eventFilter === f.id ? 'bg-navy-800 text-white border-navy-700' : 'bg-white text-slate-600 border-slate-200 hover:border-navy-200'}`}>
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}
                {filteredEvents.length === 0 && (
                  <div className="text-center py-12 text-slate-400">No events found matching your search.</div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
