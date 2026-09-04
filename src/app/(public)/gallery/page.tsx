import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import GalleryClient from '@/components/gallery/GalleryClient';
import { getGalleryAlbums, getGalleryImages } from '@/lib/supabase/service';

export const metadata: Metadata = {
  title: 'Photo Gallery | Campus Life & Celebrations',
  description:
    'Browse photo albums and memories of Decent Public School, Rohini. Infrastructure, smart classrooms, sports day, annual fest, and science exhibitions.',
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();
  const images = await getGalleryImages('all');

  return (
    <>
      <PageHeader
        eyebrow="Visual Journey"
        title="Photo Gallery & Albums"
        subtitle="A colorful tapestry of life, learning, leadership, and celebrations at Decent Public School"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="py-20 px-4 bg-slate-50 min-h-[65vh]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient albums={albums} images={images} />
        </div>
      </section>
    </>
  );
}
