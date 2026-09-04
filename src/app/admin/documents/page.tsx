'use client';

import { useState } from 'react';
import { useDocuments } from '@/lib/cms/useCMS';
import { DocumentItem } from '@/types';
import { Button, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import FileUploader from '@/components/admin/FileUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import EmptyState from '@/components/admin/EmptyState';
import {
  Plus,
  Trash2,
  Edit2,
  FileText,
  Download,
  X,
  Search,
} from 'lucide-react';

export default function AdminDocumentsPage() {
  const { documents: docs, setDocuments: setDocs, upsertDocument, deleteDocument } = useDocuments();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
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
    category: 'Admission Forms' as DocumentItem['category'],
    description: '',
    file_url: '',
    file_size: '500 KB',
    file_type: 'PDF',
    is_published: true,
  });

  const handleOpenCreate = () => {
    setEditingDoc(null);
    setForm({
      title: '',
      category: 'Admission Forms',
      description: '',
      file_url: '',
      file_size: '500 KB',
      file_type: 'PDF',
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: DocumentItem) => {
    setEditingDoc(d);
    setForm({
      title: d.title,
      category: d.category,
      description: d.description || '',
      file_url: d.file_url,
      file_size: d.file_size || '500 KB',
      file_type: d.file_type || 'PDF',
      is_published: d.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.file_url) {
      setToast({ id: Date.now().toString(), type: 'error', text: 'Please provide a document title and PDF file.' });
      return;
    }

    if (editingDoc) {
      setDocs((prev) =>
        prev.map((d) => (d.id === editingDoc.id ? { ...d, ...form } : d))
      );
      setToast({ id: Date.now().toString(), type: 'success', text: `Updated document "${form.title}"` });
    } else {
      const newDoc: DocumentItem = {
        id: 'doc-' + Date.now(),
        title: form.title,
        category: form.category,
        description: form.description,
        file_url: form.file_url,
        file_size: form.file_size || '500 KB',
        file_type: 'PDF',
        upload_date: new Date().toISOString().split('T')[0],
        is_published: form.is_published,
      };
      setDocs([newDoc, ...docs]);
      setToast({ id: Date.now().toString(), type: 'success', text: `Uploaded "${form.title}"` });
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
    setDocs(docs.filter((d) => d.id !== deleteDialog.id));
    setToast({ id: Date.now().toString(), type: 'info', text: 'Document deleted from repository.' });
    setDeleteDialog({ isOpen: false, id: '', title: '' });
  };

  const togglePublish = (id: string) => {
    setDocs((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const updated = { ...d, is_published: d.is_published === false ? true : false };
          setToast({
            id: Date.now().toString(),
            type: 'info',
            text: updated.is_published ? 'Document published' : 'Document unlisted (hidden)',
          });
          return updated;
        }
        return d;
      })
    );
  };

  const filtered = docs.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.description || '').toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Documents & Downloads</h2>
          <p className="text-xs text-slate-500">
            Upload and distribute printable admission forms, fee circulars, academic calendars, and school policies
          </p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Upload Document
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
            placeholder="Search documents by title or category..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="Admission Forms">Admission Forms</option>
          <option value="Circulars">Circulars & Notices</option>
          <option value="Academic Documents">Academic Documents</option>
          <option value="Syllabus & Curriculum">Syllabus & Curriculum</option>
          <option value="School Policies">School Policies</option>
          <option value="Important Forms">Important Forms</option>
        </select>
      </div>

      {/* Documents Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Documents Found"
          description="No downloadable PDF documents match your search. Upload forms or guidelines."
          actionLabel="Upload Document"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Document Title & Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Upload Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{d.title}</p>
                        {d.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-1">{d.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="navy">{d.category}</Badge>
                    </td>
                    <td className="p-4 text-slate-600 font-medium whitespace-nowrap">
                      {d.file_size || 'PDF'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => togglePublish(d.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                          d.is_published !== false
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {d.is_published !== false ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(d.upload_date)}
                    </td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <a
                        href={d.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        title="Download / Preview"
                      >
                        <Download size={15} />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => triggerDelete(d.id, d.title)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
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
      )}

      {/* UPLOAD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingDoc ? 'Edit Document Details' : 'Upload New Document'}
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
                  placeholder="e.g. Official printable registration form with admission checklist"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <FileUploader
                label="PDF Document File *"
                value={form.file_url}
                onChange={(url, size) =>
                  setForm({
                    ...form,
                    file_url: url,
                    file_size: size || form.file_size,
                  })
                }
              />

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="docPublish"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="docPublish" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Visible to public for instant download
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingDoc ? 'Update Document' : 'Save & Publish Document'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Document"
        message={`Are you sure you want to delete "${deleteDialog.title}"? The file will no longer be available for download.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, id: '', title: '' })}
      />

      {/* TOAST FEEDBACK */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
