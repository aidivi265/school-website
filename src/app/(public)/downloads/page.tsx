import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import DownloadsClient from '@/components/downloads/DownloadsClient';
import { getDocuments } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'Downloads & Circulars | Admission Forms, Calendar & Policies',
  description:
    'Download official admission forms, academic calendars, booklists, syllabus booklets, and school policies from Decent Public School, Rohini.',
};

export default async function DownloadsPage() {
  const documents = await getDocuments('all');

  return (
    <>
      <PageHeader
        eyebrow="Resource Hub"
        title="Downloads & Official Documents"
        subtitle="Access and download printable admission forms, academic planners, booklists, and policy circulars"
        breadcrumbs={[{ label: 'Downloads' }]}
      />

      <section className="py-20 px-4 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <DownloadsClient initialDocuments={documents} />
        </div>
      </section>
    </>
  );
}
