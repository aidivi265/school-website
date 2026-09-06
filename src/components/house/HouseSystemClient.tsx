'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  Shield,
  Sprout,
  Sparkles,
  Award,
  Users,
  Medal,
  ChevronRight,
  TrendingUp,
  Star,
  BookOpen,
  Heart,
} from 'lucide-react';
import { useHouses } from '@/lib/cms/useCMS';
import { House } from '@/types';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  Flame: Flame,
  Shield: Shield,
  Sprout: Sprout,
  Sparkles: Sparkles,
};

export function HouseSystemClient() {
  const { houses } = useHouses();
  const [activeHouseId, setActiveHouseId] = useState<string>(houses[0]?.id || 'house-agni');

  // Sort houses by total points descending for the live leaderboard
  const sortedHouses = [...houses].sort((a, b) => b.points.total - a.points.total);
  const activeHouse = houses.find((h) => h.id === activeHouseId) || houses[0];
  const ActiveIcon = iconMap[activeHouse?.badge_icon] || Shield;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-semibold mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            Character, Camaraderie & Competition
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-4">
            The House System & <span className="text-amber-600">Leaderboard</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At Decent Public School, every student belongs to one of four historic Houses — fostering healthy competition, leadership, camaraderie, and ethical sportsmanship.
          </p>
        </div>

        {/* ─── LIVE LEADERBOARD BANNER ──────────────────────────────────────── */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-navy-900 mb-16 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-navy-800">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" /> Live Inter-House Points Table (2024–25)
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Championship Trophy Tally
              </h2>
            </div>
            <div className="text-xs text-slate-400 bg-navy-900/80 px-4 py-2 rounded-xl border border-navy-800 self-start md:self-auto">
              Updated weekly across Academics, Sports & Cultural events
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedHouses.map((h, rank) => {
              const Icon = iconMap[h.badge_icon] || Shield;
              const isFirst = rank === 0;

              return (
                <div
                  key={h.id}
                  onClick={() => setActiveHouseId(h.id)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative ${
                    isFirst
                      ? 'bg-gradient-to-b from-amber-500/20 to-navy-900 border-amber-400/60 shadow-lg shadow-amber-500/10 scale-[1.02]'
                      : 'bg-navy-900/60 border-navy-800 hover:bg-navy-900 hover:border-slate-700'
                  }`}
                >
                  {isFirst && (
                    <div className="absolute -top-3 right-4 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> Current Leader
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow"
                      style={{ backgroundColor: h.colorHex }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif font-black text-2xl text-slate-500">
                      #{rank + 1}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white mb-1">{h.name}</h3>
                  <div className="text-xs text-slate-400 mb-4">{h.colorName}</div>

                  <div className="space-y-1.5 text-xs text-slate-300 pt-3 border-t border-navy-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Academics:</span>
                      <span className="font-mono font-bold text-white">{h.points.academics} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sports:</span>
                      <span className="font-mono font-bold text-white">{h.points.sports} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cultural & Arts:</span>
                      <span className="font-mono font-bold text-white">{h.points.cultural} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Discipline:</span>
                      <span className="font-mono font-bold text-white">{h.points.discipline} pts</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-navy-700 text-amber-400 font-bold text-sm">
                      <span>Total Score:</span>
                      <span className="font-mono text-base">{h.points.total}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── DETAILED HOUSE SHOWCASE ───────────────────────────────────────── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              Explore Our Four Houses
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select a house to view its ethos, leadership council, and recent triumphs
            </p>
          </div>

          {/* House Tab Selector */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-8">
            {houses.map((h) => {
              const isSelected = h.id === activeHouseId;
              const Icon = iconMap[h.badge_icon] || Shield;

              return (
                <button
                  key={h.id}
                  onClick={() => setActiveHouseId(h.id)}
                  className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'shadow-lg text-white scale-105'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  style={isSelected ? { backgroundColor: h.colorHex, borderColor: h.colorHex } : {}}
                >
                  <Icon className="w-4 h-4" />
                  {h.name}
                </button>
              );
            })}
          </div>

          {/* Active House Detail View */}
          {activeHouse && (
            <motion.div
              key={activeHouse.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
            >
              <div
                className="p-8 sm:p-12 text-white relative"
                style={{
                  background: `linear-gradient(135deg, ${activeHouse.colorHex} 0%, #0f172a 100%)`,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                      <ActiveIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                        {activeHouse.colorName} House
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                        {activeHouse.name}
                      </h3>
                      <p className="text-slate-200 text-sm font-medium italic mt-1">
                        "{activeHouse.motto}"
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center self-start md:self-auto min-w-[140px]">
                    <div className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">
                      Championship Points
                    </div>
                    <div className="font-serif text-3xl font-black text-amber-300 mt-0.5">
                      {activeHouse.points.total}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Meaning & Ethos */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-600" />
                    House Ethos & Symbolism
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {activeHouse.meaning}
                  </p>
                </div>

                {/* Leadership Council */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600" />
                    House Leadership Council
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">House Master / Mistress</span>
                      <span className="font-semibold text-navy-950">{activeHouse.house_master}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Captain (Boy)</span>
                        <span className="font-semibold text-navy-950">{activeHouse.captain_boy}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Captain (Girl)</span>
                        <span className="font-semibold text-navy-950">{activeHouse.captain_girl}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Vice Captain</span>
                      <span className="font-semibold text-navy-950">{activeHouse.vice_captain}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Triumphs */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    Recent Shields & Triumphs
                  </h4>
                  <div className="space-y-2">
                    {activeHouse.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-amber-950 flex items-start gap-2"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Inter-House Values Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-navy-950 mb-3">
            How the House System Shapes Character
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto mb-6">
            From the moment a child enters Pre-School, they are assigned to a House that becomes their extended family throughout their school journey, instilling leadership, humility in victory, and resilience in defeat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs transition-colors shadow"
            >
              Apply for Admission 2025–26 <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              View Student Wall of Fame <Award className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
