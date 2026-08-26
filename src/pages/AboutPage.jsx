import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Quote } from 'lucide-react';
import { PageHero, SectionHeader, Card } from '../components/ui';
import { principal } from '../data/faculty';
import { schoolConfig } from '../config/schoolConfig';

const { name, director } = schoolConfig;

// ⚠️ DEMO — replace with real school history milestones
const timeline = [
  { year: '1995', event: 'School founded with a vision of holistic education — opening with 150 students and 10 dedicated teachers.' },
  { year: '1999', event: 'Received CBSE affiliation. Secondary section (Class IX–X) formally added to the programme.' },
  { year: '2003', event: 'Inaugurated a new Science & Computer Laboratory block. First Science stream batch enrolled.' },
  { year: '2007', event: 'Sports complex and expanded library opened. Student strength crosses 700.' },
  { year: '2011', event: 'Recognised as one of the leading CBSE schools in the region by an independent education survey.' },
  { year: '2015', event: 'Smart classroom initiative launched — all classrooms upgraded with interactive whiteboards.' },
  { year: '2019', event: 'Commerce stream introduced at Senior Secondary level. New activity centre inaugurated.' },
  { year: '2020', event: 'Launched online learning platform during the pandemic, ensuring seamless education continuity.' },
  { year: '2025', event: 'Celebrating 30 years of academic excellence. Student community exceeds 1,800 learners.' },
];

const coreValues = [
  { title: 'Integrity', desc: 'We uphold the highest standards of honesty, ethics, and transparency in everything we do.' },
  { title: 'Excellence', desc: 'We pursue excellence in academics, sports, arts, and character — settling for nothing less.' },
  { title: 'Respect', desc: 'We cultivate mutual respect, empathy, and dignity for every individual in our community.' },
  { title: 'Innovation', desc: 'We encourage creative thinking, curiosity, and innovation as pathways to growth.' },
  { title: 'Service', desc: 'We instil a spirit of community service and a sense of responsibility towards society.' },
  { title: 'Inclusion', desc: 'We celebrate diversity and ensure every child feels welcomed, valued, and included.' },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title={`About ${name}`}
        subtitle="30 years of shaping young minds, nurturing talent, and building a better tomorrow"
        breadcrumb="About Us"
        bgImage="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85"
      />

      {/* About the School */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">A School Built on Vision & Values</h2>
            <div className="w-14 h-1 bg-amber-600 rounded-full mb-6" />
            <p className="text-slate-600 leading-relaxed mb-4">
              {name} was established in 1995 with a singular vision: to provide quality education that develops not just intellectually capable, but morally upright and socially responsible citizens.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Affiliated with the Central Board of Secondary Education (CBSE), the school offers classes from Nursery to Class XII across Science and Commerce streams, with a strong emphasis on holistic development.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Over three decades, we have grown from a small institution into a thriving school community of 1,800+ students, 80+ dedicated faculty members, and thousands of proud alumni spread across India and the world.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['CBSE Affiliated School', 'Classes Nursery to XII', '1800+ Students', '80+ Faculty Members', 'Science & Commerce Streams', '20+ Co-curricular Clubs'].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=85" alt="School" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-navy-800 text-white rounded-2xl p-5 shadow-xl hidden sm:block">
              <p className="text-3xl font-bold font-serif">30</p>
              <p className="text-navy-200 text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Our Purpose" title="Vision & Mission" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-navy-800 rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <span className="text-2xl">👁</span>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-navy-200 leading-relaxed text-base">
                To be a leading educational institution that nurtures global citizens — academically excellent, morally grounded, and socially responsible — who contribute meaningfully to a better world.
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To provide a holistic, inclusive, and inspirational education that empowers every student to realise their unique potential through academic rigour, character development, and co-curricular excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="What We Stand For" title="Core Values" subtitle={`The principles that guide everything we do at ${name}`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <div key={v.title} className="group p-7 rounded-2xl border border-slate-100 hover:border-navy-200 hover:bg-amber-50 transition-all duration-200">
                <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center mb-4 text-white font-bold text-base">
                  {i + 1}
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School History Timeline */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Our Journey" title="School History" subtitle="Key milestones in our 30-year journey of excellence" />
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex items-start gap-4 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`ml-12 sm:ml-0 sm:w-5/12 ${i % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'}`}>
                    <Card hover={false} className="p-5">
                      <p className="text-amber-600 font-bold text-sm mb-1">{item.year}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.event}</p>
                    </Card>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 bg-navy-800 rounded-full border-2 border-white shadow-md flex-shrink-0 mt-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="From the Principal's Desk" title="Principal's Message" />
          <Card hover={false} className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex-shrink-0 text-center sm:text-left">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto sm:mx-0 shadow-lg border-4 border-white ring-2 ring-amber-100">
                  <img src={principal.image} alt={principal.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4">
                  <p className="font-bold text-navy-900">{principal.name}</p>
                  <p className="text-amber-600 text-sm font-medium">{principal.designation}</p>
                  <p className="text-slate-400 text-xs mt-1">{principal.qualification}</p>
                  <p className="text-slate-400 text-xs">{principal.experience} Experience</p>
                </div>
              </div>
              <div className="flex-1">
                <Quote size={36} className="text-navy-200 mb-4" />
                {schoolConfig.principal.message.map((para, i) => (
                  <p key={i} className="text-slate-700 text-base leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Management Message */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="From the Management" title="Director's Message" />
          <Card hover={false} className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex-shrink-0 text-center sm:text-left">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto sm:mx-0 shadow-lg border-4 border-white ring-2 ring-amber-100">
                  <img src={director.image} alt={director.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4">
                  <p className="font-bold text-navy-900">{director.name}</p>
                  <p className="text-amber-600 text-sm font-medium">{director.designation}, {name}</p>
                </div>
              </div>
              <div className="flex-1">
                <Quote size={36} className="text-navy-200 mb-4" />
                {director.message.map((para, i) => (
                  <p key={i} className="text-slate-700 text-base leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-navy-800">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-serif text-3xl font-bold mb-3">Ready to Join Our Family?</h2>
          <p className="text-navy-200 mb-6">Admissions for the upcoming session are open. Contact us today to learn more.</p>
          <Link to="/admissions" className="inline-flex items-center gap-2 bg-white text-navy-800 font-bold px-7 py-3.5 rounded-xl hover:bg-amber-50 transition-colors shadow-md">
            Apply Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
