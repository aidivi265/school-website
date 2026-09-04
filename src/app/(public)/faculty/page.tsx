import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import FacultyClient from '@/components/faculty/FacultyClient';
import { getFaculty } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'Faculty Directory | Experienced Educators',
  description:
    'Meet the dedicated faculty and leadership at Decent Public School, Rohini, Delhi. Qualified subject experts committed to student excellence.',
};

export default async function FacultyPage() {
  const facultyList = await getFaculty();

  return (
    <>
      <PageHeader
        eyebrow="Our Educators"
        title="Faculty & Mentors"
        subtitle="A distinguished team of passionate, highly qualified teachers committed to inspiring every student"
        breadcrumbs={[{ label: 'Faculty' }]}
      />

      <section className="py-20 px-4 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <FacultyClient initialFaculty={facultyList} />
        </div>
      </section>
    </>
  );
}
