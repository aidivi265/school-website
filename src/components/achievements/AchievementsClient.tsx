'use client';

import React, { useState } from 'react';
import { useAchievements, useAlumni } from '@/lib/cms/useCMS';
import { Achievement, AlumniProfile } from '@/types';
import { SectionHeader, Badge, Card } from '@/components/ui';
import {
  Award,
  Trophy,
  Star,
  Medal,
  Sparkles,
  Users,
  GraduationCap,
  Briefcase,
  MapPin,
  Quote,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AchievementsClient({
  initialAchievements,
  initialAlumni,
}: {
  initialAchievements: Achievement[];
  initialAlumni?: AlumniProfile[];
}) {
  const { achievements: liveAchievements } = useAchievements(initialAchievements);
  const { alumni: liveAlumni } = useAlumni(initialAlumni);

  const [activeTab, setActiveTab] = useState<'all' | 'academics' | 'sports' | 'stem' | 'alumni'>('all');

  const publishedAchievements = liveAchievements.filter((a) => a.is_published !== false);

  const filteredAchievements = publishedAchievements.filter((a) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'academics') return a.category.toLowerCase().includes('academic') || a.category.toLowerCase().includes('board');
    if (activeTab === 'sports') return a.category.toLowerCase().includes('sports') || a.category.toLowerCase().includes('athletics');
    if (activeTab === 'stem') return a.category.toLowerCase().includes('stem') || a.category.toLowerCase().includes('olympiad') || a.category.toLowerCase().includes('robotics');
    return true;
  });

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
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Roll of Honor & Hall of Fame"
        title="Student Triumphs & Alumni Legacy"
        subtitle="Celebrating CBSE Board Toppers, National Olympiad medalists, sports champions, and distinguished alumni making a global impact"
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'all', label: 'All Accolades', count: publishedAchievements.length },
          { id: 'academics', label: '🎓 CBSE Board Toppers & Academics' },
          { id: 'sports', label: '🏆 Sports & Cluster Championships' },
          { id: 'stem', label: '🤖 STEM & Robotics Olympiads' },
          { id: 'alumni', label: '🌟 Alumni Spotlight Directory', count: liveAlumni.length },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-navy-950 border-navy-950 text-amber-400 shadow-lg scale-105'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── ALUMNI SPOTLIGHT TAB VIEW ────────────────────────────────────── */}
      {activeTab === 'alumni' ? (
        <div className="space-y-8">
          <div className="p-6 bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white rounded-3xl border border-navy-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <GraduationCap className="w-4 h-4" /> The Global Decentian Network
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Distinguished Alumni Spotlight
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Our alumni excel across IAS Civil Services, AIIMS Medical Science, IITs, Google DeepMind, and Forbes 30 Under 30 entrepreneurial ventures.
              </p>
            </div>
            <div className="bg-navy-800/80 border border-navy-700 px-5 py-3 rounded-2xl text-center shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Alumni Worldwide</span>
              <span className="font-serif text-3xl font-black text-amber-400">12,000+</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveAlumni.map((alum) => (
              <div
                key={alum.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Header */}
                  <div className="relative h-48 bg-navy-950 overflow-hidden">
                    <img
                      src={alum.photo_url}
                      alt={alum.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                    <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                      {alum.batch}
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="font-serif font-bold text-lg text-white leading-tight">{alum.name}</h4>
                      <p className="text-xs text-amber-300 font-medium">{alum.current_role}</p>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{alum.organization}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{alum.location}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-950 font-medium flex items-start gap-2">
                      <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{alum.achievement}</span>
                    </div>

                    <div className="border-l-2 border-amber-400 pl-3 py-1">
                      <p className="text-xs text-slate-600 italic">"{alum.quote}"</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded-md font-bold text-[10px]">
                    {alum.category}
                  </span>
                  <span className="text-amber-700 font-bold">DPS Legacy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ─── STANDARD ACHIEVEMENTS GRID ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((ach) => (
            <Card key={ach.id} className="p-7 sm:p-8 flex flex-col justify-between group hover:shadow-xl transition-all">
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
                <Sparkles size={14} className="text-amber-500" />
                <span>Decent Public School Excellence</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
