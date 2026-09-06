'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  Mail,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  Compass,
  Trophy,
  Users,
  BookOpen,
  Sparkles,
  Calculator,
  Search,
  FileDown,
  Building,
  Image as ImageIcon,
  Bell,
  Briefcase,
  HelpCircle,
  Calendar,
  Award,
} from 'lucide-react';
import { SchoolCrest } from '@/components/ui';
import { School } from '@/types';
import { useSiteSettings } from '@/lib/cms/useCMS';
import { motion, AnimatePresence } from 'framer-motion';
import { AccessibilityToolbar } from '@/components/layout/AccessibilityToolbar';
import LiveNoticeTicker from '@/components/layout/LiveNoticeTicker';

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: any;
  badge?: string;
}

interface NavCategory {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navCategories: NavCategory[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    dropdown: [
      {
        label: 'School Vision & Legacy',
        href: '/about',
        description: 'Our heritage, mission, and 30+ years of CBSE educational excellence.',
        icon: Building,
      },
      {
        label: 'Principal & Leadership Desk',
        href: '/about#leadership',
        description: 'Inspiring message from Principal Dr. Ananya Sharma.',
        icon: Users,
      },
      {
        label: 'Alumni Network & Hall of Fame',
        href: '/alumni',
        description: 'Inspiring alumni across IITs, AIIMS, and global leaders.',
        icon: Award,
        badge: 'Spotlight',
      },
      {
        label: '360° Virtual Campus Tour',
        href: '/virtual-tour',
        description: 'Interactive panoramic zones, hotspots, and voice audio tour.',
        icon: Compass,
        badge: 'Interactive',
      },
      {
        label: 'House System & Leaderboard',
        href: '/house-system',
        description: 'Agni, Trishul, Prithvi, and Akash Houses with live points table.',
        icon: Trophy,
      },
      {
        label: 'Faculty & Mentors Directory',
        href: '/faculty',
        description: 'Meet our dedicated CBSE PGT, TGT, and PRT subject masters.',
        icon: GraduationCap,
      },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    dropdown: [
      {
        label: 'CBSE Curriculum & Pedagogy',
        href: '/academics',
        description: 'Foundational, Primary, Middle, and Secondary academic stages.',
        icon: BookOpen,
      },
      {
        label: 'Class 11 Stream Selector Quiz',
        href: '/stream-selector',
        description: '2-minute career match tool for Class 10 students entering Class 11.',
        icon: Sparkles,
        badge: 'AI Tool',
      },
      {
        label: 'Senior Secondary Streams',
        href: '/academics#streams',
        description: 'Science (PCM/PCB), Commerce with Maths, and Humanities.',
        icon: Building,
      },
      {
        label: 'Events & Academic Calendar',
        href: '/events',
        description: 'Examinations, PTMs, annual festivals, and sports fixtures.',
        icon: BookOpen,
      },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    dropdown: [
      {
        label: 'Admission Guidelines 2025–26',
        href: '/admissions',
        description: 'Criteria, age matrix, and online registration portal.',
        icon: BookOpen,
      },
      {
        label: 'Book Campus Visit & Meeting',
        href: '/book-visit',
        description: 'Schedule a personalized tour or Principal desk meeting.',
        icon: Calendar,
        badge: 'Book Slot',
      },
      {
        label: 'Smart Fee & Bus Calculator',
        href: '/admissions#fee-calculator',
        description: 'Transparent quarterly fee & Rohini bus slab estimator.',
        icon: Calculator,
        badge: 'Calculator',
      },
      {
        label: 'Track Application Status',
        href: '/admissions#track',
        description: 'Lookup application status with your Ref ID or Mobile.',
        icon: Search,
      },
      {
        label: 'Mandatory CBSE Documents',
        href: '/downloads',
        description: 'Affiliation certificates, safety audit reports, and syllabi.',
        icon: FileDown,
      },
    ],
  },
  {
    label: 'Campus Life',
    href: '/facilities',
    dropdown: [
      {
        label: 'Campus Facilities & Labs',
        href: '/facilities',
        description: 'STEM Tinkering Labs, skating rink, sports arena, and smart class.',
        icon: Building,
      },
      {
        label: 'Digital School Magazine',
        href: '/magazine',
        description: 'Interactive flipbook reader with student poetry and articles.',
        icon: BookOpen,
        badge: 'Flipbook',
      },
      {
        label: 'Student Wall of Fame',
        href: '/achievements',
        description: 'CBSE Board toppers (95%+ club), Olympiads, and Alumni legacy.',
        icon: Trophy,
      },
      {
        label: 'Photo & Media Gallery',
        href: '/gallery',
        description: 'Vibrant glimpses of student life, events, and campus moments.',
        icon: ImageIcon,
      },
      {
        label: 'Notices & Circulars',
        href: '/notices',
        description: 'Official student announcements and holiday notifications.',
        icon: Bell,
      },
    ],
  },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export default function Navbar({ school: initialSchool }: { school: School }) {
  const { settings: school } = useSiteSettings(initialSchool);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
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
        {/* Unified Top Info & Accessibility Toolbar */}
        <AccessibilityToolbar
          schoolPhone={school.phone_office}
          schoolEmail={school.email_general}
          affiliationNo={school.affiliation_no}
        />

        {/* Main Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[4.25rem]">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <SchoolCrest size={42} />
              <div>
                <div className="font-serif font-bold text-navy-950 text-base sm:text-lg leading-tight tracking-tight group-hover:text-amber-700 transition-colors">
                  {school.name}
                </div>
                <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider leading-tight mt-0.5">
                  Rohini, Delhi · {school.affiliation} Affiliated
                </div>
              </div>
            </Link>

            {/* Desktop Navigation with Dropdowns */}
            <div className="hidden lg:flex items-center space-x-1">
              {navCategories.map((cat) => {
                const hasDropdown = Boolean(cat.dropdown && cat.dropdown.length > 0);
                const isDropdownActive = activeDropdown === cat.label;
                const isActiveRoute = pathname === cat.href || (cat.href !== '/' && pathname.startsWith(cat.href));

                return (
                  <div
                    key={cat.label}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setActiveDropdown(cat.label)}
                    onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                  >
                    <Link
                      href={cat.href}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors ${
                        isActiveRoute || isDropdownActive
                          ? 'text-amber-600 bg-amber-50/60 font-bold'
                          : 'text-slate-700 hover:text-navy-950 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {hasDropdown && (
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${
                            isDropdownActive ? 'rotate-180 text-amber-600' : 'text-slate-400'
                          }`}
                        />
                      )}
                    </Link>

                    {/* Mega-Menu / Dropdown Overlay */}
                    <AnimatePresence>
                      {hasDropdown && isDropdownActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-1 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 space-y-1.5"
                        >
                          {cat.dropdown?.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group/sub block"
                              >
                                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 group-hover/sub:scale-110 transition-transform">
                                  <SubIcon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span className="font-serif font-bold text-xs text-navy-950 group-hover/sub:text-amber-700 transition-colors truncate">
                                      {sub.label}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-tight line-clamp-1 mt-0.5">
                                    {sub.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Action CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/admissions"
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 text-xs font-bold px-4 py-2.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap active:scale-[0.98]"
              >
                Admissions 2025–26 <ArrowRight size={14} />
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-xl text-navy-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Live News & Circulars Ticker Bar (Homepage Only) */}
        {pathname === '/' && <LiveNoticeTicker />}
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[300px] sm:w-[350px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-navy-950 border-b border-navy-800">
          <div className="flex items-center gap-3">
            <SchoolCrest size={36} />
            <div>
              <p className="font-serif font-bold text-white text-sm leading-tight">{school.name}</p>
              <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                Sector 3, Rohini
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Navigation List with Sub-Accordions */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navCategories.map((cat) => {
            const hasDropdown = Boolean(cat.dropdown && cat.dropdown.length > 0);
            const isExpanded = mobileExpandedCat === cat.label;

            return (
              <div key={cat.label} className="border-b border-slate-100 last:border-b-0 pb-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={cat.href}
                    onClick={() => !hasDropdown && setIsOpen(false)}
                    className="flex-1 py-2.5 text-xs font-bold text-navy-950 hover:text-amber-600"
                  >
                    {cat.label}
                  </Link>

                  {hasDropdown && (
                    <button
                      onClick={() => setMobileExpandedCat(isExpanded ? null : cat.label)}
                      className="p-2 text-slate-400 hover:text-navy-950"
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-amber-600' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {/* Sub Menu Accordion in Mobile Drawer */}
                {hasDropdown && isExpanded && (
                  <div className="pl-3 pb-2 space-y-1 bg-slate-50 rounded-xl p-2 my-1">
                    {cat.dropdown?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-1.5 px-2 text-[11px] font-semibold text-slate-700 hover:text-amber-700 hover:bg-white rounded-lg transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Footer CTAs */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          <Link
            href="/admissions"
            onClick={() => setIsOpen(false)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs py-3 rounded-xl text-center block shadow"
          >
            Apply for Admission 2025–26
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="w-full bg-navy-950 text-white font-bold text-xs py-2.5 rounded-xl text-center block"
          >
            Admin & Staff Portal Login →
          </Link>
        </div>
      </div>
    </>
  );
}
