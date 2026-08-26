import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

function IconFacebook() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function IconInstagram() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
function IconTwitter() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.014 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function IconYoutube() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96C23 15.86 23 12 23 12s0-3.86-.46-5.58zM9.75 15.02V8.98L15.5 12z"/></svg>;
}

const quickLinks = [
  { label: 'Home',       to: '/' },
  { label: 'About Us',   to: '/about' },
  { label: 'Academics',  to: '/academics' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Activities', to: '/activities' },
];

const moreLinks = [
  { label: 'Achievements',   to: '/achievements' },
  { label: 'Gallery',        to: '/gallery' },
  { label: 'News & Events',  to: '/news-events' },
  { label: 'Contact Us',     to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use',   to: '/terms' },
];

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
        <ArrowRight size={11} className="text-amber-600/50 group-hover:text-amber-400 transition-colors flex-shrink-0" />
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const { name, affiliation, email, phone, address, timings, social } = schoolConfig;

  // Only render social icons where a URL is provided
  const socialLinks = [
    { icon: IconFacebook,  href: social.facebook,  label: 'Facebook'  },
    { icon: IconInstagram, href: social.instagram, label: 'Instagram' },
    { icon: IconTwitter,   href: social.twitter,   label: 'Twitter/X' },
    { icon: IconYoutube,   href: social.youtube,   label: 'YouTube'   },
  ].filter((s) => s.href);

  return (
    <footer className="bg-navy-950 text-slate-300">
      {/* Admission CTA strip */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-navy-950 font-bold text-lg leading-tight">Admissions Open – Session 2025–26</p>
            <p className="text-navy-800 text-sm mt-0.5">Limited seats available · Apply early to secure your child's future</p>
          </div>
          <Link to="/admissions" className="flex items-center gap-2 bg-navy-950 text-amber-400 font-bold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors whitespace-nowrap shadow-lg text-sm">
            Enquire Now <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center border border-amber-500/30 shadow flex-shrink-0">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6c0 0 1.5 1.5 1.5 3S12 11 12 11s-1.5-1-1.5-2S12 6 12 6z" fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.5"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-white text-base leading-tight">{name}</p>
                <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest leading-tight mt-0.5">{affiliation} Affiliated School</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              A {affiliation} affiliated school committed to academic excellence, holistic development, and building confident leaders for tomorrow.
            </p>
            <p className="text-xs text-slate-500 mb-6 italic">"{schoolConfig.tagline}"</p>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-amber-500 text-slate-400 hover:text-navy-950 flex items-center justify-center transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-amber-500" /> Quick Links
            </h3>
            <ul className="space-y-2.5">{quickLinks.map((l) => <FooterLink key={l.to} to={l.to}>{l.label}</FooterLink>)}</ul>
          </div>

          {/* More Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-amber-500" /> More Links
            </h3>
            <ul className="space-y-2.5">{moreLinks.map((l) => <FooterLink key={l.to} to={l.to}>{l.label}</FooterLink>)}</ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-amber-500" /> Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span>{address.full}</span>
              </li>
              <li>
                <a href={`tel:${phone.office}`} className="flex gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  <Phone size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  {phone.office} / {phone.admissions}
                </a>
              </li>
              <li>
                <a href={`mailto:${email.general}`} className="flex gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  <Mail size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  {email.general}
                </a>
              </li>
              <li className="flex gap-3 text-sm text-slate-400">
                <Clock size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span>{timings.school}<br />{timings.office}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
      </div>

      {/* Copyright */}
      <div className="py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <span className="w-px h-3 bg-slate-700" />
            <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
