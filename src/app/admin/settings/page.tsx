'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { mockSchool } from '@/lib/data/mockData';
import { Save, CheckCircle, Settings, Phone, Mail, MapPin, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: mockSchool.name,
    tagline: mockSchool.tagline,
    established: mockSchool.established,
    affiliation: mockSchool.affiliation,
    affiliation_no: mockSchool.affiliation_no,
    address_line1: mockSchool.address_line1,
    city: mockSchool.city,
    pin: mockSchool.pin,
    phone_office: mockSchool.phone_office,
    phone_admissions: mockSchool.phone_admissions,
    email_general: mockSchool.email_general,
    email_admissions: mockSchool.email_admissions,
    timings_school: mockSchool.timings_school,
    timings_office: mockSchool.timings_office,
    social_facebook: mockSchool.social_facebook || '',
    social_instagram: mockSchool.social_instagram || '',
    social_youtube: mockSchool.social_youtube || '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif font-bold text-2xl text-slate-900">School Identity & Settings</h2>
        <p className="text-xs text-slate-500">Configure school contact info, CBSE affiliation details, and social channels</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle size={18} className="text-emerald-600" />
          <span>School settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        {/* Basic Identity */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
            School Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Motto / Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Established Year
              </label>
              <input
                type="text"
                value={form.established}
                onChange={(e) => setForm({ ...form, established: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Affiliation Board
              </label>
              <input
                type="text"
                value={form.affiliation}
                onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Affiliation Number
              </label>
              <input
                type="text"
                value={form.affiliation_no}
                onChange={(e) => setForm({ ...form, affiliation_no: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
            Contact & Timings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Office Telephone
              </label>
              <input
                type="text"
                value={form.phone_office}
                onChange={(e) => setForm({ ...form, phone_office: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admissions Hotline
              </label>
              <input
                type="text"
                value={form.phone_admissions}
                onChange={(e) => setForm({ ...form, phone_admissions: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                General Email
              </label>
              <input
                type="email"
                value={form.email_general}
                onChange={(e) => setForm({ ...form, email_general: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admissions Email
              </label>
              <input
                type="email"
                value={form.email_admissions}
                onChange={(e) => setForm({ ...form, email_admissions: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                School Student Timings
              </label>
              <input
                type="text"
                value={form.timings_school}
                onChange={(e) => setForm({ ...form, timings_school: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Office Working Hours
              </label>
              <input
                type="text"
                value={form.timings_office}
                onChange={(e) => setForm({ ...form, timings_office: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
            Address & Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Address Line / Locality
              </label>
              <input
                type="text"
                value={form.address_line1}
                onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                PIN Code
              </label>
              <input
                type="text"
                value={form.pin}
                onChange={(e) => setForm({ ...form, pin: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="lg">
            <Save size={16} /> Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
