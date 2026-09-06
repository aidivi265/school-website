'use client';

import { useState } from 'react';
import { useFacilities } from '@/lib/cms/useCMS';
import { Facility } from '@/types';
import { Button } from '@/components/ui';
import { Plus, Edit2, Trash2, Search, X, Building, CheckCircle2 } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import ImageUploader from '@/components/admin/ImageUploader';
import EmptyState from '@/components/admin/EmptyState';

export default function AdminFacilitiesPage() {
  const { facilities, setFacilities, upsertFacility, deleteFacility } = useFacilities();
  const [search, setSearch] = useState('');
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    featuresText: 'Smart interactive digital boards, High-speed Wi-Fi, Air-conditioned environment',
  });

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: String(Date.now()), type, text });
  };

  const handleOpenCreate = () => {
    setEditingFacility(null);
    setForm({
      title: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
      featuresText: 'Smart interactive digital boards, High-speed Wi-Fi, Air-conditioned environment',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (fac: Facility) => {
    setEditingFacility(fac);
    setForm({
      title: fac.title,
      description: fac.description,
      image_url: fac.image_url,
      featuresText: (fac.features || []).join(', '),
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = form.featuresText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingFacility) {
      setFacilities((prev) =>
        prev.map((f) =>
          f.id === editingFacility.id
            ? { ...f, title: form.title, description: form.description, image_url: form.image_url, features: featuresArray }
            : f
        )
      );
      showToast('Facility updated successfully.');
    } else {
      const newFacility: Facility = {
        id: 'fac-' + Date.now(),
        title: form.title,
        icon: 'Sparkles',
        description: form.description,
        image_url: form.image_url,
        features: featuresArray,
        is_published: true,
      };
      setFacilities([...facilities, newFacility]);
      showToast('New campus facility added successfully.');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      setFacilities(facilities.filter((f) => f.id !== deleteTargetId));
      setDeleteTargetId(null);
      showToast('Facility deleted successfully.', 'info');
    }
  };

  const filtered = facilities.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Toast message={toast} onClose={() => setToast(null)} />

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Campus Facility"
        message="Are you sure you want to delete this facility? It will be removed from the public website facilities page."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Campus Facilities</h2>
          <p className="text-xs text-slate-500">Configure labs, sports grounds, libraries, and smart classrooms</p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Add Campus Facility
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-semibold text-slate-500">
          Showing <span className="text-slate-900 font-bold">{filtered.length}</span> campus facilities
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facilities..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900"
          />
        </div>
      </div>

      {/* Facilities Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-amber-300 transition-all"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={fac.image_url}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif font-bold text-white text-lg leading-tight">{fac.title}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{fac.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {fac.features?.map((f: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50/50">
                <button
                  onClick={() => handleOpenEdit(fac)}
                  className="p-2 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => setDeleteTargetId(fac.id)}
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No facilities found"
          description="Try changing your search terms or add a new campus facility."
          actionText="Add Facility"
          onAction={handleOpenCreate}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingFacility ? 'Edit Campus Facility' : 'Add New Campus Facility'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Facility Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Advanced AI & Robotics Innovation Lab"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Explain the specifications, equipment, and learning impact..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Key Highlights / Features (Comma separated)
                </label>
                <input
                  type="text"
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  placeholder="e.g. 40 High-End Workstations, 3D Printers, Python & IoT Kits"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <ImageUploader
                bucket="facilities"
                value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
                label="Facility Photo"
              />

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  {editingFacility ? 'Update Facility' : 'Save Facility'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
