import { Link } from 'react-router-dom';
import {
  Star, ChevronRight, BookOpen, Users, Award,
  MonitorPlay, Dumbbell, Shield, CheckCircle, ArrowRight,
  Calendar, MapPin, Phone,
} from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';
import { notices } from '../data/notices';
import { events } from '../data/events';
import { testimonials } from '../data/testimonials';
import { stats } from '../data/achievements';
import { SectionHeader, Badge, Card } from '../components/ui';

const { name, tagline, heroSubtext, established, affiliation, principal } = schoolConfig;

// ─── Hero ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden -mt-[3.75rem] md:-mt-[calc(2.25rem+3.75rem)] pt-[3.75rem] md:pt-[calc(2.25rem+3.75rem)]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=85"
          alt="School campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-800/55" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-[42rem]">
          <div className="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-[11px] font-bold uppercase tracking-[0.22em]">
              {affiliation} Affiliated · Est. {established}
            </span>
          </div>

          <h1 className="font-serif leading-[1.1] mb-5">
            <span className="block text-white text-4xl sm:text-6xl lg:text-7xl font-bold">{name.split(' ').slice(0, -1).join(' ')}</span>
            <span className="block text-amber-400 text-4xl sm:text-6xl lg:text-7xl font-bold">{name.split(' ').slice(-1)}</span>
          </h1>

          <p className="text-navy-200 text-lg sm:text-xl font-light italic mb-3">"{tagline}"</p>
          <p className="text-navy-100/85 text-base sm:text-lg leading-relaxed mb-10 max-w-[35rem]">{heroSubtext}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/about" className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 transition-colors shadow-xl text-base">
              Explore Our School <ArrowRight size={18} />
            </Link>
            <Link to="/admissions" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/30 text-base">
              Admission Enquiry
            </Link>
          </div>

          {/* Trust signals — DEMO values from stats */}
          <div className="mt-10 flex flex-wrap gap-5">
            {stats.slice(0, 4).map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-serif text-amber-400 font-bold text-xl">{s.value}</span>
                <span className="text-navy-300 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-amber-400/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── Quick Info Bar ──────────────────────────────────────────────────────
function QuickInfo() {
  const cards = [
    { label: 'Established',  value: established,                       sub: `${new Date().getFullYear() - parseInt(established)}+ Years of Excellence`, icon: '🎓' },
    { label: 'Classes',      value: schoolConfig.classes.range,        sub: schoolConfig.classes.description, icon: '📚' },
    { label: 'Affiliation',  value: affiliation,                       sub: `Board Affiliated School`,        icon: '🏅' },
    { label: 'Location',     value: schoolConfig.address.city || 'Your City', sub: schoolConfig.address.state || 'Your State', icon: '📍' },
  ];
  return (
    <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <div key={c.label} className={`px-6 py-7 text-center ${i < cards.length - 1 ? 'border-r border-navy-700/60' : ''} ${i >= 2 ? 'border-t border-navy-700/60 lg:border-t-0' : ''}`}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.18em] mb-1">{c.label}</p>
              <p className="text-white font-serif font-bold text-xl sm:text-2xl mb-1 leading-tight">{c.value}</p>
              <p className="text-navy-400 text-xs">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Snippet ──────────────────────────────────────────────────────
function AboutSnippet() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy-200/40">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=85" alt="Students learning" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-5 shadow-2xl hidden sm:block">
            {/* DEMO value */}
            <p className="font-serif text-3xl font-bold leading-none">{stats[1]?.value}</p>
            <p className="text-amber-100 text-xs mt-1 font-medium">Students Enrolled</p>
          </div>
          <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl border-2 border-amber-400/30 hidden sm:block" />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-amber-500" />
            <p className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">About Our School</p>
            <span className="w-6 h-px bg-amber-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-navy-900 leading-tight mb-5">
            A Legacy of Learning<br />& Academic Excellence
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Welcome to {name}, an institution committed to providing quality education and creating an environment where every student can discover their potential, nurture their talents, and build a strong foundation for life.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            We believe education goes beyond textbooks — it is about building character, instilling values, and preparing young minds to face the challenges of tomorrow with confidence and compassion.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-9">
            {[`${affiliation} Affiliated`, 'Holistic Curriculum', `${stats[2]?.value} Faculty Members`, `${stats[4]?.value} Activities`].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={10} className="text-amber-600" />
                </div>
                <span className="text-slate-700 text-sm leading-snug">{item}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="inline-flex items-center gap-2.5 bg-navy-900 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-800 transition-colors shadow-lg shadow-navy-200">
            Learn More About Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Principal's Message ────────────────────────────────────────────────
function PrincipalMessage() {
  return (
    <section className="py-24 px-4 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Leadership" title="Principal's Message" subtitle="A word from the head of our institution" />
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(14,30,66,0.08)] border border-slate-100 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
            <div className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row gap-10 items-start">
                <div className="flex-shrink-0 text-center sm:text-left">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto sm:mx-0 shadow-xl ring-4 ring-amber-100 border-2 border-white">
                    <img src={principal.image} alt={principal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4">
                    <p className="font-bold text-navy-900 text-sm">{principal.name}</p>
                    <p className="text-amber-600 text-xs font-semibold mt-0.5">{principal.designation}</p>
                    <p className="text-slate-400 text-xs">{principal.qualification}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <svg className="w-10 h-7 text-amber-200 mb-4" viewBox="0 0 48 36" fill="currentColor">
                    <path d="M0 36V22.5C0 14.833 2.583 8.917 7.75 4.75 12.917.583 20.083-1 29.25 0l1.5 5.25C25.083 4.417 20.75 5.5 17.5 8.5 14.25 11.5 12.5 15.5 12.5 20.5V36H0zm28 0V22.5c0-7.667 2.583-13.583 7.75-17.75C40.917.583 48.083-1 57.25 0l1.5 5.25C53.083 4.417 48.75 5.5 45.5 8.5c-3.25 3-5 7-5 12V36H28z"/>
                  </svg>
                  {schoolConfig.principal.message.map((para, i) => (
                    <p key={i} className="text-slate-700 text-base leading-relaxed mb-4 last:mb-0">{para}</p>
                  ))}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <p className="text-slate-400 text-sm italic">With warm regards,</p>
                    <p className="font-serif font-bold text-navy-900 text-lg mt-1">{principal.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ──────────────────────────────────────────────────────
function WhyChooseUs() {
  const features = [
    { icon: BookOpen,    title: 'Academic Excellence',  desc: 'A rigorous yet nurturing curriculum that consistently delivers outstanding results in board examinations and competitive tests.' },
    { icon: Users,       title: 'Experienced Faculty',  desc: `${stats[2]?.value} highly qualified teachers trained in modern pedagogical methods, dedicated to every student's individual growth.` },
    { icon: Award,       title: 'Holistic Development', desc: 'Sports, arts, music, debate, and community service programmes ensure every student develops into a well-rounded individual.' },
    { icon: MonitorPlay, title: 'Smart Infrastructure', desc: 'Smart classrooms, fully equipped laboratories, a rich library, and a modern computer centre create a world-class learning environment.' },
    { icon: Dumbbell,    title: 'Sports & Activities',  desc: `${stats[4]?.value} clubs and multi-sport grounds ensure every child discovers their passion and builds a lifelong love of learning.` },
    { icon: Shield,      title: 'Safe Environment',     desc: 'CCTV surveillance, biometric entry, trained security personnel, and GPS-tracked buses ensure the complete safety of every child.' },
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="The Heritage Advantage" title="Why Choose Us?" subtitle="We go beyond academics to create future-ready, well-rounded individuals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="group relative p-8 rounded-2xl border border-slate-100 hover:border-amber-200 hover:bg-gradient-to-br hover:from-amber-50 hover:to-white transition-all duration-250 overflow-hidden">
              <span className="absolute top-4 right-5 font-serif text-7xl font-bold text-slate-50 group-hover:text-amber-100/60 transition-colors leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-navy-50 group-hover:bg-navy-900 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-250 shadow-sm">
                  <Icon size={22} className="text-navy-700 group-hover:text-amber-400 transition-colors duration-250" />
                </div>
                <h3 className="font-bold text-navy-900 text-[15px] mb-2.5">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Facilities Preview ──────────────────────────────────────────────────
function FacilitiesPreview() {
  const items = [
    { title: 'Smart Classrooms',  img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80' },
    { title: 'Science Labs',      img: 'https://images.unsplash.com/photo-1532094349884-543559621b5a?w=600&q=80' },
    { title: 'Computer Lab',      img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80' },
    { title: 'Library',           img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80' },
    { title: 'Sports Grounds',    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80' },
    { title: 'School Transport',  img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80' },
  ];
  return (
    <section className="py-24 px-4 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Infrastructure" title="World-Class Facilities" subtitle="Modern infrastructure designed to support every dimension of a student's growth" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {items.map((item) => (
            <div key={item.title} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-300" />
              <p className="absolute bottom-2.5 left-2 right-2 text-white text-[11px] font-bold text-center leading-tight">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/facilities" className="inline-flex items-center gap-2 border-2 border-navy-800 text-navy-800 font-bold px-7 py-3.5 rounded-xl hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all">
            View All Facilities <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ──────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      {/* ⚠️ DEMO values — replace via themeConfig.js stats array */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={s.label} className={i > 0 ? 'border-l border-navy-700/40' : ''}>
            <p className="font-serif font-bold text-3xl sm:text-4xl text-white mb-1.5 leading-none">{s.value}</p>
            <div className="w-8 h-0.5 bg-amber-500 mx-auto mb-2" />
            <p className="text-navy-300 text-[11px] uppercase tracking-widest font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Latest News ────────────────────────────────────────────────────────
function LatestNews() {
  const catVariant = { Admissions: 'navy', Examination: 'orange', Holiday: 'green', Achievement: 'purple', Event: 'navy', Circular: 'gray' };
  const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">Stay Informed</p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900">Latest News & Notices</h2>
          </div>
          <Link to="/news-events" className="inline-flex items-center gap-1.5 text-navy-700 font-semibold text-sm hover:text-amber-600 transition-colors">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.slice(0, 3).map((notice) => (
            <Card key={notice.id} className="flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img src={notice.image} alt={notice.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                <div className="absolute top-3 left-3"><Badge variant={catVariant[notice.category] || 'navy'}>{notice.category}</Badge></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-slate-400 text-xs flex items-center gap-1 mb-3">
                  <Calendar size={11} className="text-amber-500" />{fmt(notice.date)}
                </span>
                <h3 className="font-bold text-navy-900 text-sm mb-2 leading-snug line-clamp-2 flex-1">{notice.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">{notice.description}</p>
                <button className="text-amber-600 text-xs font-bold flex items-center gap-1.5 hover:gap-3 transition-all">
                  Read More <ArrowRight size={12} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Events ─────────────────────────────────────────────────────────────
function EventsPreview() {
  const upcoming = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const fmt = (d) => {
    const date = new Date(d);
    return { day: date.getDate(), month: date.toLocaleString('en-IN', { month: 'short' }), year: date.getFullYear() };
  };

  return (
    <section className="py-24 px-4 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">What's Coming Up</p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900">Upcoming Events</h2>
          </div>
          <Link to="/news-events" className="inline-flex items-center gap-1.5 text-navy-700 font-semibold text-sm hover:text-amber-600 transition-colors">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-4">
          {upcoming.map((event) => {
            const { day, month, year } = fmt(event.date);
            return (
              <div key={event.id} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(14,30,66,0.06)] overflow-hidden flex flex-col sm:flex-row group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                <div className="sm:w-52 h-44 sm:h-auto overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-stretch flex-1">
                  <div className="bg-gradient-to-b from-navy-900 to-navy-950 text-white w-[4.5rem] flex flex-col items-center justify-center flex-shrink-0 p-3 gap-0.5">
                    <span className="font-serif text-2xl font-bold leading-none text-amber-400">{day}</span>
                    <span className="text-navy-300 text-[10px] uppercase font-semibold">{month}</span>
                    <span className="text-navy-400 text-[10px]">{year}</span>
                  </div>
                  <div className="p-5 flex flex-col justify-center flex-1 gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="navy">{event.category}</Badge>
                      <span className="text-slate-400 text-xs flex items-center gap-1"><MapPin size={10} /> {event.venue}</span>
                    </div>
                    <h3 className="font-bold text-navy-900 text-base">{event.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Achievements ───────────────────────────────────────────────────────
function AchievementsPreview() {
  const items = [
    { title: 'Academic Excellence Award',      sub: 'Board Examination Results',      icon: '🏆', color: 'from-navy-800 to-navy-950',      border: 'border-navy-700' },
    { title: 'Best School – District Award',   sub: 'Education Excellence Forum',     icon: '🥇', color: 'from-amber-600 to-amber-800',    border: 'border-amber-500' },
    { title: 'Sports Championship',            sub: 'District-Level – 2 Years',       icon: '⚽', color: 'from-emerald-700 to-emerald-900', border: 'border-emerald-600' },
    { title: 'Science Olympiad Recognition',   sub: 'Regional Gold Medal',            icon: '🔬', color: 'from-purple-700 to-purple-900',   border: 'border-purple-600' },
  ];
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader eyebrow="Pride & Glory" title="Our Achievements" subtitle="Recognitions that reflect our commitment to excellence" light />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {items.map((item) => (
            <div key={item.title} className={`bg-gradient-to-br ${item.color} border ${item.border}/30 rounded-2xl p-7 text-white text-center hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-250`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="w-8 h-0.5 bg-amber-400/60 mx-auto mb-3" />
              <h3 className="font-bold text-[15px] mb-1.5 leading-snug">{item.title}</h3>
              <p className="text-white/60 text-xs font-medium">{item.sub}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/achievements" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-amber-500 hover:border-amber-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200">
            View All Achievements <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Preview ────────────────────────────────────────────────────
function GalleryPreview() {
  const imgs = [
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', span: 'col-span-2 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', span: '' },
    { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80', span: '' },
    { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', span: '' },
    { src: 'https://images.unsplash.com/photo-1532094349884-543559621b5a?w=600&q=80', span: '' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', span: '' },
    { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',    span: '' },
  ];
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Campus Life" title="Photo Gallery" subtitle={`A glimpse into life at ${name}`} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8" style={{ gridAutoRows: '180px' }}>
          {imgs.map(({ src, span }, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-2xl shadow-sm ${span}`}>
              <img src={src} alt={`School gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 bg-navy-900 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-navy-800 transition-colors shadow-lg shadow-navy-200">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-24 px-4 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Community Voices" title="What Parents Say" subtitle="Real stories from our school community" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(14,30,66,0.06)] p-7 flex flex-col card-lift">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <svg className="w-8 h-6 text-amber-200 mb-3" viewBox="0 0 32 24" fill="currentColor">
                <path d="M0 24V15C0 9.889 1.722 5.944 5.167 3.167 8.611.389 13.389-.444 19.5 0l1 3.5C16.722 2.944 13.833 3.667 11.667 5.667 9.5 7.667 8.5 10.333 8.5 13.5V24H0zm18.5 0V15c0-5.111 1.722-9.056 5.167-11.833C27.111.389 31.889-.444 38 0l1 3.5C35.222 2.944 32.333 3.667 30.167 5.667 28 7.667 27 10.333 27 13.5V24h-8.5z"/>
              </svg>
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 italic line-clamp-5">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-100" />
                <div>
                  <p className="font-bold text-navy-900 text-sm leading-tight">{t.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t.relation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Admission CTA ──────────────────────────────────────────────────────
function AdmissionCTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=70" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/97 via-navy-900/95 to-navy-800/90" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <div className="inline-flex items-center gap-2.5 glass px-5 py-2.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-[11px] font-bold uppercase tracking-[0.22em]">Admissions Open – 2025–26</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-5 leading-tight">
          Start Your Child's<br /><span className="text-gradient-gold">Journey With Us</span>
        </h2>
        <p className="text-navy-200 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Give your child the gift of a world-class education in a nurturing, safe, and inspiring environment. Limited seats available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/admissions" className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-9 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-2xl shadow-amber-900/40 text-base">
            Enquire Now <ArrowRight size={18} />
          </Link>
          <a href={`tel:${schoolConfig.phone.admissions}`} className="inline-flex items-center justify-center gap-2.5 border-2 border-white/30 text-white font-bold px-9 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all text-base">
            <Phone size={17} /> Call Us
          </a>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-navy-300 text-sm">
          <span className="flex items-center justify-center gap-2">
            <Phone size={14} className="text-amber-500" /> {schoolConfig.phone.office}
          </span>
          <span className="flex items-center justify-center gap-2">
            <MapPin size={14} className="text-amber-500" /> {schoolConfig.address.full}
          </span>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickInfo />
      <AboutSnippet />
      <PrincipalMessage />
      <WhyChooseUs />
      <FacilitiesPreview />
      <StatsSection />
      <LatestNews />
      <EventsPreview />
      <AchievementsPreview />
      <GalleryPreview />
      <Testimonials />
      <AdmissionCTA />
    </>
  );
}
