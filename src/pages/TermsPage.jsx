import { PageHero, SectionHeader, Card } from '../components/ui';
import { schoolConfig } from '../config/schoolConfig';

const { name, email, phone } = schoolConfig;

export default function TermsPage() {
  return (
    <div>
      <PageHero
        title="Terms of Use"
        subtitle={`Guidelines and conditions governing the use of the ${name} website`}
        breadcrumb="Terms of Use"
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <SectionHeader
            eyebrow="Website Usage"
            title="Terms & Conditions"
            subtitle="Please read these terms carefully before using our website."
            center={false}
          />

          <Card hover={false} className="p-8 sm:p-10 space-y-6 text-slate-600 leading-relaxed text-sm">
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">1. Acceptance of Terms</h3>
              <p>
                By accessing and using this website, you accept and agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use the website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">2. Accuracy of Information</h3>
              <p>
                While {name} makes every effort to ensure that the information on this website (including admission dates, notices, and fee policies) is accurate and up to date, the school reserves the right to make changes without prior notice.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">3. Intellectual Property</h3>
              <p>
                All content on this website, including text, graphics, logos, images, icons, and software, is the property of {name} or its content suppliers and is protected by applicable copyright and intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">4. Admission & Enquiries</h3>
              <p>
                Submitting an online admission enquiry or downloading a form does not guarantee admission. Admissions are subject to eligibility criteria, seat availability, document verification, and formal confirmation by the school.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">5. Questions & Feedback</h3>
              <p>
                For any queries regarding these terms of use, please reach out to our office at{' '}
                <a href={`mailto:${email.general}`} className="text-amber-600 underline font-medium">{email.general}</a> or call{' '}
                <a href={`tel:${phone.office}`} className="text-navy-900 font-semibold">{phone.office}</a>.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
