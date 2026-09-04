'use client';

import Link from 'next/link';
import { ChevronRight, Calendar, ArrowRight, Download } from 'lucide-react';
import { Notice } from '@/types';
import { useNotices } from '@/lib/cms/useCMS';
import { Card, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

export default function HomeNoticesSection({ initialNotices }: { initialNotices: Notice[] }) {
  const { notices: liveNotices } = useNotices(initialNotices);

  const displayNotices = liveNotices.filter((n) => n.is_published !== false).slice(0, 3);

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-amber-500" />
              <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">
                Official Bulletin
              </p>
              <span className="w-6 h-px bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
              Latest News & Official Notices
            </h2>
          </div>
          <Link
            href="/notices"
            className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-sm hover:text-amber-700 transition-colors"
          >
            View All Notices <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNotices.map((notice, idx) => (
            <Card key={notice.id} className="flex flex-col group border-slate-200">
              <div className="relative h-48 overflow-hidden bg-navy-950">
                <img
                  src={notice.image_url || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80'}
                  alt={notice.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge variant={notice.category === 'Admissions' ? 'amber' : 'navy'}>
                    {notice.category}
                  </Badge>
                  {idx === 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-slate-400 text-xs flex items-center gap-1.5 mb-2.5">
                    <Calendar size={12} className="text-amber-500" />
                    {formatDate(notice.date)}
                  </span>
                  <h3 className="font-serif font-bold text-navy-950 text-base mb-2 leading-snug line-clamp-2">
                    {notice.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {notice.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/notices"
                    className="text-amber-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read Notice <ArrowRight size={14} />
                  </Link>
                  {notice.document_url && (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Download size={12} /> PDF Attached
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
