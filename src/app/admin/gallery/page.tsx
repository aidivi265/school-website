'use client';

import { useState } from 'react';
import { mockGalleryImages, mockGalleryAlbums } from '@/lib/data/mockData';
import { GalleryImage, GalleryAlbum } from '@/types';
import { Button, Badge } from '@/components/ui';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import EmptyState from '@/components/admin/EmptyState';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  FolderPlus,
  Folder,
  X,
  Search,
  Grid,
  Filter,
  Layers,
  Calendar,
} from 'lucide-react';

export default function AdminGalleryPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'albums'>('photos');
  const [images, setImages] = useState<GalleryImage[]>(mockGalleryImages);
  const [albums, setAlbums] = useState<GalleryAlbum[]>(mockGalleryAlbums);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedAlbumFilter, setSelectedAlbumFilter] = useState('all');

  // Modals
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  // Delete Confirm Dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: 'photo' | 'album';
    id: string;
    title: string;
  }>({
    isOpen: false,
    type: 'photo',
    id: '',
    title: '',
  });

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Photo Form
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'campus',
    image_url: '',
    album_id: '',
  });

  // Album Form
  const [albumForm, setAlbumForm] = useState({
    title: '',
    description: '',
    cover_image_url: '',
    event_date: new Date().toISOString().split('T')[0],
  });

  // Add Photo
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.image_url) {
      setToast({ id: Date.now().toString(), type: 'error', text: 'Please provide or upload an image.' });
      return;
    }

    const newImg: GalleryImage = {
      id: 'g-' + Date.now(),
      title: photoForm.title || 'School Activity',
      category: photoForm.category,
      image_url: photoForm.image_url,
      thumb_url: photoForm.image_url,
      album_id: photoForm.album_id || undefined,
    };

    setImages([newImg, ...images]);
    setPhotoForm({ title: '', category: 'campus', image_url: '', album_id: '' });
    setIsPhotoModalOpen(false);
    setToast({ id: Date.now().toString(), type: 'success', text: 'Photo added to gallery successfully!' });
  };

  // Add Album
  const handleAddAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumForm.title) {
      setToast({ id: Date.now().toString(), type: 'error', text: 'Album title is required.' });
      return;
    }

    const newAlbum: GalleryAlbum = {
      id: 'alb-' + Date.now(),
      title: albumForm.title,
      description: albumForm.description,
      cover_image_url: albumForm.cover_image_url || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
      event_date: albumForm.event_date,
      photo_count: 0,
    };

    setAlbums([newAlbum, ...albums]);
    setAlbumForm({
      title: '',
      description: '',
      cover_image_url: '',
      event_date: new Date().toISOString().split('T')[0],
    });
    setIsAlbumModalOpen(false);
    setToast({ id: Date.now().toString(), type: 'success', text: `Album "${newAlbum.title}" created!` });
  };

  // Trigger Delete Dialog
  const triggerDelete = (type: 'photo' | 'album', id: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      type,
      id,
      title,
    });
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (deleteDialog.type === 'photo') {
      setImages(images.filter((img) => img.id !== deleteDialog.id));
      setToast({ id: Date.now().toString(), type: 'info', text: 'Photo removed from gallery.' });
    } else {
      setAlbums(albums.filter((alb) => alb.id !== deleteDialog.id));
      setToast({ id: Date.now().toString(), type: 'info', text: 'Album deleted.' });
    }
    setDeleteDialog({ isOpen: false, type: 'photo', id: '', title: '' });
  };

  // Filtered Photos
  const filteredPhotos = images.filter((img) => {
    const matchesSearch =
      (img.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (img.category || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || img.category === categoryFilter;
    const matchesAlbum = selectedAlbumFilter === 'all' || img.album_id === selectedAlbumFilter;
    return matchesSearch && matchesCategory && matchesAlbum;
  });

  // Filtered Albums
  const filteredAlbums = albums.filter((alb) =>
    alb.title.toLowerCase().includes(search.toLowerCase()) ||
    (alb.description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Photo Gallery</h2>
          <p className="text-xs text-slate-500">
            Upload campus photos, organize them into event albums, and assign categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAlbumModalOpen(true)} variant="outline" size="md">
            <FolderPlus size={16} /> New Album
          </Button>
          <Button onClick={() => setIsPhotoModalOpen(true)} variant="primary" size="md">
            <Plus size={16} /> Add Photo
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('photos')}
          className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'photos'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon size={16} /> All Photos ({images.length})
        </button>
        <button
          onClick={() => setActiveTab('albums')}
          className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'albums'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Folder size={16} /> Event Albums ({albums.length})
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === 'photos' ? 'Search photos by title...' : 'Search albums...'}
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>

        {activeTab === 'photos' && (
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="campus">Campus & Infrastructure</option>
              <option value="classrooms">Smart Classrooms</option>
              <option value="sports">Sports & Athletics</option>
              <option value="events">Events & Functions</option>
              <option value="celebrations">Celebrations & Festivals</option>
              <option value="activities">Activities & STEM</option>
            </select>

            <select
              value={selectedAlbumFilter}
              onChange={(e) => setSelectedAlbumFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
            >
              <option value="all">All Albums</option>
              {albums.map((alb) => (
                <option key={alb.id} value={alb.id}>
                  {alb.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: PHOTOS GRID */}
      {activeTab === 'photos' && (
        <>
          {filteredPhotos.length === 0 ? (
            <EmptyState
              title="No Photos Found"
              description="No images match your search or filter criteria. Try adding a new photo!"
              actionLabel="Add Photo"
              onAction={() => setIsPhotoModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredPhotos.map((img) => (
                <div
                  key={img.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div className="relative h-44 bg-navy-950 overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.title || 'Photo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => triggerDelete('photo', img.id, img.title || 'Photo')}
                        className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-md transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-900 text-xs truncate flex-1">{img.title || 'School Photo'}</p>
                    <Badge variant="navy" className="text-[10px] px-2 py-0.5 whitespace-nowrap">
                      {img.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* TAB 2: ALBUMS GRID */}
      {activeTab === 'albums' && (
        <>
          {filteredAlbums.length === 0 ? (
            <EmptyState
              title="No Albums Found"
              description="Create event albums like 'Annual Day 2024' or 'Sports Meet' to organize your photos."
              actionLabel="Create Album"
              onAction={() => setIsAlbumModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlbums.map((alb) => (
                <div
                  key={alb.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-navy-950">
                    <img
                      src={alb.cover_image_url}
                      alt={alb.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                      <ImageIcon size={13} />
                      <span>{alb.photo_count || images.filter((i) => i.album_id === alb.id).length} Photos</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {alb.event_date && (
                        <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1 mb-1">
                          <Calendar size={12} /> {alb.event_date}
                        </span>
                      )}
                      <h3 className="font-serif font-bold text-slate-900 text-base mb-1">{alb.title}</h3>
                      {alb.description && (
                        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{alb.description}</p>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedAlbumFilter(alb.id);
                          setActiveTab('photos');
                        }}
                        className="text-xs font-bold text-navy-900 hover:text-amber-700 transition-colors"
                      >
                        View Photos →
                      </button>
                      <button
                        onClick={() => triggerDelete('album', alb.id, alb.title)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Album"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ADD PHOTO MODAL */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">Add Photo to Gallery</h3>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Photo Caption / Title
                </label>
                <input
                  type="text"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="e.g. Science Exhibition Project Display"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                  >
                    <option value="campus">Campus & Building</option>
                    <option value="classrooms">Smart Classrooms</option>
                    <option value="sports">Sports & Ground</option>
                    <option value="events">Events & Functions</option>
                    <option value="celebrations">Celebrations</option>
                    <option value="activities">Activities & STEM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Assign to Album
                  </label>
                  <select
                    value={photoForm.album_id}
                    onChange={(e) => setPhotoForm({ ...photoForm, album_id: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                  >
                    <option value="">(None - Standalone)</option>
                    {albums.map((alb) => (
                      <option key={alb.id} value={alb.id}>
                        {alb.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ImageUploader
                label="Photo Upload"
                value={photoForm.image_url}
                onChange={(url) => setPhotoForm({ ...photoForm, image_url: url })}
                recommendedSize="Recommended: 1200x800px (.jpg, .png, .webp)"
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsPhotoModalOpen(false)}>
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

      {/* CREATE ALBUM MODAL */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">Create Event Album</h3>
              <button
                onClick={() => setIsAlbumModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Album Name *
                </label>
                <input
                  type="text"
                  required
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                  placeholder="e.g. Annual Sports Meet 2024–25"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  value={albumForm.event_date}
                  onChange={(e) => setAlbumForm({ ...albumForm, event_date: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })}
                  placeholder="e.g. Glimpses of track events, relay races, and award ceremonies"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <ImageUploader
                label="Album Cover Image"
                value={albumForm.cover_image_url}
                onChange={(url) => setAlbumForm({ ...albumForm, cover_image_url: url })}
                recommendedSize="Recommended: 1200x800px"
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsAlbumModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create Album
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title={`Delete ${deleteDialog.type === 'photo' ? 'Photo' : 'Album'}`}
        message={`Are you sure you want to delete "${deleteDialog.title}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, type: 'photo', id: '', title: '' })}
      />

      {/* TOAST FEEDBACK */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
