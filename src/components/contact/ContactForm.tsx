'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-navy-950 via-navy-800 to-amber-500 absolute top-0 left-0 right-0" />

      <h3 className="font-serif font-bold text-2xl text-navy-950 mb-2">Send Us a Message</h3>
      <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
        Have questions about admissions, student records, transport routes, or visiting our campus? Leave us a message.
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
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Sunil Kapoor"
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@domain.com"
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 00000"
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Transfer Certificate Query / Bus Route Enquiry"
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Your Message *
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please write your detailed query here..."
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          disabled={loading}
          className="w-full mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Sending Message...
            </>
          ) : (
            <>
              Send Message <Send size={16} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
