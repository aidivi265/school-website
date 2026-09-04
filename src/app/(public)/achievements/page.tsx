import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Badge, Card } from '@/components/ui';
import { getAchievements } from '@/lib/supabase/service';
import { Award, Trophy, Star, Medal, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Achievements & Accolades | Board Results & Trophies',
  description:
    'Celebrating academic toppers, sports champions, cultural awards, and school honors earned by Decent Public School, Rohini.',
};

export default async function AchievementsPage() {
  const achievements = await getAchievements('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy size={26} className="text-amber-500" />;
      case 'star':
        return <Star size={26} className="text-amber-500" />;
      case 'medal':
        return <Medal size={26} className="text-amber-500" />;
      default:
        return <Award size={26} className="text-amber-500" />;
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Pride & Glory"
        title="Student & School Achievements"
        subtitle="Recognitions that mirror our dedication to scholastic excellence, sportsmanship, and creative brilliance"
        breadcrumbs={[{ label: 'Achievements' }]}
      />

      {/* Summary Highlight Stats */}
      <section className="py-12 px-4 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <p className="font-serif font-bold text-3xl sm:text-4xl text-amber-400 mb-1">100%</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider">CBSE Board Pass Rate</p>
          </div>
          <div className="p-4 border-l border-navy-800">
            <p className="font-serif font-bold text-3xl sm:text-4xl text-amber-400 mb-1">45+</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider">Scored 90%+ in Boards</p>
          </div>
          <div className="p-4 border-t sm:border-t-0 sm:border-l border-navy-800">
            <p className="font-serif font-bold text-3xl sm:text-4xl text-amber-400 mb-1">80+</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider">State & District Trophies</p>
          </div>
          <div className="p-4 border-t lg:border-t-0 lg:border-l border-navy-800">
            <p className="font-serif font-bold text-3xl sm:text-4xl text-amber-400 mb-1">AIR 14</p>
            <p className="text-xs text-slate-300 uppercase tracking-wider">Science Olympiad Rank</p>
          </div>
        </div>
      </section>

      {/* Accolades List */}
      <section className="py-20 px-4 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Roll of Honor"
            title="Distinguished Milestones"
            subtitle="Explore our accolades across Academic Olympiads, Sports Meets, Cultural Festivals, and Institutional Rankings"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((ach) => (
              <Card key={ach.id} className="p-7 sm:p-8 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(ach.icon)}
                    </div>
                    <Badge variant={ach.is_highlight ? 'gold' : 'navy'}>
                      {ach.category}
                    </Badge>
                  </div>

                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                    Session {ach.year}
                  </span>

                  <h3 className="font-serif font-bold text-navy-950 text-xl mb-3 leading-snug">
                    {ach.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                  <Sparkles size={14} /> Decent Public School Honor Roll
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
