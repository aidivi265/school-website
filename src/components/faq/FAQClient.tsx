'use client';

import { useState } from 'react';
import { useFAQs } from '@/lib/cms/useCMS';
import { FAQItem } from '@/types';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Admissions',
  'Academics',
  'Transport & Facilities',
  'Timings & Schedule',
  'Fees & Payments',
  'General',
];

export default function FAQClient({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const { faqs: liveFaqs } = useFAQs(initialFaqs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    faq1: true,
    faq2: true,
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const publishedFaqs = liveFaqs.filter((f) => f.is_published !== false);

  const filteredFaqs = publishedFaqs.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.keywords && faq.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
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
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. fees, bus, timings)..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Accordion FAQ List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HelpCircle size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-serif font-bold text-navy-950 text-base sm:text-lg leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className="text-slate-400 flex-shrink-0">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="font-serif font-bold text-lg text-navy-950 mb-1">No FAQs matched your query</p>
          <p className="text-slate-500 text-xs">
            Try a different search keyword or ask our bottom-right floating School Assistant widget.
          </p>
        </div>
      )}
    </div>
  );
}
