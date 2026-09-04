import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Terms of Use & Disclaimer | Official Policies',
  description:
    'Website terms of use, copyright notices, and disclaimers for Decent Public School, Rohini, Delhi.',
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use & Disclaimer"
        subtitle="Standard conditions governing the use of the Decent Public School website and portal"
        breadcrumbs={[{ label: 'Terms of Use' }]}
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose prose-slate text-sm sm:text-base leading-relaxed space-y-6">
          <p className="font-semibold text-navy-950">
            Effective Date: Academic Session 2025–26
          </p>

          <p>
            Welcome to the official website of <strong>Decent Public School</strong> (Rohini, Delhi). By browsing or using this website, you agree to comply with and be bound by the following terms and conditions of use.
          </p>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            1. Intellectual Property & Copyright
          </h3>
          <p>
            All content, including text, photographs, crest emblems, logos, downloadable circulars, brochures, graphics, and layout on this website, is the exclusive intellectual property of Decent Public School. Reproduction, distribution, or unauthorized commercial extraction without prior written consent is strictly prohibited.
          </p>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            2. Accuracy of Information
          </h3>
          <p>
            While every effort is made to keep circulars, fee notifications, admission criteria, and academic date sheets up-to-date, parents and guardians are advised that official notifications on the school physical notice board and direct circulars issued by the Principal take precedence in case of any discrepancy.
          </p>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            3. Online Admission Enquiries
          </h3>
          <p>
            Submission of an online admission enquiry or downloading a prospectus does not guarantee automatic admission. Admissions are subject to seat availability, document validation, and compliance with Directorate of Education guidelines.
          </p>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            4. Jurisdiction
          </h3>
          <p>
            Any dispute arising out of the use of this website or school admissions shall be subject to the exclusive jurisdiction of the competent courts in Delhi, India.
          </p>
        </div>
      </section>
    </>
  );
}
