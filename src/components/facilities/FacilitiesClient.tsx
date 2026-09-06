'use client';

import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Card } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import { Facility } from '@/types';
import { usePagesCMS, useCMS } from '@/lib/cms/useCMS';
import { CMS_KEYS, defaultPagesCMS } from '@/lib/cms/cmsStore';

export default function FacilitiesClient({ initialFacilities }: { initialFacilities: Facility[] }) {
  const { pagesData } = usePagesCMS();
  const [facilities] = useCMS<Facility[]>(CMS_KEYS.FACILITIES, initialFacilities);
  const data = pagesData || defaultPagesCMS;

  return (
    <>
      <PageHeader
        eyebrow={data.facilitiesHeroEyebrow || 'World-Class Environment'}
        title={data.facilitiesHeroTitle || 'Campus Infrastructure & Facilities'}
        subtitle={data.facilitiesHeroSubtitle || 'Modern amenities, safety protocols, and advanced academic technology designed for student excellence'}
        breadcrumbs={[{ label: 'Facilities' }]}
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <SectionHeader
            eyebrow="Modern Campus"
            title={data.facilitiesSectionTitle || 'State-of-the-Art Learning Spaces'}
            subtitle={data.facilitiesSectionSubtitle || "Explore how our campus facilities provide an enriching backdrop for every child's development"}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {facilities.map((fac) => (
              <Card key={fac.id} className="overflow-hidden flex flex-col group">
                <div className="relative h-64 sm:h-72 overflow-hidden bg-navy-950">
                  <img
                    src={fac.image_url}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-serif font-bold text-white text-2xl leading-tight">
                      {fac.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {fac.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">
                      Key Highlights:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {fac.features?.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-amber-600 flex-shrink-0" />
                          <span className="text-slate-700 text-xs font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
