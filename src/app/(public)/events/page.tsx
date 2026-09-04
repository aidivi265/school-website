import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import EventsClient from '@/components/events/EventsClient';
import { getEvents } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'Events & Annual Calendar | Celebrations & Sports',
  description:
    'Explore upcoming and past school events, sports days, science exhibitions, cultural functions, and celebrations at Decent Public School, Rohini.',
};

export default async function EventsPage() {
  const allEvents = await getEvents('all');

  return (
    <>
      <PageHeader
        eyebrow="Campus Life"
        title="School Events & Celebrations"
        subtitle="Celebrating sportsmanship, cultural creativity, science exhibitions, and national festivals"
        breadcrumbs={[{ label: 'Events' }]}
      />

      <section className="py-20 px-4 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <EventsClient initialEvents={allEvents} />
        </div>
      </section>
    </>
  );
}
