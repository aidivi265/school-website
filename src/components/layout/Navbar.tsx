'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, GraduationCap, ArrowRight } from 'lucide-react';
import { SchoolCrest } from '@/components/ui';
import { School } from '@/types';
import { useSiteSettings } from '@/lib/cms/useCMS';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Notices', href: '/notices' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export default function Navbar({ school: initialSchool }: { school: School }) {
  const { settings: school } = useSiteSettings(initialSchool);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-[0_4px_24px_rgba(14,30,66,0.12)] border-b border-slate-100'
            : 'bg-white shadow-sm'
        }`}
      >
        {/* Top Info Strip */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white text-xs hidden lg:block border-b border-amber-500/25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-amber-300 font-medium">
              <GraduationCap size={15} className="text-amber-400" />
              <span>
                {school.name} · {school.affiliation} Affiliated (No. {school.affiliation_no}) · Sector 3, Rohini, Delhi
              </span>
            </div>
            <div className="flex items-center gap-6 text-slate-300 text-xs">
              <a
                href={`tel:${school.phone_office}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Phone size={12} className="text-amber-400" />
                <span>{school.phone_office}</span>
              </a>
              <span className="w-px h-3.5 bg-navy-700" />
              <a
                href={`mailto:${school.email_general}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Mail size={12} className="text-amber-400" />
                <span>{school.email_general}</span>
              </a>
              <span className="w-px h-3.5 bg-navy-700" />
              <Link
                href="/admin"
                className="text-[11px] font-semibold text-amber-400 hover:text-white transition-colors"
              >
                Portal / Admin Login →
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[4.25rem]">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <SchoolCrest size={44} />
              <div>
                <div className="font-serif font-bold text-navy-950 text-base sm:text-lg leading-tight tracking-tight group-hover:text-amber-700 transition-colors">
                  {school.name}
                </div>
                <div className="text-[11px] text-amber-700 font-bold uppercase tracking-wider leading-tight mt-0.5">
                  Rohini, Delhi · {school.affiliation} Affiliated
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2.5 py-3 text-[13px] font-medium transition-colors whitespace-nowrap group ${
                      isActive ? 'text-amber-600 font-bold' : 'text-slate-700 hover:text-navy-950'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-amber-500 rounded-full transition-all duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/admissions"
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-md shadow-amber-500/25 whitespace-nowrap active:scale-[0.98]"
              >
                Admission Enquiry <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-2 rounded-xl text-navy-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[300px] sm:w-[340px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-navy-950 to-navy-900 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <SchoolCrest size={38} />
            <div>
              <p className="font-serif font-bold text-white text-sm leading-tight">{school.name}</p>
              <p className="text-amber-400 text-[10px] font-semibold uppercase tracking-wider">Rohini, Delhi</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-navy-950 text-amber-400 font-bold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-navy-950'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <Link
            href="/admissions"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all text-sm shadow-md"
          >
            Admission Enquiry <ArrowRight size={15} />
          </Link>
          <div className="text-xs text-slate-600 space-y-1.5 pt-1">
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-amber-600" />
              <span>{school.phone_office}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-amber-600" />
              <span className="truncate">{school.email_general}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
