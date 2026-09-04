import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection & Safety',
  description:
    'Official privacy policy of Decent Public School, Rohini, Delhi. Information on student data protection, admission enquiry confidentiality, and online safety.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal & Compliance"
        title="Privacy Policy"
        subtitle="Our commitment to safeguarding student, parent, and visitor information"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose prose-slate text-sm sm:text-base leading-relaxed space-y-6">
          <p className="font-semibold text-navy-950">
            Last Updated: Academic Session 2025–26
          </p>

          <p>
            At <strong>Decent Public School</strong> (Sector 3, Rohini, Delhi 110085), we place utmost priority on the privacy, safety, and security of our students, parents, staff members, and website visitors. This Privacy Policy sets out how we collect, handle, protect, and utilize personal information collected via our website and administrative portals.
          </p>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            1. Information We Collect
          </h3>
          <p>
            We collect personal information when you interact with our website, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Parent / Guardian name, email address, phone number, and residential address submitted through the Admission Enquiry and Contact forms.</li>
            <li>Student details such as student name, date of birth, applying class, and previous academic background.</li>
            <li>Technical web analytics data such as IP address, browser type, and page access timestamps to improve website responsiveness and user experience.</li>
          </ul>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            2. How We Use Your Information
          </h3>
          <p>
            The information collected is used exclusively for legitimate educational and administrative purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processing admission applications, scheduling counselor interactions, and issuing admission confirmations.</li>
            <li>Responding to parent queries, attendance updates, academic circulars, and emergency transport notices.</li>
            <li>Enhancing website performance, safety, and compliance with Directorate of Education and CBSE regulations.</li>
          </ul>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            3. Non-Disclosure & Security
          </h3>
          <p>
            We do not sell, rent, trade, or disclose your personal data to third-party marketing agencies. Data is accessible solely to authorized administrative staff under strict confidentiality. We employ secure database encryption and Row Level Security (RLS) to prevent unauthorized access.
          </p>

          <h3 className="font-serif font-bold text-navy-950 text-xl pt-4">
            4. Contacting the Data Protection Officer
          </h3>
          <p>
            If you have any questions or concerns regarding our privacy practices or wish to update your records, please contact us at{' '}
            <a href="mailto:info@decentpublicschoolrohini.edu.in" className="text-amber-700 font-semibold underline">
              info@decentpublicschoolrohini.edu.in
            </a>{' '}
            or visit the school administration office during working hours.
          </p>
        </div>
      </section>
    </>
  );
}
