'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { SchoolCrest } from '@/components/ui';
import { School } from '@/types';
import { useSiteSettings } from '@/lib/cms/useCMS';

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.014 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96C23 15.86 23 12 23 12s0-3.86-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
    </svg>
  );
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Our School', href: '/about' },
  { label: 'Academics & Pedagogy', href: '/academics' },
  { label: 'Faculty Directory', href: '/faculty' },
  { label: 'Campus Facilities', href: '/facilities' },
  { label: 'Admission Guidelines', href: '/admissions' },
];

const moreLinks = [
  { label: 'News & Notices', href: '/notices' },
  { label: 'Events Calendar', href: '/events' },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Student Achievements', href: '/achievements' },
  { label: 'Downloads & Circulars', href: '/downloads' },
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: 'Contact & Location', href: '/contact' },
];

export default function Footer({ school: initialSchool }: { school: School }) {
  const { settings: school } = useSiteSettings(initialSchool);
  const socialLinks = [
    { icon: IconFacebook, href: school.social_facebook || '#', label: 'Facebook' },
    { icon: IconInstagram, href: school.social_instagram || '#', label: 'Instagram' },
    { icon: IconTwitter, href: school.social_twitter || '#', label: 'Twitter' },
    { icon: IconYoutube, href: school.social_youtube || '#', label: 'YouTube' },
  ].filter((s) => s.href && s.href !== '#');

  return (
    <footer className="bg-navy-950 text-slate-300 relative mt-auto border-t-2 border-amber-500/30">
      {/* Admission CTA Ribbon */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 shadow-inner">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-navy-950 font-serif font-bold text-xl sm:text-2xl leading-tight">
              Admissions Open for Session 2025–26
            </p>
            <p className="text-navy-900 text-sm mt-1 font-medium">
              Pre-School (Nursery) to Class XI · Limited seats available across streams
            </p>
          </div>
          <Link
            href="/admissions"
            className="flex items-center gap-2 bg-navy-950 text-amber-400 font-bold px-7 py-3.5 rounded-xl hover:bg-navy-900 transition-all whitespace-nowrap shadow-xl text-sm active:scale-[0.98]"
          >
            Apply Online / Enquire <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* School Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3.5 mb-5">
              <SchoolCrest size={48} />
              <div>
                <p className="font-serif font-bold text-white text-lg leading-tight">{school.name}</p>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
                  {school.affiliation} Affiliated (No. {school.affiliation_no})
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              A premier co-educational institution in Sector 3, Rohini, Delhi, nurturing academic excellence, progressive values, and dynamic leadership since {school.established}.
            </p>
            <p className="text-xs text-amber-400/90 italic mb-6">"{school.tagline}"</p>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400 mr-1">Follow us:</span>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-navy-900 hover:bg-amber-500 text-slate-300 hover:text-navy-950 flex items-center justify-center transition-all duration-200 border border-navy-800"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h3 className="text-white font-serif font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-3.5 h-0.5 bg-amber-400" /> Explore
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-amber-500/60 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h3 className="text-white font-serif font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-3.5 h-0.5 bg-amber-400" /> Resources
            </h3>
            <ul className="space-y-2.5">
              {moreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-amber-500/60 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-serif font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-3.5 h-0.5 bg-amber-400" /> School Campus
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex gap-3 items-start">
                <MapPin size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                <span>{school.full_address}</span>
              </li>
              <li>
                <a
                  href={`tel:${school.phone_office}`}
                  className="flex gap-3 items-center hover:text-amber-400 transition-colors"
                >
                  <Phone size={16} className="text-amber-400 flex-shrink-0" />
                  <span>Office: {school.phone_office}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${school.phone_admissions}`}
                  className="flex gap-3 items-center hover:text-amber-400 transition-colors"
                >
                  <ShieldCheck size={16} className="text-amber-400 flex-shrink-0" />
                  <span>Admissions: {school.phone_admissions}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${school.email_general}`}
                  className="flex gap-3 items-center hover:text-amber-400 transition-colors"
                >
                  <Mail size={16} className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">{school.email_general}</span>
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Clock size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p>School: {school.timings_school}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Office: {school.timings_office}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-navy-800 to-transparent" />
      </div>

      {/* Copyright & Legal Bar */}
      <div className="py-6 px-4 sm:px-6 bg-navy-950/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {school.name}, Rohini, Delhi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <Link href="/terms" className="hover:text-amber-400 transition-colors">
              Terms & Disclaimer
            </Link>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <Link href="/admin" className="text-amber-400/80 hover:text-amber-300 font-semibold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
