import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import FAQClient from '@/components/faq/FAQClient';
import { getFAQs } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Admissions & Campus',
  description:
    'Find answers to common questions about admissions, fees, CBSE affiliation, bus transportation, school timings, and academic streams at Decent Public School, Rohini.',
};

export default async function FAQPage() {
  const faqs = await getFAQs('all');

  return (
    <>
      <PageHeader
        eyebrow="Help Desk & Answers"
        title="Frequently Asked Questions"
        subtitle="Quick answers regarding admission criteria, curriculum, transport routes, timings, and campus life"
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="py-20 px-4 bg-slate-50 min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          <FAQClient initialFaqs={faqs} />
        </div>
      </section>
    </>
  );
}
