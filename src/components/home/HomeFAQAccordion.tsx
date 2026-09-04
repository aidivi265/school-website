'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/types';

export default function HomeFAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [faqs[0]?.id || 'faq1']: true,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-3.5 max-w-4xl mx-auto">
      {faqs.map((faq) => {
        const isOpen = !!openIds[faq.id];
        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-amber-300 shadow-md ring-1 ring-amber-200'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isOpen ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <HelpCircle size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="font-serif font-bold text-navy-950 text-base sm:text-lg leading-snug">
                    {faq.question}
                  </h3>
                </div>
              </div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'bg-amber-50 text-amber-700 rotate-180' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ChevronDown size={18} />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
