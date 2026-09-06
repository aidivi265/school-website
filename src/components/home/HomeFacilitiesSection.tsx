'use client';

import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Facility } from '@/types';
import { SectionHeader, Card } from '@/components/ui';
import { useFacilities, usePagesCMS } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function HomeFacilitiesSection({ initialFacilities }: { initialFacilities: Facility[] }) {
  const { facilities } = useFacilities(initialFacilities);
  const { pagesData } = usePagesCMS();
  const data = pagesData || defaultPagesCMS;

  const displayList = facilities.slice(0, 8);

  return (
    <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={data.facilitiesHeroEyebrow || 'World-Class Campus'}
          title={data.facilitiesHeroTitle || 'Modern School Infrastructure'}
          subtitle={data.facilitiesHeroSubtitle || 'State-of-the-art facilities engineered to foster academic, scientific, and athletic excellence'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayList.map((facility) => (
            <Card key={facility.id} className="group overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden bg-navy-950">
                  <img
                    src={facility.image_url}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif font-bold text-white text-base sm:text-lg leading-tight">
                      {facility.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {facility.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {facility.features?.slice(0, 2).map((f: string) => (
                      <span
                        key={f}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-0">
                <Link
                  href="/facilities"
                  className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  View Amenities <ChevronRight size={14} />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 bg-white border-2 border-navy-950 text-navy-950 font-bold px-8 py-3.5 rounded-xl hover:bg-navy-950 hover:text-white transition-all shadow-sm"
          >
            Explore All Facilities & Campus <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
