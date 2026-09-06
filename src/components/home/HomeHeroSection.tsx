'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar, Compass } from 'lucide-react';
import { School } from '@/types';
import { useSiteSettings, usePagesCMS, useStats } from '@/lib/cms/useCMS';
import { CountUpNumber } from '@/components/ui/CountUpNumber';

export default function HomeHeroSection({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const { pagesData } = usePagesCMS();
  const { stats } = useStats();

  const heroHeadline =
    pagesData?.heroHeadline || settings.hero_headline || 'Empowering Young Minds for a Better Tomorrow';
  const heroSubtext =
    pagesData?.heroSubtext ||
    settings.hero_subtext ||
    'A premier CBSE-affiliated co-educational institution in Rohini, Delhi, dedicated to academic excellence, value-driven character building, and holistic student growth since 1995.';

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 pb-16 sm:pb-20">
      {/* Background Campus Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=85"
          alt="Decent Public School Rohini Campus"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/98 via-navy-950/90 to-navy-900/85" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 32px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto space-y-8">
        <div className="max-w-3xl space-y-5">
          {/* Brand Badge Pill */}
          <div className="inline-flex items-center gap-2 bg-amber-500/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/40 shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.18em]">
              DECENT PUBLIC SCHOOL
            </span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
              <span className="text-gradient-gold block">
                {heroHeadline}
              </span>
            </h1>
          </div>

          {/* Tagline & Subtext */}
          <p className="text-amber-200 text-sm sm:text-base font-medium italic">
            "{settings.tagline || 'Inspiring Minds. Building Futures. Shaping Leaders.'}"
          </p>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
            {heroSubtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-xl shadow-amber-900/30 text-xs sm:text-sm active:scale-[0.98]"
            >
              Admission Enquiry 2025–26 <ArrowRight size={16} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-navy-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg text-xs sm:text-sm active:scale-[0.98]"
            >
              Explore Our School
            </Link>

            <Link
              href="/book-visit"
              className="inline-flex items-center justify-center gap-2 bg-navy-900/80 hover:bg-navy-800 text-white font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition-all text-xs sm:text-sm"
            >
              <Calendar size={15} className="text-amber-400" />
              Book Campus Visit
            </Link>
          </div>
        </div>

        {/* Live Interactive Stats Card Ribbon */}
        <div className="pt-4">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
              {stats.slice(0, 4).map((stat, i) => (
                <div key={stat.label} className={`${i !== 0 ? 'pt-2 sm:pt-0 sm:pl-4' : ''} space-y-0.5`}>
                  <div className="font-serif text-amber-400 font-bold text-2xl sm:text-3xl leading-tight">
                    <CountUpNumber value={stat.value} duration={1500 + i * 200} />
                  </div>
                  <div className="text-slate-300 text-[11px] font-medium uppercase tracking-wider leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
