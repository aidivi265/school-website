'use client';

import { useState } from 'react';
import { mockFAQs } from '@/lib/data/mockData';
import { FAQItem } from '@/types';
import { Button, Badge } from '@/components/ui';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import EmptyState from '@/components/admin/EmptyState';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Sparkles,
} from 'lucide-react';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>(mockFAQs);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete Confirm Dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string;
    question: string;
  }>({
    isOpen: false,
    id: '',
    question: '',
  });

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Form State
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'Admissions' as FAQItem['category'],
    keywordsStr: '',
    display_order: 1,
    is_published: true,
  });

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setForm({
      question: '',
      answer: '',
      category: 'Admissions',
      keywordsStr: '',
      display_order: faqs.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      keywordsStr: (faq.keywords || []).join(', '),
      display_order: faq.display_order || 1,
      is_published: faq.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setToast({ id: Date.now().toString(), type: 'error', text: 'Question and answer are required.' });
      return;
    }

    const keywords = form.keywordsStr
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingFaq.id
            ? {
                ...f,
                question: form.question,
                answer: form.answer,
                category: form.category,
                keywords,
                display_order: form.display_order,
                is_published: form.is_published,
              }
            : f
        )
      );
      setToast({ id: Date.now().toString(), type: 'success', text: `Updated FAQ item!` });
    } else {
      const newFaq: FAQItem = {
        id: 'faq-' + Date.now(),
        question: form.question,
        answer: form.answer,
        category: form.category,
        keywords,
        display_order: form.display_order,
        is_published: form.is_published,
      };
      setFaqs([...faqs, newFaq]);
      setToast({ id: Date.now().toString(), type: 'success', text: `Added new FAQ item!` });
    }
    setIsModalOpen(false);
  };

  const triggerDelete = (id: string, question: string) => {
    setDeleteDialog({
      isOpen: true,
      id,
      question,
    });
  };

  const confirmDelete = () => {
    setFaqs(faqs.filter((f) => f.id !== deleteDialog.id));
    setToast({ id: Date.now().toString(), type: 'info', text: 'FAQ item removed.' });
    setDeleteDialog({ isOpen: false, id: '', question: '' });
  };

  const togglePublish = (id: string) => {
    setFaqs((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const updated = { ...f, is_published: f.is_published === false ? true : false };
          setToast({
            id: Date.now().toString(),
            type: 'info',
            text: updated.is_published ? 'FAQ published' : 'FAQ hidden',
          });
          return updated;
        }
        return f;
      })
    );
  };

  const filtered = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      (f.keywords || []).some((k) => k.toLowerCase().includes(search.toLowerCase())) ||
      f.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage FAQs & AI Assistant Knowledge</h2>
          <p className="text-xs text-slate-500">
            Answers configured here power both the Public FAQ page and the Floating Assistant bot responses
          </p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Add FAQ Item
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
            placeholder="Search FAQs by question, answer keywords, or category..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="Admissions">Admissions</option>
          <option value="Academics">Academics</option>
          <option value="Transport & Facilities">Transport & Facilities</option>
          <option value="Timings & Schedule">Timings & Schedule</option>
          <option value="Fees & Payments">Fees & Payments</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* FAQ Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No FAQ Items Found"
          description="No questions match the search or category filter. Add a new Q&A item."
          actionLabel="Add FAQ"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="navy">{faq.category}</Badge>
                  <button
                    onClick={() => togglePublish(faq.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                      faq.is_published !== false
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {faq.is_published !== false ? 'Published' : 'Hidden'}
                  </button>
                  {faq.keywords && faq.keywords.length > 0 && (
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                      <Sparkles size={10} /> {faq.keywords.length} AI Keywords
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>

                {faq.keywords && faq.keywords.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Triggers:</span>
                    {faq.keywords.map((k, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-start">
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  title="Edit Q&A"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => triggerDelete(faq.id, faq.question)}
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingFaq ? 'Edit FAQ Item' : 'Create New FAQ Item'}
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
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="e.g. What is the fee structure for academic session 2025–26?"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Academics">Academics</option>
                    <option value="Transport & Facilities">Transport & Facilities</option>
                    <option value="Timings & Schedule">Timings & Schedule</option>
                    <option value="Fees & Payments">Fees & Payments</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Display Order / Sequence
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Provide a comprehensive, accurate response for parents and students..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  AI Assistant Trigger Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.keywordsStr}
                  onChange={(e) => setForm({ ...form, keywordsStr: e.target.value })}
                  placeholder="e.g. fees, cost, tuition, payment, quarterly, admission fee"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  When a website visitor types any of these words into the Assistant bot, this FAQ will be suggested.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="faqPublish"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="faqPublish" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Publish on website and include in AI Assistant responses
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingFaq ? 'Update FAQ' : 'Save FAQ'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete FAQ Item"
        message={`Are you sure you want to delete "${deleteDialog.question}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, id: '', question: '' })}
      />

      {/* TOAST FEEDBACK */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
