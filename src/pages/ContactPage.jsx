import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

function IconFacebook() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function IconInstagram() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
function IconTwitter() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.014 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function IconYoutube() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96C23 15.86 23 12 23 12s0-3.86-.46-5.58zM9.75 15.02V8.98L15.5 12z"/></svg>;
}
import { PageHero, SectionHeader, Card } from '../components/ui';
import { schoolConfig } from '../config/schoolConfig';

const { address, phone, email, timings } = schoolConfig;

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for admissions, queries, or to schedule a campus visit."
        breadcrumb="Contact"
        bgImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1600&q=85"
      />

      {/* Info Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: MapPin,
              title: 'Our Address',
              lines: [address.line1 + ', ' + address.line2 + ',', address.city + ' – ' + address.pin],
            },
            {
              icon: Phone,
              title: 'Phone Numbers',
              lines: [phone.office + ' (Office)', phone.admissions + ' (Admissions)'],
            },
            {
              icon: Mail,
              title: 'Email',
              lines: [email.general, email.admissions],
            },
            {
              icon: Clock,
              title: 'Working Hours',
              lines: [timings.school, timings.office],
            },
          ].map(({ icon: Icon, title, lines }) => (
            <div key={title} className="flex gap-4 p-6 rounded-2xl border border-slate-100 hover:border-navy-200 hover:bg-amber-50 transition-all duration-200">
              <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-navy-900 text-sm mb-1">{title}</p>
                {lines.map((l) => <p key={l} className="text-slate-500 text-xs">{l}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-10 px-4 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 min-h-[400px]">
            <iframe
              title="School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.5!2d77.1!3d28.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzAwLjAiTiA3N8KwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              className="w-full h-full min-h-[400px] border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Form */}
          <div>
            <div className="mb-6">
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-1">Send a Message</p>
              <h2 className="font-serif text-2xl font-bold text-navy-900">Get in Touch</h2>
            </div>
            {submitted ? (
              <Card hover={false} className="p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="font-bold text-navy-900 text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-500 text-sm">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="mt-5 text-amber-600 font-semibold text-sm hover:underline">
                  Send Another Message
                </button>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name <span className="text-red-500">*</span></label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
                  <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all bg-white">
                    <option value="">Select Subject</option>
                    <option>Admission Enquiry</option>
                    <option>General Query</option>
                    <option>Campus Visit</option>
                    <option>Fee Structure</option>
                    <option>Transport Query</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your message here..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-navy-800 text-white font-bold py-3.5 rounded-xl hover:bg-navy-900 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeader eyebrow="Connect With Us" title="Follow Us on Social Media" subtitle="Stay connected for daily updates, achievements, and school events." />
          <div className="flex justify-center gap-4">
            {[
              { icon: IconFacebook, href: '#', label: 'Facebook', color: 'bg-amber-600 hover:bg-navy-800' },
              { icon: IconInstagram, href: '#', label: 'Instagram', color: 'bg-pink-600 hover:bg-pink-700' },
              { icon: IconTwitter, href: '#', label: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600' },
              { icon: IconYoutube, href: '#', label: 'YouTube', color: 'bg-red-600 hover:bg-red-700' },
            ].map(({ icon: Icon, href, label, color }) => (
              <a key={label} href={href} aria-label={label}
                className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-white transition-colors shadow-sm`}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
