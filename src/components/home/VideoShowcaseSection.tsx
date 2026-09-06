'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { useStats } from '@/lib/cms/useCMS';

export function VideoShowcaseSection() {
  const { stats } = useStats();

  return (
    <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-slate-950 text-white my-12 sm:my-16 border-y border-slate-800">
      {/* High Performance Background Campus Visual */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=75&auto=format"
          alt="Decent Public School Campus Experience"
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-30"
        />
      </div>

      {/* Optimized Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/90 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-10">
        {/* Top Header */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-400 text-xs uppercase tracking-widest font-bold">
            <Sparkles size={13} />
            Experience Life at Decent Public School
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            Where Curiosity Meets <span className="text-amber-400">Academic Mastery</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            From smart classroom conceptual discoveries and Atal Tinkering robotics innovation to national athletics championships — our vibrant campus pulsates with limitless student potential.
          </p>
        </div>

        {/* Live Interactive CountUp Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl hover:border-amber-500/40 transition-colors group"
            >
              <div className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-amber-400 mb-1 leading-tight">
                <CountUpNumber value={s.value} duration={1600 + idx * 150} />
              </div>
              <div className="w-6 h-0.5 bg-amber-500/60 mx-auto mb-2" />
              <div className="text-[11px] text-slate-300 font-medium leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/virtual-tour"
            className="btn-shine-effect inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 transition-transform active:scale-[0.98]"
          >
            <Compass size={15} />
            Explore 360° Virtual Campus Tour
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-colors"
          >
            Apply for Admission 2025–26 <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
