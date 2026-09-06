'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ChevronRight } from 'lucide-react';
import { useNotices } from '@/lib/cms/useCMS';
import { formatDate } from '@/lib/utils';

export default function LiveNoticeTicker() {
  const { notices } = useNotices();

  const publishedNotices = notices.filter((n) => n.is_published !== false);
  const displayNotices = publishedNotices.length > 0 ? publishedNotices : notices;

  if (displayNotices.length === 0) return null;

  return (
    <div className="bg-navy-950 text-white border-b border-navy-800/80 relative z-20 overflow-hidden shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center h-10 text-xs">
        {/* Left Sticky Badge */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-3 py-1 rounded-md flex-shrink-0 z-10 shadow-sm mr-3">
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
          <Bell size={13} className="fill-slate-950" />
          <span className="uppercase tracking-wider text-[10px] font-extrabold hidden xs:inline">
            Latest Updates
          </span>
        </div>

        {/* Marquee Scrolling Ticker Container */}
        <div className="flex-1 overflow-hidden relative group">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] py-1 cursor-pointer">
            {displayNotices.map((notice, idx) => (
              <Link
                key={`${notice.id}-${idx}`}
                href="/notices"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-amber-400 transition-colors"
              >
                <span className="text-[10px] bg-white/10 text-amber-300 font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                  {notice.category}
                </span>
                <span className="font-medium text-xs text-white group-hover:underline">
                  {notice.title}
                </span>
                <span className="text-[11px] text-slate-400">
                  ({formatDate(notice.date)})
                </span>
                <span className="text-amber-500 font-bold text-sm mx-2">•</span>
              </Link>
            ))}

            {/* Duplicate for seamless infinite loop */}
            {displayNotices.map((notice, idx) => (
              <Link
                key={`dup-${notice.id}-${idx}`}
                href="/notices"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-amber-400 transition-colors"
              >
                <span className="text-[10px] bg-white/10 text-amber-300 font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                  {notice.category}
                </span>
                <span className="font-medium text-xs text-white group-hover:underline">
                  {notice.title}
                </span>
                <span className="text-[11px] text-slate-400">
                  ({formatDate(notice.date)})
                </span>
                <span className="text-amber-500 font-bold text-sm mx-2">•</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Quick Link */}
        <Link
          href="/notices"
          className="hidden md:flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 ml-4 flex-shrink-0 bg-navy-900/90 px-2.5 py-1 rounded-md border border-navy-800 transition-colors"
        >
          <span>All Notices</span>
          <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}
