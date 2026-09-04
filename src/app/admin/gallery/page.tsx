'use client';

import { useState } from 'react';
import { mockGalleryImages, mockGalleryAlbums } from '@/lib/data/mockData';
import { GalleryImage, GalleryAlbum } from '@/types';
import { Button, Badge } from '@/components/ui';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(mockGalleryImages);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'campus',
    image_url: '',
  });

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) return;

    const newImg: GalleryImage = {
      id: 'g-' + Date.now(),
      title: form.title || 'School Activity',
      category: form.category,
      image_url: form.image_url,
      thumb_url: form.image_url,
    };

    setImages([newImg, ...images]);
    setForm({ title: '', category: 'campus', image_url: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this photo from gallery?')) {
      setImages(images.filter((img) => img.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Photo Gallery</h2>
          <p className="text-xs text-slate-500">Add, organize, and categorize campus photos and album images</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="md">
          <Plus size={16} /> Add Photo
        </Button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div className="relative h-44 bg-navy-950 overflow-hidden">
              <img
                src={img.image_url}
                alt={img.title || 'Photo'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                title="Delete image"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="p-3.5 flex items-center justify-between gap-2">
              <p className="font-bold text-slate-900 text-xs truncate flex-1">{img.title}</p>
              <Badge variant="navy" className="text-[10px] px-2 py-0.5">{img.category}</Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">Add Photo to Gallery</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded text-slate-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Smart Classroom Session"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                >
                  <option value="campus">Campus & Infrastructure</option>
                  <option value="classrooms">Smart Classrooms & Labs</option>
                  <option value="sports">Sports & Athletics</option>
                  <option value="events">Events & Functions</option>
                  <option value="celebrations">Celebrations & Festivals</option>
                  <option value="activities">Activities & STEM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Add to Gallery
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
