'use client';

import Link from 'next/link';
import { ChevronRight, Award, Trophy, Star, Medal, Sparkles } from 'lucide-react';
import { Achievement } from '@/types';
import { useAchievements } from '@/lib/cms/useCMS';
import { Card, Badge } from '@/components/ui';

export default function HomeAchievementsSection({ initialAchievements }: { initialAchievements: Achievement[] }) {
  const { achievements: liveAchievements } = useAchievements(initialAchievements);

  const displayAchievements = liveAchievements
    .filter((a) => a.is_published !== false)
    .slice(0, 4);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy size={24} className="text-amber-500" />;
      case 'star':
        return <Star size={24} className="text-amber-500" />;
      case 'medal':
        return <Medal size={24} className="text-amber-500" />;
      default:
        return <Award size={24} className="text-amber-500" />;
    }
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">
                Excellence & Accolades
              </p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
              Student & School Achievements
            </h2>
          </div>
          <Link
            href="/achievements"
            className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-sm hover:text-amber-700 transition-colors"
          >
            View All Achievements <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayAchievements.map((ach) => (
            <Card key={ach.id} className="p-6 flex flex-col justify-between group border-slate-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(ach.icon)}
                  </div>
                  <Badge variant={ach.is_highlight ? 'gold' : 'navy'}>
                    {ach.category}
                  </Badge>
                </div>

                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                  Session {ach.year}
                </span>
                <h3 className="font-serif font-bold text-navy-950 text-base mb-2 leading-snug line-clamp-2">
                  {ach.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] text-amber-700 font-semibold">
                <Sparkles size={12} /> Decent Public School Honor
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
