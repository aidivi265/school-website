import { PageHero, SectionHeader, Card } from '../components/ui';
import { schoolConfig } from '../config/schoolConfig';

const { name, email, phone, address } = schoolConfig;

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        title="Privacy Policy"
        subtitle={`How ${name} collects, protects, and respects your personal information`}
        breadcrumb="Privacy Policy"
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <SectionHeader
            eyebrow="Data Protection"
            title="Privacy & Data Policy"
            subtitle="Your privacy is important to us. This policy outlines how we handle student and parent information."
            center={false}
          />

          <Card hover={false} className="p-8 sm:p-10 space-y-6 text-slate-600 leading-relaxed text-sm">
            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">1. Information We Collect</h3>
              <p>
                We collect personal information when parents or guardians enquire about admissions, submit application forms, or interact with our school portal. This includes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
                <li>Student details (name, date of birth, previous academic records)</li>
                <li>Parent/guardian details (names, contact numbers, email addresses, residential address)</li>
                <li>Emergency contact information and relevant medical/dietary notes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">2. How We Use Your Information</h3>
              <p>
                Information collected is used solely for school administration, academic communication, safety notifications, and fulfilling regulatory requirements under CBSE guidelines. We do not sell, rent, or trade personal data to third parties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">3. Data Security</h3>
              <p>
                We employ appropriate administrative, technical, and physical security measures to safeguard all digital and physical records against unauthorised access, alteration, or disclosure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">4. Photography & Media Consent</h3>
              <p>
                Photographs and videos from school events, sports activities, and academic functions may be published on the school website or newsletters for informational and celebratory purposes. Parents may request exclusion of their child's media by notifying the school administration in writing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">5. Contact Us Regarding Privacy</h3>
              <p>
                If you have questions or concerns regarding our privacy practices, please contact our administrative office:
              </p>
              <div className="mt-3 p-4 bg-navy-50 rounded-xl text-navy-900 space-y-1">
                <p className="font-semibold">{name}</p>
                <p>{address.full}</p>
                <p>Email: <a href={`mailto:${email.general}`} className="text-amber-600 underline">{email.general}</a></p>
                <p>Phone: {phone.office}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
