import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Badge, Card } from '@/components/ui';
import { getFaculty } from '@/lib/supabase/service';
import { GraduationCap, Award, Briefcase, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Faculty Directory | Experienced Educators',
  description:
    'Meet the dedicated faculty and leadership at Decent Public School, Rohini, Delhi. Qualified subject experts committed to student excellence.',
};

export default async function FacultyPage() {
  const facultyList = await getFaculty();

  return (
    <>
      <PageHeader
        eyebrow="Our Educators"
        title="Faculty & Mentors"
        subtitle="A distinguished team of passionate, highly qualified teachers committed to inspiring every student"
        breadcrumbs={[{ label: 'Faculty' }]}
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Academic Leadership"
            title="Faculty Directory"
            subtitle="Guiding students with subject mastery, empathetic mentorship, and modern pedagogical skills"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyList.map((teacher) => (
              <Card key={teacher.id} className="flex flex-col group overflow-hidden">
                <div className="relative h-64 overflow-hidden bg-navy-950">
                  <img
                    src={teacher.photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80'}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                      {teacher.department}
                    </span>
                    <h3 className="font-serif font-bold text-white text-xl leading-tight">
                      {teacher.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-amber-600 flex-shrink-0" />
                      <p className="text-navy-950 font-semibold text-sm">{teacher.designation}</p>
                    </div>
                    {teacher.subject && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <GraduationCap size={14} className="text-amber-600 flex-shrink-0" />
                        <span>Subject: <strong>{teacher.subject}</strong></span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                      <Award size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{teacher.qualification} · <strong>{teacher.experience_years} Exp.</strong></span>
                    </div>
                    {teacher.bio && (
                      <p className="text-slate-600 text-xs leading-relaxed pt-2 border-t border-slate-100 line-clamp-3">
                        {teacher.bio}
                      </p>
                    )}
                  </div>

                  {teacher.message && (
                    <div className="mt-4 pt-3 border-t border-slate-100 bg-amber-50/50 p-3 rounded-xl">
                      <p className="text-slate-700 text-[11px] italic">
                        "{teacher.message}"
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
