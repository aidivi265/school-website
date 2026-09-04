'use client';

import { useAchievements } from '@/lib/cms/useCMS';
import { Achievement } from '@/types';
import { SectionHeader, Badge, Card } from '@/components/ui';
import { Award, Trophy, Star, Medal, Sparkles } from 'lucide-react';

export default function AchievementsClient({ initialAchievements }: { initialAchievements: Achievement[] }) {
  const { achievements: liveAchievements } = useAchievements(initialAchievements);

  const publishedAchievements = liveAchievements.filter((a) => a.is_published !== false);

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
    <div>
      <SectionHeader
        eyebrow="Roll of Honor"
        title="Distinguished Milestones"
        subtitle="Explore our accolades across Academic Olympiads, Sports Meets, Cultural Festivals, and Institutional Rankings"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publishedAchievements.map((ach) => (
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
  );
}
