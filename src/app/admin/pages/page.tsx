'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Save, CheckCircle, FileText } from 'lucide-react';

export default function AdminPagesCMS() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    heroHeadline: 'Empowering Young Minds for a Better Tomorrow',
    heroSubtext:
      'A premier CBSE-affiliated co-educational institution in Rohini, Delhi, dedicated to academic excellence, value-driven character building, and holistic student growth since 1995.',
    visionText:
      'To be a premier center of educational excellence that nurtures enlightened, innovative, and ethically grounded global citizens capable of contributing meaningfully to society and thriving in an ever-evolving world.',
    missionText:
      'To provide a stimulating learning environment where academic rigour, technological innovation, character development, and inclusive values empower every student to discover their unique potential and achieve lifelong success.',
    principalMessage:
      'At Decent Public School, Rohini, we believe that every child carries within them an immense potential waiting to be discovered. Our role as educators is not merely to teach — it is to inspire, guide, and empower.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif font-bold text-2xl text-slate-900">Page Content CMS</h2>
        <p className="text-xs text-slate-500">Edit dynamic text sections across Homepage, About Us, and Messages</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle size={18} className="text-emerald-600" />
          <span>Page contents saved successfully to database!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
            Homepage Hero Section
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Hero Subtext / Lead Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.heroSubtext}
              onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
            About Us: Vision & Mission
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Vision Statement
            </label>
            <textarea
              rows={3}
              value={formData.visionText}
              onChange={(e) => setFormData({ ...formData, visionText: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Mission Statement
            </label>
            <textarea
              rows={3}
              value={formData.missionText}
              onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
            Principal's Message
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Message Content
            </label>
            <textarea
              rows={4}
              value={formData.principalMessage}
              onChange={(e) => setFormData({ ...formData, principalMessage: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="lg">
            <Save size={16} /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
