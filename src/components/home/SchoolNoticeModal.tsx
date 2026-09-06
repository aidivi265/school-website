'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Bell, Calendar, ArrowRight, Sparkles, GraduationCap, CheckCircle } from 'lucide-react';
import { SchoolCrest } from '@/components/ui';
import { useNotices } from '@/lib/cms/useCMS';
import { formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function SchoolNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { notices } = useNotices();

  useEffect(() => {
    // Check if dismissed in this browser session
    const isDismissed = sessionStorage.getItem('dps_notice_modal_seen');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 900); // 900ms subtle entrance delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('dps_notice_modal_seen', 'true');
  };

  const publishedNotices = notices.filter((n) => n.is_published !== false).slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Top Accent Bar & Close Button */}
            <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <SchoolCrest size={40} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                      Important Announcement
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-tight text-white">
                    Decent Public School, Rohini
                  </h3>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Announcement Window"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-900">
              {/* Admissions 2025-26 Callout Card */}
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl p-4 border border-amber-300/80 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <GraduationCap size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                      Admissions Open 2025–26
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">Limited Seats</span>
                  </div>
                  <p className="font-bold text-sm text-slate-950 mt-1">
                    Pre-School (Nursery) to Class IX & XI Admissions Open
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Science, Commerce & Humanities streams. Contact admission desk for interactive campus tours and registration.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href="/admissions"
                      onClick={handleClose}
                      className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      Apply Online <ArrowRight size={13} />
                    </Link>
                    <Link
                      href="/book-visit"
                      onClick={handleClose}
                      className="inline-flex items-center gap-1 text-slate-700 hover:text-navy-950 font-semibold text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Book Campus Visit
                    </Link>
                  </div>
                </div>
              </div>

              {/* Latest Circulars List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Bell size={13} className="text-amber-600" />
                    Latest Circulars & Notices
                  </span>
                  <Link
                    href="/notices"
                    onClick={handleClose}
                    className="text-[11px] font-bold text-amber-600 hover:text-amber-700"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-2">
                  {publishedNotices.map((notice) => (
                    <Link
                      key={notice.id}
                      href="/notices"
                      onClick={handleClose}
                      className="block p-3 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-300 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-800 group-hover:bg-amber-200 group-hover:text-amber-900 transition-colors">
                          {notice.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {formatDate(notice.date)}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-navy-950 line-clamp-1">
                        {notice.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Decent Public School, Sector 3, Rohini
              </span>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Continue to Website →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
