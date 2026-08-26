import { useState } from 'react';
import { CheckCircle, Download, Phone, ArrowRight } from 'lucide-react';
import { PageHero, SectionHeader, Card } from '../components/ui';
import { schoolConfig } from '../config/schoolConfig';

const { phone } = schoolConfig;

const steps = [
  { step: '01', title: 'Obtain Prospectus', desc: 'Download the school prospectus from our website or collect a physical copy from the school office.' },
  { step: '02', title: 'Fill Application Form', desc: 'Complete the Admission Enquiry Form online or collect the form from the Admissions Office.' },
  { step: '03', title: 'Document Submission', desc: 'Submit all required documents along with the completed application form at the school office.' },
  { step: '04', title: 'Interaction / Assessment', desc: 'The student and parents are invited for an informal interaction session with the academic team.' },
  { step: '05', title: 'Seat Confirmation', desc: 'Upon selection, the admission fee is deposited to confirm the seat. A welcome kit is provided.' },
  { step: '06', title: 'Welcome to School!', desc: 'Receive your child\'s timetable, book list, and induction schedule. Your journey begins!' },
];

const docs = [
  'Birth Certificate (Original + Photocopy)',
  'Transfer Certificate (TC) from previous school',
  'Mark Sheet / Progress Report Card (last 2 years)',
  'Aadhar Card of Student',
  'Aadhar Card of Parent / Guardian',
  'Passport-size Photographs (6 copies)',
  'Residence Proof (Aadhar / Voter ID / Electricity Bill)',
  'Caste Certificate (if applicable)',
];

const importantDates = [
  { label: 'Admission Form Available', date: 'October 15, 2024' },
  { label: 'Last Date to Submit Form', date: 'March 31, 2025' },
  { label: 'Interaction / Assessment', date: 'April 7–15, 2025' },
  { label: 'Result / Selection List', date: 'April 20, 2025' },
  { label: 'Fee Deposit Deadline', date: 'April 30, 2025' },
  { label: 'New Session Begins', date: 'April 1, 2025' },
];

