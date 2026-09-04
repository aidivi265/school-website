'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CLASS_OPTIONS = [
  'Pre-School (Nursery)',
  'Pre-Primary (KG)',
  'Class I',
  'Class II',
  'Class III',
  'Class IV',
  'Class V',
  'Class VI',
  'Class VII',
  'Class VIII',
  'Class IX',
  'Class X',
  'Class XI (Science - PCM)',
  'Class XI (Science - PCB)',
  'Class XI (Commerce)',
  'Class XII (Transfer)',
];

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    parent_name: '',
    student_name: '',
    class_applying: 'Pre-School (Nursery)',
    phone: '',
    email: '',
    date_of_birth: '',
    address: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Enquiry submitted successfully!',
        });
        setFormData({
          parent_name: '',
          student_name: '',
          class_applying: 'Pre-School (Nursery)',
          phone: '',
          email: '',
          date_of_birth: '',
          address: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to submit enquiry. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again or call the school office directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 absolute top-0 left-0 right-0" />

      <h3 className="font-serif font-bold text-2xl text-navy-950 mb-2">
        Online Admission Enquiry (2025–26)
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
        Fill in the details below. Our admissions counselor will get in touch with you to schedule an interaction and campus walkthrough.
      </p>

      {status && (
        <div
          className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-xs sm:text-sm ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
          ) : (
            <AlertCircle className="text-rose-600 flex-shrink-0 mt-0.5" size={18} />
          )}
          <p>{status.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Parent / Guardian Name *
            </label>
            <input
              type="text"
              required
              value={formData.parent_name}
              onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
              placeholder="e.g. Mr. Rajesh Sharma"
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Student Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.student_name}
              onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Class Applying For *
            </label>
            <select
              value={formData.class_applying}
              onChange={(e) => setFormData({ ...formData, class_applying: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
            >
              {CLASS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Contact Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="parent@example.com"
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Date of Birth (Student)
            </label>
            <input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Residential Address in Delhi (Locality / Sector)
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="e.g. Sector 3, Rohini, New Delhi"
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Any Specific Query or Comments
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Ask about bus routes, elective subjects, previous school background, etc."
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Submitting Enquiry...
            </>
          ) : (
            <>
              Submit Admission Enquiry <Send size={16} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
