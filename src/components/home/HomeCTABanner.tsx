'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Phone, MapPin } from 'lucide-react';
import { School } from '@/types';
import { usePagesCMS, useSiteSettings } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function HomeCTABanner({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=70"
          alt="School Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/98 via-navy-900/95 to-navy-950/95" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-amber-400/30 mb-7">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.2em]">
            {data.ctaBannerSubtitle || 'Admissions Open · Session 2025–26'}
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          {data.ctaBannerTitle || 'Give Your Child the Foundation for a Brilliant Future'}
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-9 max-w-xl mx-auto">
          Experience world-class education with personal mentoring, innovative labs, and ethical values in the heart of Rohini, Delhi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-9 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-2xl shadow-amber-900/50 text-base active:scale-[0.98]"
          >
            {data.ctaBannerButtonText || 'Admission Process & Enquiry'} <ArrowRight size={18} />
          </Link>
          <a
            href={`tel:${settings.phone_admissions}`}
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-9 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all text-base"
          >
            <Phone size={17} /> Call Admissions Desk
          </a>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-slate-400 text-xs">
          <span className="flex items-center justify-center gap-2">
            <Phone size={13} className="text-amber-400" /> {settings.phone_office}
          </span>
          <span className="flex items-center justify-center gap-2">
            <MapPin size={13} className="text-amber-400" /> {settings.full_address}
          </span>
        </div>
      </div>
    </section>
  );
}
