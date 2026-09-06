'use client';

import { BookOpen, HeartHandshake, Users, Shield } from 'lucide-react';
import { usePagesCMS } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function HomeTrustSection() {
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  const trustHighlights = [
    {
      icon: BookOpen,
      title: data.trustTitle1 || 'Academic Excellence',
      subtitle: data.trustDesc1 || 'Rigorous CBSE curriculum with 100% board pass track record',
    },
    {
      icon: HeartHandshake,
      title: data.trustTitle2 || 'Holistic Development',
      subtitle: data.trustDesc2 || 'Nurturing arts, sports, science exhibitions, MUNs and moral values',
    },
    {
      icon: Users,
      title: data.trustTitle3 || 'Experienced Faculty',
      subtitle: data.trustDesc3 || '110+ dedicated, qualified subject specialists with 25:1 student ratio',
    },
    {
      icon: Shield,
      title: data.trustTitle4 || 'Safe & Supportive Campus',
      subtitle: data.trustDesc4 || '24/7 CCTV surveillance, GPS-enabled buses and on-campus clinic',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-amber-500/25 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/40 cursor-default ${
                  idx > 0 ? 'lg:border-l lg:border-navy-800/80 lg:pl-6' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-400 interactive-icon group-hover:border-amber-400 group-hover:bg-amber-500/25">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-base leading-snug group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed group-hover:text-slate-300 transition-colors">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
