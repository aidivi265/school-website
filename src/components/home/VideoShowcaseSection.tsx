'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { useStats } from '@/lib/cms/useCMS';
import { motion, useScroll, useTransform } from 'framer-motion';

export function VideoShowcaseSection() {
  const { stats } = useStats();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);

  // Parallax scroll effect for video container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.08]);

  // Pause video and disable animations when not in viewport to prevent lag
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting && isPlaying) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: '100px 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-slate-950 text-white my-16 border-y border-slate-800"
    >
      {/* Parallax Video Background */}
      <motion.div
        style={{ y, scale, willChange: 'transform' }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
          className="w-full h-full object-cover opacity-35"
        >
          {/* High quality compressed educational campus video */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Gradient Overlays for High Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 pointer-events-none" />

      {/* Floating Video Control Buttons */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg"
          title={isMuted ? 'Unmute Video' : 'Mute Video'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* Overlaid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-12">
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
              className="bg-slate-900/70 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl hover:border-amber-500/40 transition-all group"
            >
              <div className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-amber-400 mb-1 leading-tight group-hover:scale-105 transition-transform">
                <CountUpNumber value={s.value} duration={2000 + idx * 200} />
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
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Compass size={15} />
            Explore 360° Virtual Campus Tour
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all"
          >
            Apply for Admission 2025–26 <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
