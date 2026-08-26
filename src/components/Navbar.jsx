import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, GraduationCap } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

const navLinks = [
  { label: 'Home',          to: '/' },
  { label: 'About',         to: '/about' },
  { label: 'Academics',     to: '/academics' },
  { label: 'Admissions',    to: '/admissions' },
  { label: 'Facilities',    to: '/facilities' },
  { label: 'Activities',    to: '/activities' },
  { label: 'Achievements',  to: '/achievements' },
  { label: 'Gallery',       to: '/gallery' },
  { label: 'News & Events', to: '/news-events' },
  { label: 'Contact',       to: '/contact' },
];

function SchoolCrest({ size = 40 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center shadow-md flex-shrink-0 border border-amber-500/30"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6c0 0 1.5 1.5 1.5 3S12 11 12 11s-1.5-1-1.5-2S12 6 12 6z" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.5"/>
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();
  const prevPathRef             = useRef(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-lg shadow-[0_2px_24px_rgba(14,30,66,0.12)] border-b border-slate-100'
            : 'bg-white shadow-sm'
        }`}
      >
        {/* Top info bar */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white text-xs hidden md:block border-b border-amber-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400/90">
              <GraduationCap size={13} />
              <span className="font-medium tracking-wide">
                {schoolConfig.name} · {schoolConfig.affiliation} Affiliated · Est. {schoolConfig.established}
              </span>
            </div>
            <div className="flex items-center gap-5 text-navy-200">
              <a href={`tel:${schoolConfig.phone.office}`}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Phone size={11} />
                <span>{schoolConfig.phone.office}</span>
              </a>
              <span className="w-px h-3 bg-navy-600" />
              <a href={`mailto:${schoolConfig.email.general}`}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Mail size={11} />
                <span>{schoolConfig.email.general}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[3.75rem]">
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <SchoolCrest size={42} />
              <div className="hidden sm:block">
                <div className="font-bold text-navy-900 text-[15px] leading-tight tracking-tight group-hover:text-navy-700 transition-colors">
                  {schoolConfig.name}
                </div>
                <div className="text-[11px] text-amber-600 font-semibold leading-tight tracking-wide uppercase">
                  {schoolConfig.affiliation} Affiliated School
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden xl:flex items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-3 py-4 text-[13px] font-medium transition-colors whitespace-nowrap group ${
                      isActive ? 'text-navy-800' : 'text-slate-600 hover:text-navy-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full transition-all duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                to="/admissions"
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[13px] font-bold px-5 py-2.5 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm shadow-amber-200 whitespace-nowrap"
              >
                Admission Enquiry
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm xl:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl transform transition-transform duration-300 xl:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-navy-950">
          <div className="flex items-center gap-2.5">
            <SchoolCrest size={34} />
            <div>
              <p className="font-bold text-white text-sm leading-tight">{schoolConfig.name}</p>
              <p className="text-amber-400 text-[10px] uppercase tracking-wider">{schoolConfig.affiliation} Affiliated</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-64px)] flex flex-col">
          <div className="p-3 flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-colors ${
                    isActive ? 'bg-navy-900 text-white' : 'text-slate-700 hover:bg-navy-50 hover:text-navy-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 space-y-3">
            <Link
              to="/admissions"
              className="flex items-center justify-center w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all text-sm"
            >
              Admission Enquiry
            </Link>
            <div className="flex gap-3 text-xs text-slate-500">
              <a href={`tel:${schoolConfig.phone.office}`} className="flex items-center gap-1 hover:text-navy-700">
                <Phone size={11} /> {schoolConfig.phone.office}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
