'use client';

import { useEvents } from '@/lib/cms/useCMS';
import { EventItem } from '@/types';
import { SectionHeader, Badge, Card } from '@/components/ui';
import { formatEventDate } from '@/lib/utils';
import { MapPin, Clock, Calendar, Sparkles } from 'lucide-react';

export default function EventsClient({ initialEvents }: { initialEvents: EventItem[] }) {
  const { events: liveEvents } = useEvents(initialEvents);

  const publishedEvents = liveEvents.filter((e) => e.is_published !== false);
  const upcomingEvents = publishedEvents.filter((e) => e.status === 'upcoming');
  const pastEvents = publishedEvents.filter((e) => e.status === 'past');

  return (
    <div>
      {/* Upcoming Events Section */}
      <SectionHeader
        eyebrow="What's Coming Up"
        title="Upcoming School Events"
        subtitle="Mark your calendars for exciting academic competitions, sports meets, and cultural festivals"
      />

      {upcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {upcomingEvents.map((event) => {
            const { day, month, year } = formatEventDate(event.event_date);
            return (
              <Card key={event.id} className="flex flex-col group overflow-hidden">
                <div className="relative h-56 overflow-hidden bg-navy-950">
                  <img
                    src={event.cover_image_url || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="amber">{event.category}</Badge>
                  </div>
                  {/* Date Tag */}
                  <div className="absolute bottom-4 left-4 bg-navy-950 text-white rounded-xl px-3 py-1.5 border border-amber-400/40 flex items-center gap-2">
                    <span className="font-serif font-bold text-amber-400 text-lg leading-none">{day}</span>
                    <span className="text-xs font-bold uppercase">{month} {year}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-navy-950 text-lg mb-2 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-amber-600" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-amber-600" />
                        <span>{event.venue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 mb-16">
          <p className="text-slate-500 text-sm">No upcoming events scheduled right now.</p>
        </div>
      )}

      {/* Past Events Highlights */}
      <SectionHeader
        eyebrow="Memories"
        title="Past Event Highlights"
        subtitle="Memorable moments and milestone celebrations from previous sessions"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {pastEvents.map((event) => {
          const { day, month } = formatEventDate(event.event_date);
          return (
            <div
              key={event.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex items-start gap-4 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 rounded-xl bg-navy-950 text-white flex flex-col items-center justify-center flex-shrink-0 border border-amber-400/30">
                <span className="font-serif font-bold text-amber-400 text-xl leading-none">{day}</span>
                <span className="text-[10px] uppercase font-semibold">{month}</span>
              </div>
              <div>
                <Badge variant="navy" className="mb-2">{event.category}</Badge>
                <h4 className="font-serif font-bold text-navy-950 text-base mb-1">{event.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
