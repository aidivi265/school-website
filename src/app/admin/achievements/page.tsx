'use client';

import { useState } from 'react';
import { mockAchievements } from '@/lib/data/mockData';
import { Achievement } from '@/types';
import { Button, Badge } from '@/components/ui';
import { Plus, Edit2, Trash2, Trophy, Star, Award, Medal, X, Search } from 'lucide-react';

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [search, setSearch] = useState('');
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'academic' as Achievement['category'],
    year: '2024–25',
    icon: 'award',
    description: '',
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
      is_highlight: !!ach.is_highlight,
      is_published: ach.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAch) {
      setAchievements((prev) =>
        prev.map((a) => (a.id === editingAch.id ? { ...a, ...form } : a))
      );
    } else {
      const newAch: Achievement = {
        id: 'ach-' + Date.now(),
        ...form,
      };
      setAchievements([newAch, ...achievements]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this achievement?')) {
      setAchievements(achievements.filter((a) => a.id !== id));
    }
  };

  const filtered = achievements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Achievements</h2>
          <p className="text-xs text-slate-500">Record board toppers, sports trophies, and Olympiad medals</p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Add Achievement
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search achievements..."
          className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ach) => (
          <div
            key={ach.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant={ach.is_highlight ? 'gold' : 'navy'}>{ach.category}</Badge>
                <span className="text-xs font-bold text-amber-600">{ach.year}</span>
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-2">{ach.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{ach.description}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(ach)}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => handleDelete(ach.id)}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingAch ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded text-slate-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. CBSE Academic Excellence Award"
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
                    <option value="academic">Academic</option>
                    <option value="sports">Sports</option>
                    <option value="cultural">Cultural</option>
                    <option value="awards">Institutional Awards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Year / Session
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
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Key details of the award or student achievement..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={form.is_highlight}
                  onChange={(e) => setForm({ ...form, is_highlight: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600"
                />
                <label htmlFor="highlight" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Feature as major highlight
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingAch ? 'Update' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
