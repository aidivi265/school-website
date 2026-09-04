import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import AchievementsClient from '@/components/achievements/AchievementsClient';
import { getAchievements } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'Achievements & Accolades | Board Results & Trophies',
  description:
    'Celebrating academic toppers, sports champions, cultural awards, and school honors earned by Decent Public School, Rohini.',
};

export default async function AchievementsPage() {
  const achievements = await getAchievements('all');

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
          <AchievementsClient initialAchievements={achievements} />
        </div>
      </section>
    </>
  );
}
