'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { School } from '@/types';
import { usePagesCMS, useSiteSettings } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function HomeAboutSection({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  const features = [
    'CBSE Affiliated Senior Secondary',
    'Smart Digital Classrooms',
    '110+ Dedicated Educators',
    'Advanced Science & AI Labs',
    'Comprehensive Sports Complex',
    'Safe GPS-Tracked Transport',
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        <div className="relative group">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy-950/15 relative">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=85"
              alt="Students learning at Decent Public School"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          {/* Stat Box Badges */}
          <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 shadow-2xl hidden sm:block animate-float-slow">
            <p className="font-serif text-3xl font-bold leading-none">{data.statStudents || '2,500+'}</p>
            <p className="text-amber-100 text-xs mt-1 font-medium">Students Enrolled</p>
          </div>
          <div className="absolute -top-6 -left-2 sm:-left-6 bg-navy-950 border border-amber-500/30 text-white rounded-2xl p-5 shadow-xl hidden sm:block">
            <p className="font-serif text-amber-400 text-2xl font-bold leading-none">{data.statExperience || '30+'} Yrs</p>
            <p className="text-slate-300 text-[11px] mt-0.5 uppercase tracking-wider">Educational Heritage</p>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-amber-500" />
            <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">
              {data.whyChooseUsEyebrow || 'About Our Institution'}
            </p>
            <span className="w-6 h-px bg-amber-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight mb-5">
            {data.whyChooseUsTitle || 'A Legacy of Academic Rigour & Character Building'}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {data.whyChooseUsP1 || (
              <>
                Welcome to <strong>{settings.name}</strong>, Rohini, an institution committed to providing world-class education rooted in traditional values and modern scientific temper. Since {settings.established}, we have created an inspiring ecosystem where students discover their true potential.
              </>
            )}
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            {data.whyChooseUsP2 || 'We believe education extends far beyond textbooks — it encompasses intellectual curiosity, physical agility, moral character, and empathy for society.'}
          </p>

          <div className="grid grid-cols-2 gap-3.5 mb-9">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-5 h-5 rounded-full bg-amber-100 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center flex-shrink-0 text-amber-700 transition-colors duration-200">
                  <CheckCircle size={13} />
                </div>
                <span className="text-slate-700 group-hover:text-navy-950 text-xs sm:text-sm font-medium transition-colors">{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="btn-shine-effect inline-flex items-center gap-2.5 bg-navy-950 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-900 transition-all duration-200 shadow-lg shadow-navy-950/20 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Read More About Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
