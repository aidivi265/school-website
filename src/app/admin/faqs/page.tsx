'use client';

import { useState } from 'react';
import { mockFAQs } from '@/lib/data/mockData';
import { FAQItem } from '@/types';
import { Button, Badge } from '@/components/ui';
import { Plus, Edit2, Trash2, HelpCircle, Search, X } from 'lucide-react';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>(mockFAQs);
  const [search, setSearch] = useState('');
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'Admissions' as FAQItem['category'],
    keywordsStr: '',
    is_published: true,
  });

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setForm({
      question: '',
      answer: '',
      category: 'Admissions',
      keywordsStr: '',
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
      is_published: faq.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const keywords = form.keywordsStr
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingFaq.id
            ? { ...f, question: form.question, answer: form.answer, category: form.category, keywords, is_published: form.is_published }
            : f
        )
      );
    } else {
      const newFaq: FAQItem = {
        id: 'faq-' + Date.now(),
        question: form.question,
        answer: form.answer,
        category: form.category,
        keywords,
        is_published: form.is_published,
      };
      setFaqs([...faqs, newFaq]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this FAQ entry?')) {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage FAQs & Assistant Knowledge</h2>
          <p className="text-xs text-slate-500">
            Answers here power the FAQ page and the AI-like Website Assistant keyword matching
          </p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Add FAQ Item
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs by question, answer, or keywords..."
          className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="navy">{faq.category}</Badge>
                {faq.is_published !== false ? (
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Active</span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Disabled</span>
                )}
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base">{faq.question}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              {faq.keywords && faq.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Matching Keywords:</span>
                  {faq.keywords.map((k, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingFaq ? 'Edit FAQ Item' : 'Create FAQ Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded text-slate-400">
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
                  placeholder="e.g. What is the fee structure for 2025–26?"
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
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Detailed clear response for parents and assistant..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Assistant Matching Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.keywordsStr}
                  onChange={(e) => setForm({ ...form, keywordsStr: e.target.value })}
                  placeholder="e.g. fees, cost, tuition, payment, quarterly"
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingFaq ? 'Update' : 'Save FAQ'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
