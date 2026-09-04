'use client';

import Link from 'next/link';
import { ChevronRight, MapPin, Clock, ArrowRight } from 'lucide-react';
import { EventItem } from '@/types';
import { useEvents } from '@/lib/cms/useCMS';
import { Badge } from '@/components/ui';
import { formatEventDate } from '@/lib/utils';

export default function HomeEventsSection({ initialEvents }: { initialEvents: EventItem[] }) {
  const { events: liveEvents } = useEvents(initialEvents);

  const upcomingEvents = liveEvents
    .filter((e) => e.is_published !== false && e.status === 'upcoming')
    .slice(0, 3);

  return (
    <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">
                Campus Calendar
              </p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
              Upcoming Events & Celebrations
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-sm hover:text-amber-700 transition-colors"
          >
            View All Events <ChevronRight size={18} />
          </Link>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const { day, month, year } = formatEventDate(event.event_date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start sm:items-center gap-5">
                    {/* Date Block */}
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-navy-950 to-navy-900 border border-amber-400/40 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                      <span className="font-serif font-bold text-amber-400 text-2xl sm:text-3xl leading-none">
                        {day}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 mt-0.5">
                        {month} {year}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="amber">{event.category}</Badge>
                        <span className="text-xs text-slate-400">· Decent Public School</span>
                      </div>
                      <h3 className="font-serif font-bold text-navy-950 text-lg sm:text-xl leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
                    <div className="text-xs text-slate-500 space-y-1">
                      {event.time && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-amber-600" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.venue && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-amber-600" />
                          <span>{event.venue}</span>
                        </div>
                      )}
                    </div>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-1 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm"
                    >
                      Event Details <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No upcoming events scheduled right now.</p>
          </div>
        )}
      </div>
    </section>
  );
}
