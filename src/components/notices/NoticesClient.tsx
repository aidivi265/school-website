'use client';

import { useState } from 'react';
import { useNotices } from '@/lib/cms/useCMS';
import { Notice } from '@/types';
import { Badge, Card, Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Search, Calendar, FileText, Download, X, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Admissions', 'Examination', 'Holiday', 'Achievement', 'Event', 'Circular', 'General'];

export default function NoticesClient({ initialNotices }: { initialNotices: Notice[] }) {
  const { notices: liveNotices } = useNotices(initialNotices);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const publishedNotices = liveNotices.filter((n) => n.is_published !== false);

  const filteredNotices = publishedNotices.filter((n) => {
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-950 text-amber-300 shadow-md font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Notices Grid */}
      {filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <Card key={notice.id} className="flex flex-col group overflow-hidden">
              <div className="relative h-48 overflow-hidden bg-navy-900">
                <img
                  src={notice.image_url || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80'}
                  alt={notice.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant={notice.category === 'Admissions' ? 'amber' : 'navy'}>
                    {notice.category}
                  </Badge>
                  {notice.is_pinned && (
                    <Badge variant="gold">Pinned</Badge>
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
                  <button
                    onClick={() => setActiveNotice(notice)}
                    className="text-amber-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Notice <ArrowRight size={14} />
                  </button>

                  {notice.document_url && (
                    <a
                      href={notice.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-navy-950 text-xs flex items-center gap-1 font-medium"
                    >
                      <Download size={13} /> PDF
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="font-serif font-bold text-lg text-navy-950 mb-1">No notices found</p>
          <p className="text-slate-500 text-xs">Try selecting another category or clear your search query.</p>
        </div>
      )}

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-56 bg-navy-950 overflow-hidden">
              <img
                src={activeNotice.image_url || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80'}
                alt={activeNotice.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
              <button
                onClick={() => setActiveNotice(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-navy-950/60 text-white hover:bg-navy-950 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <Badge variant="amber">{activeNotice.category}</Badge>
                <h3 className="font-serif font-bold text-white text-xl sm:text-2xl mt-2 leading-tight">
                  {activeNotice.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar size={13} className="text-amber-500" />
                <span>Published on: {formatDate(activeNotice.date)}</span>
              </div>

              <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                <p className="font-semibold text-navy-950">{activeNotice.description}</p>
                {activeNotice.content && <p>{activeNotice.content}</p>}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setActiveNotice(null)}>
                  Close
                </Button>

                {activeNotice.document_url && (
                  <a
                    href={activeNotice.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md"
                  >
                    <Download size={14} /> Download Official Attachment
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
