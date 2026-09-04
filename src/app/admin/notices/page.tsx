'use client';

import { useState } from 'react';
import { mockNotices } from '@/lib/data/mockData';
import { Notice } from '@/types';
import { Button, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Plus, Edit2, Trash2, Pin, Check, X, Search, FileText, Upload } from 'lucide-react';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [search, setSearch] = useState('');
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    category: 'General' as Notice['category'],
    date: new Date().toISOString().split('T')[0],
    description: '',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    document_url: '',
    is_pinned: false,
    is_published: true,
  });

  const handleOpenCreate = () => {
    setEditingNotice(null);
    setForm({
      title: '',
      category: 'General',
      date: new Date().toISOString().split('T')[0],
      description: '',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      document_url: '',
      is_pinned: false,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n: Notice) => {
    setEditingNotice(n);
    setForm({
      title: n.title,
      category: n.category,
      date: n.date,
      description: n.description,
      content: n.content || '',
      image_url: n.image_url || '',
      document_url: n.document_url || '',
      is_pinned: !!n.is_pinned,
      is_published: n.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotice) {
      setNotices((prev) =>
        prev.map((n) => (n.id === editingNotice.id ? { ...n, ...form } : n))
      );
    } else {
      const newNotice: Notice = {
        id: 'n-' + Date.now(),
        ...form,
      };
      setNotices([newNotice, ...notices]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter((n) => n.id !== id));
    }
  };

  const togglePin = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_pinned: !n.is_pinned } : n))
    );
  };

  const togglePublish = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_published: !n.is_published } : n))
    );
  };

  const filtered = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Notices & Circulars</h2>
          <p className="text-xs text-slate-500">Publish, edit, and organize school notices and announcements</p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Create New Notice
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notices by title or category..."
          className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Notice Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Pinned</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 max-w-sm">
                    <p className="font-bold text-slate-900 line-clamp-1">{n.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{n.description}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant={n.category === 'Admissions' ? 'amber' : 'navy'}>
                      {n.category}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">{formatDate(n.date)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePin(n.id)}
                      className={`p-1.5 rounded-lg text-xs font-semibold ${
                        n.is_pinned ? 'bg-amber-100 text-amber-800' : 'text-slate-400 hover:bg-slate-100'
                      }`}
                      title={n.is_pinned ? 'Pinned notice' : 'Click to pin'}
                    >
                      <Pin size={15} />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(n.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        n.is_published !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {n.is_published !== false ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(n)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Edit Notice"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Notice"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingNotice ? 'Edit School Notice' : 'Create New Notice'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Admissions Open for Session 2025–26"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                  >
                    {['Admissions', 'Examination', 'Holiday', 'Achievement', 'Event', 'Circular', 'General', 'Urgent'].map(
                      (cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Notice Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Summary / Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief 1-2 sentence overview for notice cards..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Notice Content (Optional)
                </label>
                <textarea
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Detailed circular instructions, paragraphs, or guidelines..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Attachment / PDF URL
                  </label>
                  <input
                    type="url"
                    value={form.document_url}
                    onChange={(e) => setForm({ ...form, document_url: e.target.value })}
                    placeholder="https://.../notice.pdf"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_pinned}
                    onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Pin to top of list</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Published to website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  {editingNotice ? 'Update Notice' : 'Create Notice'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
