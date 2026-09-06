'use client';

import PageHeader from '@/components/layout/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import { School } from '@/types';
import { usePagesCMS, useSiteSettings } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactClient({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  return (
    <>
      <PageHeader
        eyebrow={data.contactHeroEyebrow || 'Get in Touch'}
        title={data.contactHeroTitle || 'Contact Us & Campus Location'}
        subtitle={data.contactHeroSubtitle || 'We welcome parents, prospective students, and visitors to connect with our administrative and academic teams'}
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-6 h-px bg-amber-500" />
                  <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">Campus Address</p>
                  <span className="w-6 h-px bg-amber-500" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mb-4 leading-tight">
                  {settings.name}, Rohini
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {data.contactAddressIntro || 'Conveniently situated in Sector 3, Rohini, New Delhi, near Jaipur Golden Hospital and Madhuban Chowk, easily accessible via Red Line Delhi Metro (Rohini West & Rohini East stations).'}
                </p>
                {data.contactMetroLandmark && (
                  <p className="text-xs text-amber-800 font-semibold bg-amber-50 border border-amber-200/80 rounded-xl p-3 mt-3">
                    🚇 {data.contactMetroLandmark}
                  </p>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <MapPin size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-navy-950 text-base mb-1">Campus Address</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{settings.full_address}</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <Phone size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-navy-950 text-base mb-1">Phone Directory</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Office: <a href={`tel:${settings.phone_office}`} className="text-amber-700 font-semibold hover:underline">{settings.phone_office}</a><br />
                    Admissions: <a href={`tel:${settings.phone_admissions}`} className="text-amber-700 font-semibold hover:underline">{settings.phone_admissions}</a>
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <Mail size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-navy-950 text-base mb-1">Email Queries</h4>
                  <p className="text-slate-600 text-xs leading-relaxed truncate">
                    General: {settings.email_general}<br />
                    Admissions: {settings.email_admissions}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <Clock size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-navy-950 text-base mb-1">Office Hours</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    School: {settings.timings_school}<br />
                    Office: {settings.timings_office}
                  </p>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-72 relative bg-slate-100">
                <iframe
                  title="Decent Public School Rohini Map"
                  src={settings.map_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13998.455246755497!2d77.112111!3d28.701234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03da00000001%3A0x123456789abcdef!2sRohini%20Sector%203%2C%20Delhi!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
