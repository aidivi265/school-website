'use client';

import { useState } from 'react';
import { mockAchievements } from '@/lib/data/mockData';
import { Achievement } from '@/types';
import { Button, Badge } from '@/components/ui';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import EmptyState from '@/components/admin/EmptyState';
import {
  Plus,
  Edit2,
  Trash2,
  Trophy,
  Star,
  Award,
  Medal,
  Crown,
  X,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  // Modal State
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete Confirm Dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string;
    title: string;
  }>({
    isOpen: false,
    id: '',
    title: '',
  });

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    category: 'academic' as Achievement['category'],
    year: '2024–25',
    icon: 'award',
    description: '',
    image_url: '',
    is_highlight: false,
    is_published: true,
  });

  const handleOpenCreate = () => {
    setEditingAch(null);
    setForm({
      title: '',
      category: 'academic',
      year: '2024–25',
      icon: 'award',
      description: '',
      image_url: '',
      is_highlight: false,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingAch(ach);
    setForm({
      title: ach.title,
      category: ach.category,
      year: ach.year,
      icon: ach.icon || 'award',
      description: ach.description,
      image_url: ach.image_url || '',
      is_highlight: !!ach.is_highlight,
      is_published: ach.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setToast({ id: Date.now().toString(), type: 'error', text: 'Achievement title is required.' });
      return;
    }

    if (editingAch) {
      setAchievements((prev) =>
        prev.map((a) => (a.id === editingAch.id ? { ...a, ...form } : a))
      );
      setToast({ id: Date.now().toString(), type: 'success', text: `Updated "${form.title}"` });
    } else {
      const newAch: Achievement = {
        id: 'ach-' + Date.now(),
        ...form,
      };
      setAchievements([newAch, ...achievements]);
      setToast({ id: Date.now().toString(), type: 'success', text: `Added new achievement: "${form.title}"` });
    }
    setIsModalOpen(false);
  };

  const triggerDelete = (id: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      id,
      title,
    });
  };

  const confirmDelete = () => {
    setAchievements(achievements.filter((a) => a.id !== deleteDialog.id));
    setToast({ id: Date.now().toString(), type: 'info', text: 'Achievement removed.' });
    setDeleteDialog({ isOpen: false, id: '', title: '' });
  };

  const toggleHighlight = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = { ...a, is_highlight: !a.is_highlight };
          setToast({
            id: Date.now().toString(),
            type: 'info',
            text: updated.is_highlight ? 'Marked as top highlight' : 'Removed from highlights',
          });
          return updated;
        }
        return a;
      })
    );
  };

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="text-amber-500" size={20} />;
      case 'medal':
        return <Medal className="text-emerald-500" size={20} />;
      case 'star':
        return <Star className="text-amber-400" size={20} />;
      case 'crown':
        return <Crown className="text-purple-500" size={20} />;
      default:
        return <Award className="text-blue-500" size={20} />;
    }
  };

  // Distinct Years
  const availableYears = Array.from(new Set(achievements.map((a) => a.year)));

  const filtered = achievements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
    const matchesYear = yearFilter === 'all' || a.year === yearFilter;
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Achievements & Accolades</h2>
          <p className="text-xs text-slate-500">
            Showcase board exam toppers, Olympiad medalists, sports championships, and school honours
          </p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Add Achievement
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search achievements by student, title, or details..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="academic">Academic Excellence</option>
            <option value="sports">Sports & Games</option>
            <option value="cultural">Cultural & Arts</option>
            <option value="awards">Institutional Awards</option>
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="all">All Sessions / Years</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Achievements Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Achievements Found"
          description="No records match your selected filters. Try clearing filters or add a new school achievement."
          actionLabel="Add Achievement"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ach) => (
            <div
              key={ach.id}
              className={`bg-white rounded-3xl border ${
                ach.is_highlight ? 'border-amber-300 ring-2 ring-amber-400/20' : 'border-slate-200'
              } p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                      {getIconComponent(ach.icon)}
                    </div>
                    <Badge variant={ach.is_highlight ? 'gold' : 'navy'}>{ach.category}</Badge>
                  </div>
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {ach.year}
                  </span>
                </div>

                {ach.image_url && (
                  <div className="h-36 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-200">
                    <img src={ach.image_url} alt={ach.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <h3 className="font-serif font-bold text-slate-900 text-base mb-2 group-hover:text-amber-700 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{ach.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleHighlight(ach.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                    ach.is_highlight
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-slate-400 hover:text-slate-700 bg-slate-50'
                  }`}
                  title="Toggle highlight on homepage"
                >
                  <Star size={12} className={ach.is_highlight ? 'fill-amber-500' : ''} />
                  {ach.is_highlight ? 'Highlight' : 'Standard'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(ach)}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => triggerDelete(ach.id, ach.title)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingAch ? 'Edit Achievement' : 'Add New Achievement'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Achievement Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 100% CBSE Class XII Board Result"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                  >
                    <option value="academic">Academic Excellence</option>
                    <option value="sports">Sports & Athletics</option>
                    <option value="cultural">Cultural & Arts</option>
                    <option value="awards">Institutional Awards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Year / Academic Session
                  </label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2024–25"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Trophy / Badge Icon
                </label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                >
                  <option value="award">Award Ribbon</option>
                  <option value="trophy">Golden Trophy</option>
                  <option value="medal">Excellence Medal</option>
                  <option value="star">Star Recognition</option>
                  <option value="crown">Crown / Honor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Details of student positions, medals won, score percentage, or issuing authority..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <ImageUploader
                label="Achievement Certificate / Photo (Optional)"
                value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
                recommendedSize="Recommended: 800x600px"
              />

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={form.is_highlight}
                  onChange={(e) => setForm({ ...form, is_highlight: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="highlight" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Feature prominently as a key highlight on Homepage & About page
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingAch ? 'Update Achievement' : 'Save Achievement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM DIALOG */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Achievement"
        message={`Are you sure you want to delete "${deleteDialog.title}"? This record will be permanently removed.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, id: '', title: '' })}
      />

      {/* TOAST FEEDBACK */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
