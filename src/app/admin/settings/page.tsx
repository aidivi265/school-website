'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { mockSchool } from '@/lib/data/mockData';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import {
  Save,
  CheckCircle,
  Settings,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Megaphone,
  ShieldCheck,
  Building,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'identity' | 'contact' | 'location' | 'social' | 'banner' | 'footer'>('identity');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [form, setForm] = useState({
    // Identity
    name: mockSchool.name,
    tagline: mockSchool.tagline,
    established: mockSchool.established,
    affiliation: mockSchool.affiliation,
    affiliation_no: mockSchool.affiliation_no,
    school_code: 'DPS-DL-2794',

    // Contact
    phone_office: mockSchool.phone_office,
    phone_admissions: mockSchool.phone_admissions,
    email_general: mockSchool.email_general,
    email_admissions: mockSchool.email_admissions,
    timings_school: mockSchool.timings_school,
    timings_office: mockSchool.timings_office,

    // Address
    address_line1: mockSchool.address_line1,
    city: mockSchool.city,
    state: 'Delhi',
    pin: mockSchool.pin,
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.782012015526!2d77.1084!3d28.7001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c4f73809cb%3A0x8898bb6c8a385f!2sDecent%20Public%20School%20Sector%203%20Rohini!5e0!3m2!1sen!2sin!4v1700000000000',

    // Social
    social_facebook: mockSchool.social_facebook || 'https://facebook.com/decentpublicschoolrohini',
    social_instagram: mockSchool.social_instagram || 'https://instagram.com/decentpublicschool_rohini',
    social_youtube: mockSchool.social_youtube || 'https://youtube.com/@decentpublicschoolrohini',
    social_twitter: 'https://twitter.com/dps_rohini',

    // Banner
    banner_enabled: true,
    banner_text: 'Admissions Open for Session 2025–26 (Pre-School to Class XI) — Limited Seats Available',
    banner_cta_text: 'Apply Online',
    banner_cta_url: '/admissions',

    // Footer
    footer_tagline: 'Committed to Nurturing Excellence, Values, and Lifelong Success Since 1995.',
    copyright_text: '© 2025 Decent Public School, Sector 3, Rohini, Delhi. All Rights Reserved.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: 'School settings and configuration saved successfully!',
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h2 className="font-serif font-bold text-2xl text-slate-900">School Identity & Global Settings</h2>
        <p className="text-xs text-slate-500">
          Configure institutional credentials, contact numbers, Google Maps location, social channels, and top banner
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('identity')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'identity'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building size={15} /> School Identity
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'contact'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Phone size={15} /> Contact & Timings
        </button>
        <button
          onClick={() => setActiveTab('location')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'location'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin size={15} /> Address & Maps
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'social'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Share2 size={15} /> Social Channels
        </button>
        <button
          onClick={() => setActiveTab('banner')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'banner'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Megaphone size={15} /> Announcement Banner
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'footer'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck size={15} /> Footer & Legal
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        {/* TAB 1: IDENTITY */}
        {activeTab === 'identity' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Institutional Identity & CBSE Credentials
              </h3>
              <p className="text-xs text-slate-500">Official school name, motto, and Board affiliation registration</p>
            </div>

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
                  School Motto / Tagline
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
                  CBSE Affiliation Number
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
        )}

        {/* TAB 2: CONTACT & TIMINGS */}
        {activeTab === 'contact' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Contact Numbers, Emails & Working Hours
              </h3>
              <p className="text-xs text-slate-500">Phone hotlines and emails displayed in website header and footer</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Main Office Telephone
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
                  Admissions Helpline (Mobile / WhatsApp)
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
                  General Info Email
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
                  Admissions Desk Email
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
                  Student School Timings
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
                  Administrative Office Hours
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
        )}

        {/* TAB 3: LOCATION */}
        {activeTab === 'location' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Campus Address & Google Maps Embed
              </h3>
              <p className="text-xs text-slate-500">Physical address for navigation and interactive map iframe</p>
            </div>

            <div className="space-y-4">
              <div>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    State / Union Territory
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Google Maps Embed URL
                </label>
                <input
                  type="text"
                  value={form.map_embed_url}
                  onChange={(e) => setForm({ ...form, map_embed_url: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SOCIAL */}
        {activeTab === 'social' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Social Media Links
              </h3>
              <p className="text-xs text-slate-500">Official social networking handles linked in header and footer</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={form.social_facebook}
                  onChange={(e) => setForm({ ...form, social_facebook: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Instagram Handle / Profile URL
                </label>
                <input
                  type="url"
                  value={form.social_instagram}
                  onChange={(e) => setForm({ ...form, social_instagram: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={form.social_youtube}
                  onChange={(e) => setForm({ ...form, social_youtube: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  value={form.social_twitter}
                  onChange={(e) => setForm({ ...form, social_twitter: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BANNER */}
        {activeTab === 'banner' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Top Announcement & Admissions Alert Banner
              </h3>
              <p className="text-xs text-slate-500">Floating announcement bar appearing at the very top of all pages</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <input
                  type="checkbox"
                  id="bannerEnable"
                  checked={form.banner_enabled}
                  onChange={(e) => setForm({ ...form, banner_enabled: e.target.checked })}
                  className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="bannerEnable" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer">
                  Display Top Announcement Banner across the website
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Banner Text Message
                </label>
                <input
                  type="text"
                  value={form.banner_text}
                  onChange={(e) => setForm({ ...form, banner_text: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={form.banner_cta_text}
                    onChange={(e) => setForm({ ...form, banner_cta_text: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    CTA Button Target Link
                  </label>
                  <input
                    type="text"
                    value={form.banner_cta_url}
                    onChange={(e) => setForm({ ...form, banner_cta_url: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FOOTER & LEGAL */}
        {activeTab === 'footer' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Footer Tagline & Legal Information
              </h3>
              <p className="text-xs text-slate-500">Copyright declaration and bottom branding</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Footer Summary Tagline
                </label>
                <textarea
                  rows={2}
                  value={form.footer_tagline}
                  onChange={(e) => setForm({ ...form, footer_tagline: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Copyright Notice Text
                </label>
                <input
                  type="text"
                  value={form.copyright_text}
                  onChange={(e) => setForm({ ...form, copyright_text: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="submit" variant="primary" size="lg">
            <Save size={16} /> Save All Settings
          </Button>
        </div>
      </form>

      {/* TOAST FEEDBACK */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
