'use client';

import { useState } from 'react';
import { useGallery } from '@/lib/cms/useCMS';
import { GalleryImage, GalleryAlbum } from '@/types';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { label: 'All Photos', key: 'all' },
  { label: 'Campus & Infrastructure', key: 'campus' },
  { label: 'Smart Classrooms & Labs', key: 'classrooms' },
  { label: 'Sports & Athletics', key: 'sports' },
  { label: 'Events & Functions', key: 'events' },
  { label: 'Celebrations & Cultural', key: 'celebrations' },
  { label: 'Activities & STEM', key: 'activities' },
];

export default function GalleryClient({
  albums: initialAlbums,
  images: initialImages,
}: {
  albums: GalleryAlbum[];
  images: GalleryImage[];
}) {
  const { images: liveImages } = useGallery(initialImages, initialAlbums);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredImages = liveImages.filter(
    (img) => selectedCategory === 'all' || img.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const prevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const nextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
  };

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.key
                ? 'bg-navy-950 text-amber-300 shadow-md font-bold scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredImages.map((img, index) => (
          <div
            key={img.id || index}
            onClick={() => openLightbox(index)}
            className="group relative h-52 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-navy-950"
          >
            <img
              src={img.image_url}
              alt={img.title || 'School photo'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/60 transition-colors duration-300 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2">
                <ZoomIn size={20} />
              </div>
              <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                {img.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && filteredImages[activeImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="w-full flex items-center justify-between text-white mb-3 px-2">
              <p className="font-serif text-sm sm:text-base font-bold">
                {filteredImages[activeImageIndex].title} ({activeImageIndex + 1} / {filteredImages.length})
              </p>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img
                src={filteredImages[activeImageIndex].image_url}
                alt={filteredImages[activeImageIndex].title || 'Photo view'}
                className="max-w-full max-h-full object-contain"
              />

              {/* Prev / Next buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 p-3 rounded-full bg-navy-950/70 text-white hover:bg-amber-500 hover:text-navy-950 transition-colors shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 p-3 rounded-full bg-navy-950/70 text-white hover:bg-amber-500 hover:text-navy-950 transition-colors shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
