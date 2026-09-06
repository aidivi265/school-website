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
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HomeTrustSection from '@/components/home/HomeTrustSection';
import HomeAboutSection from '@/components/home/HomeAboutSection';
import HomePrincipalSection from '@/components/home/HomePrincipalSection';
import HomeCTABanner from '@/components/home/HomeCTABanner';
import HomeNoticesSection from '@/components/home/HomeNoticesSection';
import HomeEventsSection from '@/components/home/HomeEventsSection';
import HomeAchievementsSection from '@/components/home/HomeAchievementsSection';
import HomeFacilitiesSection from '@/components/home/HomeFacilitiesSection';
import { DayInTheLifeSection } from '@/components/home/DayInTheLifeSection';

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
      <HomeHeroSection initialSchool={school} />

      {/* ─── 2. TRUST & HIGHLIGHTS STRIP ──────────────────────────────────── */}
      <HomeTrustSection />

      {/* ─── 3. ABOUT SCHOOL SECTION ──────────────────────────────────────── */}
      <HomeAboutSection initialSchool={school} />

      {/* ─── 4. PRINCIPAL'S MESSAGE ───────────────────────────────────────── */}
      <HomePrincipalSection />

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
      <HomeFacilitiesSection initialFacilities={facilities} />

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
      <HomeNoticesSection initialNotices={notices} />

      {/* ─── 9. UPCOMING EVENTS ───────────────────────────────────────────── */}
      <HomeEventsSection initialEvents={upcomingEvents} />

      {/* ─── 10. ACHIEVEMENTS HIGHLIGHTS ──────────────────────────────────── */}
      <HomeAchievementsSection initialAchievements={achievements} />

      {/* ─── 10B. INTERACTIVE DAY IN THE LIFE TIMELINE ────────────────────── */}
      <DayInTheLifeSection />

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
      <HomeCTABanner initialSchool={school} />
    </>
  );
}
