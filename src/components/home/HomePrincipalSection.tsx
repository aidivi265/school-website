'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui';
import { usePagesCMS } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function HomePrincipalSection() {
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  const principal = {
    name: data.principalName || 'Dr. Ananya Sharma',
    designation: data.principalDesignation || 'Principal, Decent Public School',
    qualification: data.principalQualification || 'M.Ed., Ph.D. (Education), UGC-NET',
    image: data.principalPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
    message: [
      data.principalMessageP1 || 'At Decent Public School, Rohini, we believe that education is not the filling of a pail, but the lighting of a fire. Every child is blessed with infinite potential, boundless curiosity, and a distinct brilliance waiting to be discovered and shaped.',
      data.principalMessageP2 || 'Over the past three decades, we have fostered an inspiring campus environment where rigorous CBSE academics harmoniously blend with sportsmanship, artistic expression, moral ethics, and scientific inquiry.',
      data.principalMessageP3 || 'We welcome you to partner with us as we guide your child on an exciting journey of discovery, character building, and outstanding achievement.',
    ].filter(Boolean),
  };

  return (
    <section className="py-24 px-4 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Leadership"
          title="Principal's Message"
          subtitle="Guiding young minds towards academic brilliance, compassion, and progressive leadership"
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
            <div className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row gap-10 items-start">
                {/* Photo */}
                <div className="flex-shrink-0 text-center sm:text-left mx-auto sm:mx-0">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden mx-auto sm:mx-0 shadow-xl ring-4 ring-amber-100 border-2 border-white">
                    <img
                      src={principal.image}
                      alt={principal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-serif font-bold text-navy-950 text-base">{principal.name}</p>
                    <p className="text-amber-600 text-xs font-semibold mt-0.5">{principal.designation}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{principal.qualification}</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1">
                  <svg className="w-10 h-8 text-amber-300 mb-4" viewBox="0 0 48 36" fill="currentColor">
                    <path d="M0 36V22.5C0 14.833 2.583 8.917 7.75 4.75 12.917.583 20.083-1 29.25 0l1.5 5.25C25.083 4.417 20.75 5.5 17.5 8.5 14.25 11.5 12.5 15.5 12.5 20.5V36H0zm28 0V22.5c0-7.667 2.583-13.583 7.75-17.75C40.917.583 48.083-1 57.25 0l1.5 5.25C53.083 4.417 48.75 5.5 45.5 8.5c-3.25 3-5 7-5 12V36H28z" />
                  </svg>

                  {principal.message.map((para, i) => (
                    <p key={i} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">With warm regards,</p>
                      <p className="font-serif font-bold text-navy-950 text-lg mt-0.5">{principal.name}</p>
                    </div>
                    <Link
                      href="/faculty"
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      Meet Our Faculty <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
