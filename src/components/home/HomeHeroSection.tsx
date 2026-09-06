'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { School } from '@/types';
import { useSiteSettings, usePagesCMS, useStats } from '@/lib/cms/useCMS';
import { CountUpNumber } from '@/components/ui/CountUpNumber';

export default function HomeHeroSection({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const { pagesData } = usePagesCMS();
  const { stats } = useStats();

  const heroHeadline = pagesData?.heroHeadline || settings.hero_headline || 'Empowering Young Minds for a Better Tomorrow';
  const heroSubtext = pagesData?.heroSubtext || settings.hero_subtext || 'A premier CBSE-affiliated co-educational institution in Rohini, Delhi, dedicated to academic excellence, value-driven character building, and holistic student growth since 1995.';

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=85"
          alt="Decent Public School Rohini Campus"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/90 to-navy-950/80" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 32px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Affiliation Pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/30 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-[11px] font-bold uppercase tracking-[0.18em]">
              {settings.affiliation || 'CBSE'} Affiliated (No. {settings.affiliation_no || '2730248'}) · Sector 3, Rohini
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif leading-tight mb-4 text-white">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {settings.name?.toUpperCase() || 'DECENT PUBLIC SCHOOL'}
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-gold mt-1.5">
              {heroHeadline}
            </span>
          </h1>

          <p className="text-amber-200 text-sm sm:text-base font-light italic mb-3">
            "{settings.tagline || 'Inspiring Minds. Building Futures. Shaping Leaders.'}"
          </p>
          <p className="text-slate-200 text-xs sm:text-sm sm:leading-relaxed mb-8 max-w-xl">
            {heroSubtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-950 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition-all shadow-lg text-xs sm:text-sm active:scale-[0.98]"
            >
              Explore Our School <ArrowRight size={16} />
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-bold px-6 py-3 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-900/30 text-xs sm:text-sm active:scale-[0.98]"
            >
              Admission Enquiry 2025–26
            </Link>
          </div>

          {/* Quick Stat Highlights with CountUp */}
          <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap gap-6 sm:gap-8">
            {stats.slice(0, 4).map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="font-serif text-amber-400 font-bold text-xl sm:text-2xl">
                  <CountUpNumber value={stat.value} duration={1500 + i * 200} />
                </span>
                <span className="text-slate-300 text-[11px] font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