export default function AdmissionsPage() {
  const [form, setForm] = useState({ parentName: '', studentName: '', classApplied: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div>
      <PageHero
        title="Admissions 2025–26"
        subtitle="Begin your child's journey towards academic excellence and holistic development"
        breadcrumb="Admissions"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=85"
      />

      {/* Admission Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="How to Apply" title="Admission Process" subtitle="A simple, transparent 6-step process" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="group p-7 rounded-2xl border border-slate-100 hover:border-navy-200 hover:bg-amber-50 transition-all duration-200 relative">
                <div className="text-5xl font-bold text-navy-200 group-hover:text-navy-200 absolute top-5 right-5 font-serif leading-none select-none">{s.step}</div>
                <div className="relative z-10">
                  <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mb-2">Step {s.step}</p>
                  <h3 className="font-bold text-navy-900 text-base mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility + Documents + Dates */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Eligibility */}
          <Card hover={false} className="p-7">
            <h3 className="font-bold text-navy-900 text-lg mb-5 pb-3 border-b border-slate-100">Age Eligibility</h3>
            <div className="space-y-3">
              {[
                { cls: 'Nursery', age: '3 years as of March 31' },
                { cls: 'LKG', age: '4 years as of March 31' },
                { cls: 'UKG', age: '5 years as of March 31' },
                { cls: 'Class I', age: '6 years as of March 31' },
                { cls: 'Class II–VIII', age: 'Age-appropriate + TC required' },
                { cls: 'Class IX–XI', age: 'Based on previous class result' },
              ].map((row) => (
                <div key={row.cls} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="font-semibold text-gray-800 text-sm">{row.cls}</span>
                  <span className="text-slate-500 text-xs text-right max-w-[60%]">{row.age}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Documents */}
          <Card hover={false} className="p-7">
            <h3 className="font-bold text-navy-900 text-lg mb-5 pb-3 border-b border-slate-100">Required Documents</h3>
            <ul className="space-y-2.5">
              {docs.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{d}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Important Dates */}
          <Card hover={false} className="p-7">
            <h3 className="font-bold text-navy-900 text-lg mb-5 pb-3 border-b border-slate-100">Important Dates</h3>
            <div className="space-y-4">
              {importantDates.map((d) => (
                <div key={d.label} className="flex items-start justify-between gap-2">
                  <span className="text-slate-600 text-sm flex-1">{d.label}</span>
                  <span className="text-navy-800 font-semibold text-sm whitespace-nowrap">{d.date}</span>
                </div>
              ))}
            </div>
            {/* Downloads */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-navy-800 text-white text-sm font-semibold py-3 rounded-xl hover:bg-navy-900 transition-colors">
                <Download size={16} /> Download Prospectus
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-navy-200 text-navy-800 text-sm font-semibold py-3 rounded-xl hover:bg-amber-50 transition-colors">
                <Download size={16} /> Download Admission Form
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* Admission Guidelines */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Please Read Carefully" title="Admission Guidelines" center={false} />
          <div className="bg-amber-50 border border-navy-100 rounded-2xl p-7">
            <ul className="space-y-3">
              {[
                'Admission is granted purely on merit and availability of seats.',
                'The school follows the Delhi Government / CBSE fee regulation guidelines.',
                'All admissions are subject to submission and verification of original documents.',
                'No donation or capitation fee of any kind is charged.',
                'Siblings of existing students are given preference, subject to seat availability.',
                'SC/ST/EWS seats are reserved as per Government guidelines (EWS 25%).',
                'Admission form must be filled in block letters and signed by both parents.',
                'Incomplete forms or forms without supporting documents will not be considered.',
                'The school reserves the right to cancel admission if incorrect information is found.',
              ].map((g) => (
                <li key={g} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-amber-600 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-slate-700 text-sm">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 px-4 bg-[#f8f9fc]" id="enquiry">
        <div className="max-w-2xl mx-auto">
          <SectionHeader eyebrow="Get In Touch" title="Admission Enquiry Form" subtitle="Fill in the details below and our admissions team will contact you within 24 hours." />

          {submitted ? (
            <Card hover={false} className="p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-navy-900 text-xl mb-2">Thank You!</h3>
              <p className="text-slate-600 mb-1">Your enquiry has been received.</p>
              <p className="text-slate-500 text-sm">Our admissions team will call you within 24 working hours.</p>
              <button onClick={() => { setSubmitted(false); setForm({ parentName: '', studentName: '', classApplied: '', phone: '', email: '', message: '' }); }}
                className="mt-6 text-amber-600 font-semibold text-sm hover:underline">
                Submit Another Enquiry
              </button>
            </Card>
          ) : (
            <Card hover={false} className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Parent's Name <span className="text-red-500">*</span></label>
                    <input required value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                      placeholder="Full name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Student's Name <span className="text-red-500">*</span></label>
                    <input required value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                      placeholder="Child's full name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class Applying For <span className="text-red-500">*</span></label>
                    <select required value={form.classApplied} onChange={(e) => setForm({ ...form, classApplied: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-white">
                      <option value="">Select Class</option>
                      {['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI (Science)', 'XI (Commerce)', 'XII (Science)', 'XII (Commerce)'].map((c) => (
                        <option key={c} value={c}>Class {c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message / Questions</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Any specific questions or requirements..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-navy-800 text-white font-bold py-3.5 rounded-xl hover:bg-navy-900 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <><ArrowRight size={16} /> Submit Enquiry</>
                  )}
                </button>
              </form>
            </Card>
          )}
        </div>
      </section>

      {/* Call CTA */}
      <section className="py-10 px-4 bg-navy-800">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left text-white">
          <div>
            <p className="font-bold text-xl">Prefer to Talk?</p>
            <p className="text-navy-200 text-sm">Our admissions counsellors are available Mon–Sat, 9AM–4PM.</p>
          </div>
          <a href={`tel:${phone.admissions.replace(/\s/g, '')}`} className="flex items-center gap-2 bg-white text-navy-800 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors whitespace-nowrap shadow-md">
            <Phone size={16} /> Call Us Now
          </a>
        </div>
      </section>
    </div>
  );
}
