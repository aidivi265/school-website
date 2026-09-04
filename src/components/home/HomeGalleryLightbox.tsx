'use client';

import { useState } from 'react';
import { GalleryImage } from '@/types';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeGalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = (idx: number) => setActiveIndex(idx);
  const closeModal = () => setActiveIndex(null);

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {images.map((img, i) => (
          <div
            key={img.id || i}
            onClick={() => openModal(i)}
            className={`group relative overflow-hidden rounded-2xl shadow-sm cursor-pointer bg-navy-950 ${
              i === 0
                ? 'col-span-2 row-span-2 h-72 sm:h-96'
                : i === 3
                ? 'sm:col-span-2 sm:h-44'
                : 'h-36 sm:h-44'
            }`}
          >
            <img
              src={img.image_url}
              alt={img.title || 'Decent Public School Campus'}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    {img.category || 'Campus'}
                  </span>
                  <p className="text-white text-xs sm:text-sm font-semibold line-clamp-1">{img.title}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
                  <ZoomIn size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && images[activeIndex] && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white mb-3 px-2">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mr-2">
                  {images[activeIndex].category}
                </span>
                <span className="font-serif text-sm sm:text-base font-bold">
                  {images[activeIndex].title} ({activeIndex + 1} of {images.length})
                </span>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl">
              <img
                src={images[activeIndex].image_url}
                alt={images[activeIndex].title || 'Photo'}
                className="max-w-full max-h-full object-contain"
              />

              <button
                onClick={prev}
                className="absolute left-4 p-3 rounded-full bg-navy-950/80 text-white hover:bg-amber-500 hover:text-navy-950 transition-colors shadow-lg"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 p-3 rounded-full bg-navy-950/80 text-white hover:bg-amber-500 hover:text-navy-950 transition-colors shadow-lg"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
