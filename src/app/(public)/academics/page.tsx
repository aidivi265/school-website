import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Badge, Card } from '@/components/ui';
import { BookOpen, Award, CheckCircle2, ArrowRight, Sparkles, Brain, Compass, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academics & Curriculum | CBSE Streams & Pedagogy',
  description:
    'Explore the academic curriculum at Decent Public School, Rohini. CBSE affiliated courses from Pre-School to Class XII including Science and Commerce streams.',
};

export default function AcademicsPage() {
  const levels = [
    {
      title: 'Foundational Stage (Pre-School & Pre-Primary)',
      age: 'Ages 3 to 6 Years',
      desc: 'Play-based, activity-oriented learning fostering sensory skills, basic phonetics, numeracy, and social-emotional development in a joyful setting.',
      highlights: ['Montessori & Activity-based Learning', 'Early Language & Phonics', 'Motor Skills & Creative Art', 'No Formal Examinations'],
    },
    {
      title: 'Preparatory & Primary Wing (Classes I to V)',
      age: 'Classes I – V (Ages 6 to 11)',
      desc: 'Building solid conceptual clarity in Languages, Mathematics, Environmental Studies, Computer Science, and General Awareness through experiential projects.',
      highlights: ['Interactive Smart Classes', 'Language Fluency & Oratory', 'Foundational Mathematics', 'Introduction to Coding'],
    },
    {
      title: 'Middle School (Classes VI to VIII)',
      age: 'Classes VI – VIII (Ages 11 to 14)',
      desc: 'Transition to structured disciplines with specialized Science (Physics, Chemistry, Biology), Social Sciences, Mathematics, Third Language (Sanskrit/French), and ICT.',
      highlights: ['Hands-on Science Labs', 'Robotics & STEM Labs', 'Third Language Option', 'Inter-House Debates & Quizzes'],
    },
    {
      title: 'Secondary School (Classes IX & X)',
      age: 'Classes IX – X (CBSE Board Preparation)',
      desc: 'Rigorous CBSE syllabus preparation, structured internal assessments, diagnostic testing, remedial support, and laboratory practical mastery.',
      highlights: ['CBSE Board Curriculum', 'Regular Mock Assessments', 'Individual Academic Mentoring', 'Career Guidance Seminars'],
    },
    {
      title: 'Senior Secondary Wing (Classes XI & XII)',
      age: 'Classes XI – XII (Science & Commerce Streams)',
      desc: 'Advanced specialization in chosen academic streams with integrated competitive entrance foundation (JEE, NEET, CUET, CA Foundation).',
      highlights: ['Science & Commerce Streams', 'Advanced Labs & Project Work', 'Entrance Mentorship', 'Leadership & Research Papers'],
    },
  ];

  const streams = [
    {
      name: 'Science Stream (Medical & Non-Medical)',
      badge: 'PCM / PCB / PCMB',
      desc: 'Designed for aspiring engineers, doctors, researchers, architects, and technologists.',
      subjects: [
        'Physics',
        'Chemistry',
        'Mathematics / Biology',
        'English Core',
        'Computer Science / Physical Education / Informatics Practices (Electives)',
      ],
    },
    {
      name: 'Commerce Stream',
      badge: 'Commerce with / without Maths',
      desc: 'Geared towards future entrepreneurs, chartered accountants, economists, and corporate leaders.',
      subjects: [
        'Accountancy',
        'Business Studies',
        'Economics',
        'English Core',
        'Mathematics / Applied Mathematics / Physical Education / Informatics Practices',
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Academic Excellence"
        title="Curriculum & Pedagogy"
        subtitle="Empowering learners through structured CBSE syllabus, scientific inquiry, and experiential learning"
        breadcrumbs={[{ label: 'Academics' }]}
      />

      {/* Academic Philosophy */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">Our Philosophy</p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mb-6 leading-tight">
              A Child-Centric, Concept-Driven Educational Framework
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              At <strong>Decent Public School</strong>, academic learning is designed to nurture critical thinking rather than rote memorization. We follow the National Curriculum Framework (NCF) prescribed by the Central Board of Secondary Education (CBSE), enhanced with modern global best practices.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our classroom pedagogy places the child at the center of the learning process, blending interactive digital simulations, lab practicals, group debates, and self-directed inquiries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Interactive Learning', desc: 'Smart touch panels & audio-visual modules' },
                { title: 'Remedial Support', desc: 'Personalized doubt-clearing sessions' },
                { title: 'Continuous Assessment', desc: 'Formative & summative CBSE evaluations' },
                { title: 'Holistic Enrichment', desc: 'STEM clubs, debates, quizzes & MUNs' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-serif font-bold text-navy-950 text-sm mb-1">{item.title}</p>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&q=85"
              alt="Classroom learning at Decent Public School"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Academic Stages */}
      <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Academic Stages"
            title="School Levels & Class Hierarchy"
            subtitle="Tailored educational programmes designed for every cognitive stage of child development"
          />

          <div className="space-y-6 max-w-5xl mx-auto">
            {levels.map((lvl, index) => (
              <div
                key={lvl.title}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="font-serif font-bold text-navy-950 text-xl">{lvl.title}</h3>
                  <Badge variant="navy">{lvl.age}</Badge>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{lvl.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-100">
                  {lvl.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-amber-600 flex-shrink-0" />
                      <span className="text-slate-700 text-xs font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Secondary Streams (Classes XI & XII) */}
      <section className="py-20 px-4 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Senior Secondary Wing"
            title="Streams in Classes XI & XII"
            subtitle="Comprehensive academic avenues preparing students for premier universities and entrance tests"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {streams.map((st) => (
              <div
                key={st.name}
                className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block mb-4">
                    <Badge variant="amber">{st.badge}</Badge>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-amber-400 mb-3">{st.name}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{st.desc}</p>
                  <div className="space-y-2.5 pt-4 border-t border-navy-800">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Core & Elective Subjects:
                    </p>
                    {st.subjects.map((sub, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-navy-800">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-white transition-colors"
                  >
                    Enquire for Class XI Admission <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
