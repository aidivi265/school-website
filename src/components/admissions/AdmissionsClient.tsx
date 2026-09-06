'use client';

import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader } from '@/components/ui';
import EnquiryForm from '@/components/admissions/EnquiryForm';
import { FileText, ArrowRight } from 'lucide-react';
import { School } from '@/types';
import { usePagesCMS, useSiteSettings } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function AdmissionsClient({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  const steps = [
    {
      num: '01',
      title: data.admissionsStep1Title || 'Online Enquiry / Registration',
      desc: data.admissionsStep1Desc || 'Submit the online enquiry form on this page or collect the registration form from the school admission desk.',
    },
    {
      num: '02',
      title: data.admissionsStep2Title || 'Document Verification',
      desc: data.admissionsStep2Desc || 'Submit copies of birth certificate, residential proof, previous report cards, and photographs for preliminary verification.',
    },
    {
      num: '03',
      title: data.admissionsStep3Title || 'Student & Parent Interaction',
      desc: data.admissionsStep3Desc || 'An informal interaction for Pre-Primary applicants or a written proficiency assessment for Classes I to XI.',
    },
    {
      num: '04',
      title: data.admissionsStep4Title || 'Fee Payment & Enrolment',
      desc: data.admissionsStep4Desc || 'Upon confirmation of admission offer, pay the admission fee and collect the student kit, ID card, and academic calendar.',
    },
  ];

  const documents = [
    'Attested photocopy of Municipal Birth Certificate of the child',
    'Proof of Delhi residence (Voter ID / Aadhaar Card / Electricity bill / Passport)',
    'Recent passport-size photographs (4 of student, 2 of each parent)',
    'Original Transfer Certificate (TC) counter-signed by education officer (For Class II & above)',
    'Photocopy of previous class Report Card / Marksheet',
    'Medical fitness declaration and vaccination record',
    'Aadhaar card copy of student and parents',
  ];

  const ageMatrix = [
    { class: 'Pre-School (Nursery)', age: '3+ Years as on 31st March 2025' },
    { class: 'Pre-Primary (KG)', age: '4+ Years as on 31st March 2025' },
    { class: 'Class I', age: '5+ Years as on 31st March 2025' },
    { class: 'Class VI', age: '10+ Years as on 31st March 2025' },
    { class: 'Class IX', age: '13+ Years as on 31st March 2025' },
    { class: 'Class XI', age: 'Class X CBSE Board pass or equivalent' },
  ];

  return (
    <>
      <PageHeader
        eyebrow={data.admissionsHeroEyebrow || 'Admissions Open 2025–26'}
        title={data.admissionsHeroTitle || 'Admission Guidelines & Enquiry'}
        subtitle={data.admissionsHeroSubtitle || "Begin your child's journey towards academic excellence and holistic personality development"}
        breadcrumbs={[{ label: 'Admissions' }]}
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-10">
              {/* Introduction */}
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-6 h-px bg-amber-500" />
                  <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">
                    Welcome Parents
                  </p>
                  <span className="w-6 h-px bg-amber-500" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mb-4 leading-tight">
                  {data.admissionsWelcomeTitle || 'Join the Decent Public School Family'}
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                  {data.admissionsWelcomeText || 'We welcome admissions for the Academic Session 2025–26 from Pre-School (Nursery) to Class XI. We adhere strictly to the guidelines set by the Directorate of Education, Government of NCT of Delhi, and the Central Board of Secondary Education (CBSE).'}
                </p>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                    Admission Desk Timings
                  </p>
                  <p className="text-sm font-semibold text-navy-950">
                    {data.admissionsDeskTimings || 'Monday to Saturday: 8:30 AM to 4:00 PM'}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Direct Hotline: <strong>{settings.phone_admissions}</strong> / <strong>{settings.phone_office}</strong>
                  </p>
                </div>
              </div>

              {/* Age Criteria */}
              <div>
                <h3 className="font-serif font-bold text-2xl text-navy-950 mb-4">
                  Age Eligibility Matrix
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-navy-950 text-white font-serif">
                      <tr>
                        <th className="p-3.5">Class Applying</th>
                        <th className="p-3.5">Age Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {ageMatrix.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-semibold text-navy-950">{row.class}</td>
                          <td className="p-3.5 text-slate-600">{row.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h3 className="font-serif font-bold text-2xl text-navy-950 mb-4">
                  Documents Required at the Time of Admission
                </h3>
                <div className="space-y-2.5">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <FileText size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-xs sm:text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Brochure Link */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-950 to-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-500/30">
                <div>
                  <p className="font-serif font-bold text-lg text-white">Need Offline Registration Form?</p>
                  <p className="text-xs text-slate-300 mt-0.5">Download our printable registration form & brochure</p>
                </div>
                <Link
                  href="/downloads"
                  className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-5 py-2.5 rounded-xl text-xs whitespace-nowrap transition-colors flex items-center gap-1.5"
                >
                  Downloads Section <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Process */}
      <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Step-by-Step"
            title="Our Admission Process"
            subtitle="Simple, transparent, and hassle-free enrolment in 4 easy steps"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative overflow-hidden"
              >
                <span className="font-serif font-bold text-5xl text-amber-500/20 block mb-2 leading-none">
                  {s.num}
                </span>
                <h4 className="font-serif font-bold text-navy-950 text-lg mb-2">{s.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
