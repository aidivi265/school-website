'use client';

import { useState } from 'react';
import { mockDocuments } from '@/lib/data/mockData';
import { DocumentItem } from '@/types';
import { Button, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Plus, Trash2, Edit2, FileText, Download, X, Search } from 'lucide-react';

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>(mockDocuments);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Admission Forms' as DocumentItem['category'],
    description: '',
    file_url: '',
    file_size: '500 KB',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.file_url) return;

    const newDoc: DocumentItem = {
      id: 'doc-' + Date.now(),
      title: form.title,
      category: form.category,
      description: form.description,
      file_url: form.file_url,
      file_size: form.file_size || '500 KB',
      file_type: 'PDF',
      upload_date: new Date().toISOString().split('T')[0],
      is_published: true,
    };

    setDocs([newDoc, ...docs]);
    setForm({ title: '', category: 'Admission Forms', description: '', file_url: '', file_size: '500 KB' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this downloadable document?')) {
      setDocs(docs.filter((d) => d.id !== id));
    }
  };

  const filtered = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Documents & Downloads</h2>
          <p className="text-xs text-slate-500">Upload and link printable admission forms, academic calendars, and circulars</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="md">
          <Plus size={16} /> Upload Document
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents by title or category..."
          className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Document Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Size</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <FileText className="text-amber-600 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-bold text-slate-900">{d.title}</p>
                      {d.description && <p className="text-[11px] text-slate-500 line-clamp-1">{d.description}</p>}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="navy">{d.category}</Badge>
                  </td>
                  <td className="p-4 text-slate-600">{d.file_size || 'PDF'}</td>
                  <td className="p-4 text-slate-600">{formatDate(d.upload_date)}</td>
                  <td className="p-4 text-right space-x-2">
                    <a
                      href={d.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                      title="Download preview"
                    >
                      <Download size={15} />
                    </a>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="Delete"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">Upload / Link Document</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded text-slate-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Admission Registration Form 2025–26"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                >
                  <option value="Admission Forms">Admission Forms</option>
                  <option value="Circulars">Circulars & Notices</option>
                  <option value="Academic Documents">Academic Documents</option>
                  <option value="Syllabus & Curriculum">Syllabus & Curriculum</option>
                  <option value="School Policies">School Policies</option>
                  <option value="Important Forms">Important Forms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Official printable registration form with checklist"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  File Download URL (Supabase Storage / PDF URL) *
                </label>
                <input
                  type="url"
                  required
                  value={form.file_url}
                  onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                  placeholder="https://.../document.pdf"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Document
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
