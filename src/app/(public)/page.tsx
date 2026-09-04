import Link from 'next/link';
import {
  BookOpen,
  Users,
  Award,
  MonitorPlay,
  Dumbbell,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  ChevronRight,
  Star,
  Sparkles,
  HeartHandshake,
  Clock,
  Compass,
  Mail,
  Download,
} from 'lucide-react';
import {
  getSchoolData,
  getNotices,
  getEvents,
  getFacilities,
  getAchievements,
  getGalleryImages,
  getFAQs,
} from '@/lib/supabase/service';
import { mockStats, mockTestimonials } from '@/lib/data/mockData';
import { SectionHeader, Badge, Card } from '@/components/ui';
import { formatDate, formatEventDate } from '@/lib/utils';
import HomeFAQAccordion from '@/components/home/HomeFAQAccordion';
import HomeGalleryLightbox from '@/components/home/HomeGalleryLightbox';

export default async function HomePage() {
  const school = await getSchoolData();
  const notices = await getNotices(3);
  const upcomingEvents = (await getEvents('upcoming')).slice(0, 3);
  const facilities = (await getFacilities()).slice(0, 8);
  const achievements = (await getAchievements()).slice(0, 4);
  const galleryImages = (await getGalleryImages()).slice(0, 8);
  const featuredFaqs = (await getFAQs()).slice(0, 6);

  const principal = {
    name: 'Dr. Ananya Sharma',
    designation: 'Principal, Decent Public School',
    qualification: 'M.Ed., Ph.D. (Education), UGC-NET',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
    message: [
      'At Decent Public School, Rohini, we believe that education is not the filling of a pail, but the lighting of a fire. Every child is blessed with infinite potential, boundless curiosity, and a distinct brilliance waiting to be discovered and shaped.',
      'Over the past three decades, we have fostered an inspiring campus environment where rigorous CBSE academics harmoniously blend with sportsmanship, artistic expression, moral ethics, and scientific inquiry.',
      'We welcome you to partner with us as we guide your child on an exciting journey of discovery, character building, and outstanding achievement.',
    ],
  };

  const trustHighlights = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      subtitle: 'Rigorous CBSE curriculum with 100% board pass track record',
    },
    {
      icon: HeartHandshake,
      title: 'Holistic Development',
      subtitle: 'Nurturing arts, sports, science exhibitions, MUNs and moral values',
    },
    {
      icon: Users,
      title: 'Experienced Faculty',
      subtitle: '110+ dedicated, qualified subject specialists with 25:1 student ratio',
    },
    {
      icon: Shield,
      title: 'Safe & Supportive Campus',
      subtitle: '24/7 CCTV surveillance, GPS-enabled buses and on-campus clinic',
    },
  ];

  const academicBlocks = [
    {
      icon: BookOpen,
      tag: 'Pre-School to Class XII',
      title: 'CBSE Curriculum',
      desc: 'Structured syllabus aligned with National Education Policy (NEP) and CBSE standards, cultivating foundational clarity and critical thinking.',
      link: '/academics',
    },
    {
      icon: MonitorPlay,
      tag: 'Experiential Pedagogy',
      title: 'Teaching & Learning',
      desc: 'Smart digital interactive panels, AI & Robotics learning, project-based assignments, and personalized remedial tutoring for every child.',
      link: '/academics',
    },
    {
      icon: Compass,
      tag: 'Creative Expression',
      title: 'Co-curricular Activities',
      desc: 'Vibrant clubs including Debating, Model UN, Science Olympiads, Theatre, Indian Classical Music, Western Dance, and Fine Arts.',
      link: '/academics',
    },
    {
      icon: Dumbbell,
      tag: 'Physical Fitness',
      title: 'Sports & Athletics',
      desc: 'Dedicated football grounds, synthetic basketball court, indoor badminton courts, cricket nets, taekwondo, and table tennis coaching.',
      link: '/academics',
    },
  ];

  return (
    <>
      {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-28 pb-20">
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
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/30 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.2em]">
                {school.affiliation} Affiliated (No. {school.affiliation_no}) · Sector 3, Rohini
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-serif leading-[1.08] mb-5 text-white">
              <span className="block text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                DECENT PUBLIC
              </span>
              <span className="block text-4xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold">
                SCHOOL, ROHINI
              </span>
            </h1>

            <p className="text-amber-200 text-lg sm:text-xl font-light italic mb-4">
              "{school.tagline}"
            </p>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              {school.hero_subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy-950 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 transition-all shadow-xl text-base active:scale-[0.98]"
              >
                Explore Our School <ArrowRight size={18} />
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/30 text-base active:scale-[0.98]"
              >
                Admission Enquiry 2025–26
              </Link>
            </div>

            {/* Quick Stat Highlights */}
            <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap gap-8">
              {mockStats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <span className="font-serif text-amber-400 font-bold text-2xl sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. TRUST & HIGHLIGHTS STRIP ──────────────────────────────────── */}
      <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-amber-500/25 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 p-3 rounded-2xl transition-all ${
                    idx > 0 ? 'lg:border-l lg:border-navy-800/80 lg:pl-6' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-400">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT SCHOOL SECTION ──────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy-950/15 relative">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=85"
                alt="Students learning at Decent Public School"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stat Box Badges */}
            <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 shadow-2xl hidden sm:block">
              <p className="font-serif text-3xl font-bold leading-none">2,200+</p>
              <p className="text-amber-100 text-xs mt-1 font-medium">Students Enrolled</p>
            </div>
            <div className="absolute -top-6 -left-2 sm:-left-6 bg-navy-950 border border-amber-500/30 text-white rounded-2xl p-5 shadow-xl hidden sm:block">
              <p className="font-serif text-amber-400 text-2xl font-bold leading-none">30+ Yrs</p>
              <p className="text-slate-300 text-[11px] mt-0.5 uppercase tracking-wider">Educational Heritage</p>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">
                About Our Institution
              </p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight mb-5">
              A Legacy of Academic Rigour & Character Building
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Welcome to <strong>Decent Public School</strong>, Rohini, an institution committed to providing world-class education rooted in traditional values and modern scientific temper. Since {school.established}, we have created an inspiring ecosystem where students discover their true potential.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              We believe education extends far beyond textbooks — it encompasses intellectual curiosity, physical agility, moral character, and empathy for society.
            </p>

            <div className="grid grid-cols-2 gap-3.5 mb-9">
              {[
                'CBSE Affiliated Senior Secondary',
                'Smart Digital Classrooms',
                '110+ Dedicated Educators',
                'Advanced Science & AI Labs',
                'Comprehensive Sports Complex',
                'Safe GPS-Tracked Transport',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700">
                    <CheckCircle size={13} />
                  </div>
                  <span className="text-slate-700 text-xs sm:text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 bg-navy-950 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-900 transition-colors shadow-lg shadow-navy-950/20"
            >
              Read More About Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. PRINCIPAL'S MESSAGE ───────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Leadership"
            title="Principal's Message"
            subtitle="Guiding young minds towards academic brilliance, compassion, and progressive leadership"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
              <div className="p-8 sm:p-12">
                <div className="flex flex-col sm:flex-row gap-10 items-start">
                  {/* Photo */}
                  <div className="flex-shrink-0 text-center sm:text-left mx-auto sm:mx-0">
                    <div className="w-36 h-36 rounded-2xl overflow-hidden mx-auto sm:mx-0 shadow-xl ring-4 ring-amber-100 border-2 border-white">
                      <img
                        src={principal.image}
                        alt={principal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="font-serif font-bold text-navy-950 text-base">{principal.name}</p>
                      <p className="text-amber-600 text-xs font-semibold mt-0.5">{principal.designation}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{principal.qualification}</p>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1">
                    <svg className="w-10 h-8 text-amber-300 mb-4" viewBox="0 0 48 36" fill="currentColor">
                      <path d="M0 36V22.5C0 14.833 2.583 8.917 7.75 4.75 12.917.583 20.083-1 29.25 0l1.5 5.25C25.083 4.417 20.75 5.5 17.5 8.5 14.25 11.5 12.5 15.5 12.5 20.5V36H0zm28 0V22.5c0-7.667 2.583-13.583 7.75-17.75C40.917.583 48.083-1 57.25 0l1.5 5.25C53.083 4.417 48.75 5.5 45.5 8.5c-3.25 3-5 7-5 12V36H28z" />
                    </svg>

                    {principal.message.map((para, i) => (
                      <p key={i} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 last:mb-0">
                        {para}
                      </p>
                    ))}

                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider">With warm regards,</p>
                        <p className="font-serif font-bold text-navy-950 text-lg mt-0.5">{principal.name}</p>
                      </div>
                      <Link
                        href="/faculty"
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                      >
                        Meet Our Faculty <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. ACADEMICS BLOCKS ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Pedagogy & Wings"
            title="Comprehensive Academic Framework"
            subtitle="Engaging learning pathways crafted for foundational, middle, and senior secondary stages"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {academicBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <div
                  key={block.title}
                  className="bg-slate-50 hover:bg-white rounded-3xl p-7 border border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-13 h-13 rounded-2xl bg-navy-950 text-amber-400 flex items-center justify-center mb-5 shadow-sm">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      {block.tag}
                    </span>
                    <h3 className="font-serif font-bold text-navy-950 text-xl mb-3">{block.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{block.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <Link
                      href={block.link}
                      className="text-xs font-bold text-navy-950 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
                    >
                      Explore Stage Details <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/academics"
              className="inline-flex items-center gap-2 bg-navy-950 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-900 transition-colors shadow-lg"
            >
              Explore Full CBSE Streams & Syllabi <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. FACILITIES PREVIEW ────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="World-Class Campus"
            title="Modern School Infrastructure"
            subtitle="State-of-the-art facilities engineered to foster academic, scientific, and athletic excellence"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {facilities.map((facility) => (
              <Card key={facility.id} className="group overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden bg-navy-950">
                    <img
                      src={facility.image_url}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-serif font-bold text-white text-base sm:text-lg leading-tight">
                        {facility.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {facility.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {facility.features?.slice(0, 2).map((f) => (
                        <span
                          key={f}
                          className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-0">
                  <Link
                    href="/facilities"
                    className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    View Amenities <ChevronRight size={14} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 bg-white border-2 border-navy-950 text-navy-950 font-bold px-8 py-3.5 rounded-xl hover:bg-navy-950 hover:text-white transition-all shadow-sm"
            >
              Explore All Facilities & Campus <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. STATS STRIP ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {mockStats.map((s, i) => (
            <div key={s.label} className={i > 0 ? 'sm:border-l sm:border-navy-800/80 sm:pl-4' : ''}>
              <p className="font-serif font-bold text-3xl sm:text-4xl text-amber-400 mb-1.5 leading-none">
                {s.value}
              </p>
              <div className="w-8 h-0.5 bg-amber-500 mx-auto mb-2" />
              <p className="text-slate-300 text-[11px] uppercase tracking-widest font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 8. LATEST NOTICES & NOTICE BOARD ──────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-amber-500" />
                <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">
                  Official Bulletin
                </p>
                <span className="w-6 h-px bg-amber-500" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
                Latest News & Official Notices
              </h2>
            </div>
            <Link
              href="/notices"
              className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-sm hover:text-amber-700 transition-colors"
            >
              View All Notices <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice, idx) => (
              <Card key={notice.id} className="flex flex-col group border-slate-200">
                <div className="relative h-48 overflow-hidden bg-navy-950">
                  <img
                    src={notice.image_url || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80'}
                    alt={notice.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant={notice.category === 'Admissions' ? 'amber' : 'navy'}>
                      {notice.category}
                    </Badge>
                    {idx === 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-slate-400 text-xs flex items-center gap-1.5 mb-2.5">
                      <Calendar size={12} className="text-amber-500" />
                      {formatDate(notice.date)}
                    </span>
                    <h3 className="font-serif font-bold text-navy-950 text-base mb-2 leading-snug line-clamp-2">
                      {notice.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                      {notice.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/notices"
                      className="text-amber-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read Notice <ArrowRight size={14} />
                    </Link>
                    {notice.document_url && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Download size={12} /> PDF Attached
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. UPCOMING EVENTS ───────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-amber-500" />
                <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">
                  Campus Calendar
                </p>
                <span className="w-6 h-px bg-amber-500" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
                Upcoming Events & Celebrations
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-sm hover:text-amber-700 transition-colors"
            >
              View All Events <ChevronRight size={18} />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const { day, month, year } = formatEventDate(event.event_date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="sm:w-56 h-48 sm:h-auto overflow-hidden flex-shrink-0 relative">
                    <img
                      src={event.cover_image_url || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-stretch flex-1">
                    {/* Date Block */}
                    <div className="bg-gradient-to-b from-navy-950 to-navy-900 text-white w-20 sm:w-24 flex flex-col items-center justify-center flex-shrink-0 p-3 gap-0.5 border-r border-amber-500/20">
                      <span className="font-serif text-3xl font-bold leading-none text-amber-400">
                        {day}
                      </span>
                      <span className="text-slate-300 text-xs uppercase font-bold tracking-wider">
                        {month}
                      </span>
                      <span className="text-slate-400 text-[10px]">{year}</span>
                    </div>
                    {/* Details */}
                    <div className="p-5 sm:p-6 flex flex-col justify-center flex-1 gap-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="navy">{event.category}</Badge>
                        {event.venue && (
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <MapPin size={12} className="text-amber-600" /> {event.venue}
                          </span>
                        )}
                        {event.time && (
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <Clock size={12} className="text-amber-600" /> {event.time}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-navy-950 text-lg sm:text-xl">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 10. ACHIEVEMENTS HIGHLIGHTS ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Pride & Recognition"
            title="School & Student Accolades"
            subtitle="Honouring the pursuit of brilliance in academics, athletics, STEM competitions, and cultural arts"
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-navy-900/80 border border-navy-700/60 hover:border-amber-400/50 rounded-2xl p-7 text-white text-center hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  {ach.year} · {ach.category}
                </span>
                <h3 className="font-serif font-bold text-base mb-2 leading-snug">
                  {ach.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-3.5 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
            >
              View All Achievements <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. PHOTO GALLERY PREVIEW WITH LIGHTBOX ──────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Campus Moments"
            title="Life at Decent Public School"
            subtitle="Glimpses into our vibrant classrooms, annual celebrations, sporting triumphs, and laboratories"
          />

          <HomeGalleryLightbox images={galleryImages} />

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-navy-950 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-900 transition-colors shadow-lg"
            >
              View Complete Photo Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 12. TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Parent Testimonials"
            title="What Parents Say About Us"
            subtitle="Real experiences and heartfelt feedback from our school community in Rohini"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/40"
                  />
                  <div>
                    <p className="font-serif font-bold text-navy-950 text-sm leading-tight">
                      {t.name}
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{t.relation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FAQ ACCORDION SECTION ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Frequently Asked Questions"
            title="Got Questions? We Have Answers"
            subtitle="Find quick answers regarding admissions, school curriculum, transportation, and daily schedule"
          />

          <HomeFAQAccordion faqs={featuredFaqs} />

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              View All Frequently Asked Questions <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 14. CONTACT & LOCATION PREVIEW ───────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">
                Visit Our Campus
              </p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
              Conveniently Located in Sector 3, Rohini
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our campus is easily accessible from all parts of North and West Delhi, with proximity to the Rohini West and Madhuban Chowk metro stations.
            </p>

            <div className="space-y-3.5 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-600 flex-shrink-0 mt-1" />
                <span>{school.full_address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-amber-600 flex-shrink-0" />
                <span>Office Hotline: <strong>{school.phone_office}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-amber-600 flex-shrink-0" />
                <span>General Queries: <strong>{school.email_general}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-amber-600 flex-shrink-0" />
                <span>Visiting Hours: <strong>{school.timings_office}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-navy-950 text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-900 transition-colors shadow-md text-sm"
              >
                Send Us a Message <ArrowRight size={15} />
              </Link>
              <a
                href={`https://wa.me/${school.phone_admissions.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-md text-sm"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Google Maps Embed Container */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80 sm:h-96 relative bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13998.243555238276!2d77.10878148715822!3d28.6946059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e5c9b4e723%3A0xb33887b649d2fb08!2sSector%203%2C%20Rohini%2C%20Delhi%2C%20110085!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Decent Public School Location Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ─── 15. ADMISSION CTA BANNER ─────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=70"
            alt="School Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/98 via-navy-900/95 to-navy-950/95" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-amber-400/30 mb-7">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.2em]">
              Admissions Open · Session 2025–26
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Give Your Child the Foundation for a <span className="text-amber-400">Brilliant Future</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-9 max-w-xl mx-auto">
            Experience world-class education with personal mentoring, innovative labs, and ethical values in the heart of Rohini, Delhi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-9 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-2xl shadow-amber-900/50 text-base active:scale-[0.98]"
            >
              Admission Process & Enquiry <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${school.phone_admissions}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-9 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all text-base"
            >
              <Phone size={17} /> Call Admissions Desk
            </a>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-slate-400 text-xs">
            <span className="flex items-center justify-center gap-2">
              <Phone size={13} className="text-amber-400" /> {school.phone_office}
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin size={13} className="text-amber-400" /> {school.full_address}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
