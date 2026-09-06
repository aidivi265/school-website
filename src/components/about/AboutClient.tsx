'use client';

import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader } from '@/components/ui';
import { Target, Compass, Heart, Shield, CheckCircle } from 'lucide-react';
import { School } from '@/types';
import { usePagesCMS, useSiteSettings } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function AboutClient({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  const values = [
    {
      icon: Target,
      title: data.value1Title || 'Academic Excellence',
      desc: data.value1Desc || 'Fostering deep analytical understanding, critical thinking, and a lifetime love for learning.',
    },
    {
      icon: Heart,
      title: data.value2Title || 'Integrity & Ethics',
      desc: data.value2Desc || 'Instilling moral rectitude, empathy, humility, and a strong sense of civic responsibility in every student.',
    },
    {
      icon: Compass,
      title: data.value3Title || 'Holistic Personality',
      desc: data.value3Desc || 'Nurturing physical vitality, creative expression, leadership qualities, and emotional resilience.',
    },
    {
      icon: Shield,
      title: data.value4Title || 'Inclusivity & Respect',
      desc: data.value4Desc || 'Creating an egalitarian, safe, and supportive school community that cherishes diversity and mutual respect.',
    },
  ];

  const checklists = [
    data.aboutChecklist1 || `Permanently affiliated with CBSE (Affiliation No. ${settings.affiliation_no})`,
    data.aboutChecklist2 || 'Comprehensive schooling from Pre-School up to Senior Secondary (Class XII)',
    data.aboutChecklist3 || 'Dedicated faculty of 110+ trained and qualified educators',
    data.aboutChecklist4 || 'Optimal 25:1 student-teacher ratio ensuring personalized attention',
  ].filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow={data.aboutHeroEyebrow || 'Our Story & Values'}
        title={data.aboutHeroTitle || 'About Decent Public School'}
        subtitle={data.aboutHeroSubtitle || 'Nurturing intellectual vitality, strong moral character, and future-ready leaders since 1995'}
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Overview & History */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">
                {data.aboutHeritageEyebrow || 'Our Heritage'}
              </p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mb-6 leading-tight">
              {data.aboutHeritageTitle || 'Three Decades of Inspiring Education in Rohini, Delhi'}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {data.aboutHeritageP1 || (
                <>
                  Established in {settings.established}, <strong>{settings.name}</strong> stands as an epitome of progressive education in Sector 3, Rohini, Delhi. Affiliated with the Central Board of Secondary Education (CBSE), the school has consistently set benchmarks in scholastic achievement and co-curricular prowess.
                </>
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {data.aboutHeritageP2 || 'Our campus provides an enriching ecosystem where traditional Indian values merge seamlessly with cutting-edge 21st-century pedagogy, smart technology, and modern sports infrastructure.'}
            </p>
            <div className="space-y-3">
              {checklists.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
                    <CheckCircle size={13} />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&q=85"
                alt="Decent Public School Campus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-gradient-to-br from-navy-950 to-navy-900 border border-amber-500/30 text-white rounded-2xl p-6 shadow-2xl hidden sm:block">
              <p className="font-serif text-amber-400 text-3xl font-bold">{settings.established || '1995'}</p>
              <p className="text-xs text-slate-300 uppercase tracking-widest mt-0.5">Year of Foundation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Our Guiding Light"
            title="Vision & Mission"
            subtitle="The fundamental philosophy that drives our educational institution every day"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-400/60 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="font-serif font-bold text-navy-950 text-2xl mb-4">{data.visionTitle || 'Our Vision'}</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {data.visionText || 'To be a premier center of educational excellence that nurtures enlightened, innovative, and ethically grounded global citizens capable of contributing meaningfully to society and thriving in an ever-evolving world.'}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-400/60 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-950 flex items-center justify-center mb-6">
                <Compass size={28} />
              </div>
              <h3 className="font-serif font-bold text-navy-950 text-2xl mb-4">{data.missionTitle || 'Our Mission'}</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {data.missionText || 'To provide a stimulating learning environment where academic rigour, technological innovation, character development, and inclusive values empower every student to discover their unique potential and achieve lifelong success.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Principal Desk */}
      <section id="leadership" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Leadership Desk"
            title="Message from Our Principal"
            subtitle="Guiding young minds towards excellence, character, and lifelong leadership"
          />

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative h-80 lg:h-auto bg-navy-950">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Dr. Ananya Sharma, Principal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                <h4 className="font-serif font-bold text-lg">{data.principalName || 'Dr. Ananya Sharma'}</h4>
                <p className="text-xs text-amber-400 font-semibold">{data.principalDesignation || 'Principal, Decent Public School'}</p>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="hidden lg:block">
                  <h4 className="font-serif font-bold text-2xl text-navy-950">{data.principalName || 'Dr. Ananya Sharma'}</h4>
                  <p className="text-xs text-amber-700 font-bold uppercase tracking-wider mt-0.5">
                    {data.principalDesignation || 'Principal, Decent Public School'} · {data.principalQualification || 'M.Ed., Ph.D. (Education)'}
                  </p>
                </div>

                <div className="border-l-2 border-amber-500 pl-4 py-1 italic text-slate-700 text-sm font-medium">
                  "{data.principalQuote || 'Education is not merely the accumulation of facts, but the ignition of intellect, character, and ethical purpose.'}"
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {data.principalMessageP1 ||
                    'At Decent Public School, we believe that every child is endowed with unique brilliance. Our pedagogical mission is to kindle their innate curiosity, cultivate intellectual rigor, and instill deep-rooted moral values that empower them to face global challenges with courage and empathy.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Decent Public School, Rohini</span>
                <span className="text-xs font-serif font-bold text-amber-700">Sector 3, Rohini, Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Ethos"
            title="Our Core Values"
            subtitle="The enduring pillars that guide our teachers, students, and administration"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-7 rounded-2xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-950 text-amber-400 flex items-center justify-center mb-5 shadow-sm">
                  <Icon size={22} />
                </div>
                <h4 className="font-serif font-bold text-navy-950 text-lg mb-2">{title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
