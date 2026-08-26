import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import { PageHero, SectionHeader, Card } from '../components/ui';
import { schoolConfig } from '../config/schoolConfig';

const { name } = schoolConfig;

const streams = [
  {
    name: 'Pre-Primary',
    classes: 'Nursery, LKG, UKG',
    color: 'bg-pink-50 border-pink-200',
    accent: 'text-pink-600',
    description: 'Play-based learning focused on foundational literacy, numeracy, motor skills, and social development.',
    subjects: ['Language Skills', 'Number Concepts', 'Environmental Awareness', 'Art & Craft', 'Music & Movement', 'Physical Development'],
  },
  {
    name: 'Primary',
    classes: 'Class I – V',
    color: 'bg-amber-50 border-navy-200',
    accent: 'text-amber-600',
    description: 'Strong foundation in core subjects with an emphasis on conceptual understanding, creativity, and curiosity.',
    subjects: ['English', 'Hindi', 'Mathematics', 'Environmental Science', 'Computer Basics', 'Art, Craft & Music'],
  },
  {
    name: 'Middle School',
    classes: 'Class VI – VIII',
    color: 'bg-green-50 border-green-200',
    accent: 'text-green-600',
    description: 'Comprehensive academic programme developing analytical thinking, scientific inquiry, and language skills.',
    subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit/French', 'Computer Science'],
  },
  {
    name: 'Secondary',
    classes: 'Class IX – X',
    color: 'bg-orange-50 border-orange-200',
    accent: 'text-orange-600',
    description: 'CBSE curriculum with focused preparation for Class X Board Examinations and stream selection guidance.',
    subjects: ['English', 'Hindi/Sanskrit', 'Mathematics', 'Science', 'Social Science', 'IT/Computer Applications'],
  },
  {
    name: 'Senior Secondary – Science',
    classes: 'Class XI – XII',
    color: 'bg-purple-50 border-purple-200',
    accent: 'text-purple-600',
    description: 'Rigorous Science stream with Physics, Chemistry, Biology/Maths and dedicated competitive exam coaching.',
    subjects: ['Physics', 'Chemistry', 'Mathematics / Biology', 'English', 'Physical Education / Computer Sci.'],
  },
  {
    name: 'Senior Secondary – Commerce',
    classes: 'Class XI – XII',
    color: 'bg-amber-50 border-amber-200',
    accent: 'text-amber-600',
    description: 'Industry-oriented Commerce stream with a strong focus on accountancy, economics, and business studies.',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics / Informatics Practices'],
  },
];

const policies = [
  { title: 'Examination System', items: ['Three-term assessment pattern (FA + SA)', 'Periodic Tests, Half-Yearly & Annual Exams', 'Standardized CBSE marking scheme', 'Progress reports shared with parents'] },
  { title: 'Promotion Rules', items: ['Minimum 33% marks required in each subject', 'Promotion based on aggregate performance', 'Students may avail supplementary exams', 'Grade IX & XI: internal school policy applies'] },
  { title: 'Attendance Policy', items: ['Minimum 75% attendance mandatory', 'Monthly attendance shared with parents', 'Medical leave requires documentation', 'Students below 75% may not appear in exams'] },
];

export default function AcademicsPage() {
  return (
    <div>
      <PageHero
        title="Academics"
        subtitle="A rigorous yet nurturing academic programme from Nursery to Class XII"
        breadcrumb="Academics"
        bgImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=85"
      />

      {/* Philosophy */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Approach</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Academic Philosophy</h2>
            <div className="w-14 h-1 bg-amber-600 rounded-full mb-6" />
            <p className="text-slate-600 leading-relaxed mb-4">
              At {name}, we believe that every child is inherently curious and capable of achieving greatness. Our academic philosophy is rooted in the principle of <strong className="text-gray-800">learner-centred education</strong> — where the child's natural curiosity drives learning.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              We follow the National Curriculum Framework (NCF) guidelines alongside the CBSE syllabus, ensuring our students are not just exam-ready but life-ready. Our approach integrates experiential learning, critical thinking, and project-based methodologies.
            </p>
            <div className="space-y-3">
              {['Conceptual understanding over rote memorisation', 'Activity-based and experiential learning', 'Regular assessments with constructive feedback', 'Individualised support for every learner', 'Integration of technology in everyday teaching'].map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=85" alt="Students" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Classes & Curriculum */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Curriculum" title="Classes & Programmes Offered" subtitle="A comprehensive academic journey from Pre-Primary to Senior Secondary" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream) => (
              <div key={stream.name} className={`border rounded-2xl p-6 ${stream.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className={`font-bold text-base ${stream.accent}`}>{stream.name}</p>
                    <p className="text-slate-500 text-sm">{stream.classes}</p>
                  </div>
                  <BookOpen size={20} className={stream.accent} />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{stream.description}</p>
                <div className="space-y-1.5">
                  {stream.subjects.map((sub) => (
                    <div key={sub} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                      <span className="text-slate-600 text-xs">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="How We Teach" title="Teaching Methodology" subtitle="Modern, research-backed methods that make learning effective and enjoyable" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Interactive Learning', desc: 'Smart boards, digital content, and multimedia tools make lessons vivid and engaging.', icon: '💻' },
              { title: 'Project-Based', desc: 'Students solve real-world problems through research projects and group collaborations.', icon: '🔬' },
              { title: 'Flipped Classroom', desc: 'Students explore concepts at home; class time is used for deeper discussion and problem-solving.', icon: '🔄' },
              { title: 'Formative Assessment', desc: 'Continuous, low-stakes assessments provide regular feedback to both students and teachers.', icon: '📊' },
            ].map((m) => (
              <Card key={m.title} className="p-6 text-center">
                <div className="text-4xl mb-4">{m.icon}</div>
                <h3 className="font-bold text-navy-900 text-sm mb-2">{m.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Policies" title="Examination & Promotion Rules" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {policies.map((p) => (
              <Card key={p.title} hover={false} className="p-7">
                <h3 className="font-bold text-navy-900 text-base mb-4 pb-3 border-b border-slate-100">{p.title}</h3>
                <ul className="space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-navy-800">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-serif text-3xl font-bold mb-3">Curious About Admissions?</h2>
          <p className="text-navy-200 mb-6">Explore our admission process and apply for Session 2025–26.</p>
          <Link to="/admissions" className="inline-flex items-center gap-2 bg-white text-navy-800 font-bold px-7 py-3.5 rounded-xl hover:bg-amber-50 transition-colors shadow-md">
            View Admissions <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
