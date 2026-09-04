import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Badge, Card, Button } from '@/components/ui';
import { getDocuments } from '@/lib/supabase/service';
import { FileText, Download, FileCheck, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Downloads & Circulars | Admission Forms, Calendar & Policies',
  description:
    'Download official admission forms, academic calendars, booklists, syllabus booklets, and school policies from Decent Public School, Rohini.',
};

export default async function DownloadsPage() {
  const documents = await getDocuments('all');

  const categories = [
    'Admission Forms',
    'Academic Documents',
    'Syllabus & Curriculum',
    'Circulars',
    'School Policies',
    'Important Forms',
  ];

  return (
    <>
      <PageHeader
        eyebrow="Resource Hub"
        title="Downloads & Official Documents"
        subtitle="Access and download printable admission forms, academic planners, booklists, and policy circulars"
        breadcrumbs={[{ label: 'Downloads' }]}
      />

      <section className="py-20 px-4 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto space-y-12">
          {categories.map((cat) => {
            const catDocs = documents.filter((d) => d.category === cat);
            if (catDocs.length === 0) return null;

            return (
              <div key={cat} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-1 bg-amber-500 rounded-full" />
                  <h3 className="font-serif font-bold text-2xl text-navy-950">{cat}</h3>
                  <span className="text-xs font-bold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                    {catDocs.length} Files
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0">
                          <FileText size={22} />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-navy-950 text-base leading-snug">
                            {doc.title}
                          </h4>
                          {doc.description && (
                            <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                              {doc.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                            <span>Format: <strong>{doc.file_type || 'PDF'}</strong></span>
                            {doc.file_size && <span>• Size: {doc.file_size}</span>}
                            {doc.upload_date && <span>• Updated: {formatDate(doc.upload_date)}</span>}
                          </div>
                        </div>
                      </div>

                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-navy-950 to-navy-900 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all shadow-sm whitespace-nowrap active:scale-[0.98]"
                      >
                        <Download size={14} /> Download File
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
