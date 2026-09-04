import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import NoticesClient from '@/components/notices/NoticesClient';
import { getNotices } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'News & Official Notices | Circulars & Announcements',
  description:
    'Stay updated with latest announcements, examination date sheets, vacation notices, and events from Decent Public School, Rohini.',
};

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <>
      <PageHeader
        eyebrow="Official Circulars"
        title="News & School Notices"
        subtitle="Access all official announcements, examination updates, holiday circulars, and achievement reports"
        breadcrumbs={[{ label: 'Notices' }]}
      />

      <section className="py-20 px-4 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <NoticesClient initialNotices={notices} />
        </div>
      </section>
    </>
  );
}
