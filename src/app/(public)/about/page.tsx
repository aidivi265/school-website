import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Badge } from '@/components/ui';
import { Target, Compass, Heart, Award, Shield, CheckCircle } from 'lucide-react';
import { getSchoolData } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'About Us | Vision, Mission & Leadership',
  description:
    'Learn about Decent Public School, Rohini, Delhi. Discover our founding story since 1995, educational vision, mission, core values, and principal leadership.',
};

export default async function AboutPage() {
  const school = await getSchoolData();

  const values = [
    {
      icon: Target,
      title: 'Academic Excellence',
      desc: 'Fostering deep analytical understanding, critical thinking, and a lifetime love for learning.',
    },
    {
      icon: Heart,
      title: 'Integrity & Ethics',
      desc: 'Instilling moral rectitude, empathy, humility, and a strong sense of civic responsibility in every student.',
    },
    {
      icon: Compass,
      title: 'Holistic Personality',
      desc: 'Nurturing physical vitality, creative expression, leadership qualities, and emotional resilience.',
    },
    {
      icon: Shield,
      title: 'Inclusivity & Respect',
      desc: 'Creating an egalitarian, safe, and supportive school community that cherishes diversity and mutual respect.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Our Story & Values"
        title="About Decent Public School"
        subtitle="Nurturing intellectual vitality, strong moral character, and future-ready leaders since 1995"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Overview & History */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">Our Heritage</p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mb-6 leading-tight">
              Three Decades of Inspiring Education in Rohini, Delhi
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Established in {school.established}, <strong>{school.name}</strong> stands as an epitome of progressive education in Sector 3, Rohini, Delhi. Affiliated with the Central Board of Secondary Education (CBSE), the school has consistently set benchmarks in scholastic achievement and co-curricular prowess.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our campus provides an enriching ecosystem where traditional Indian values merge seamlessly with cutting-edge 21st-century pedagogy, smart technology, and modern sports infrastructure.
            </p>
            <div className="space-y-3">
              {[
                'Permanently affiliated with CBSE (Affiliation No. ' + school.affiliation_no + ')',
                'Comprehensive schooling from Pre-School up to Senior Secondary (Class XII)',
                'Dedicated faculty of 110+ trained and qualified educators',
                'Optimal 25:1 student-teacher ratio ensuring personalized attention',
              ].map((item, idx) => (
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
              <p className="font-serif text-amber-400 text-3xl font-bold">1995</p>
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
              <h3 className="font-serif font-bold text-navy-950 text-2xl mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To be a premier center of educational excellence that nurtures enlightened, innovative, and ethically grounded global citizens capable of contributing meaningfully to society and thriving in an ever-evolving world.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-400/60 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-950 flex items-center justify-center mb-6">
                <Compass size={28} />
              </div>
              <h3 className="font-serif font-bold text-navy-950 text-2xl mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To provide a stimulating learning environment where academic rigour, technological innovation, character development, and inclusive values empower every student to discover their unique potential and achieve lifelong success.
              </p>
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
