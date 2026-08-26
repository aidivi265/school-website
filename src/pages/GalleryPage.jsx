import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { PageHero, SectionHeader } from '../components/ui';
import { galleryImages, galleryCategories } from '../data/gallery';
import { schoolConfig } from '../config/schoolConfig';

const { name } = schoolConfig;

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const img = images[currentIndex];
  if (!img) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
        <X size={20} />
      </button>

      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
        <ChevronLeft size={24} />
      </button>

      <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={img.src}
          alt={img.title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        <div className="mt-3 text-center">
          <p className="text-white font-semibold">{img.title}</p>
          <p className="text-slate-400 text-sm">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>

      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeFilter === 'all' ? galleryImages : galleryImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => (i > 0 ? i - 1 : filtered.length - 1)), [filtered.length]);
  const nextImage = useCallback(() => setLightboxIndex((i) => (i < filtered.length - 1 ? i + 1 : 0)), [filtered.length]);

  return (
    <div>
      <PageHero
        title="Photo Gallery"
        subtitle={`A visual journey through life at ${name}`}
        breadcrumb="Gallery"
        bgImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=85"
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Memories" title="Our Gallery" subtitle="Explore moments from campus, events, sports, and celebrations" />

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all border ${
                  activeFilter === cat
                    ? 'bg-navy-800 text-white border-navy-700'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy-200 hover:text-amber-600'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, index) => (
              <div
                key={img.id}
                className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.thumb}
                  alt={img.title}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={28} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
