'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import {
  Save,
  CheckCircle,
  FileText,
  Home,
  BookOpen,
  Compass,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';

export default function AdminPagesCMS() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'principal' | 'academics' | 'admissions'>('home');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [formData, setFormData] = useState({
    // Homepage
    heroHeadline: 'Empowering Young Minds for a Better Tomorrow',
    heroSubtext:
      'A premier CBSE-affiliated co-educational institution in Rohini, Delhi, dedicated to academic excellence, value-driven character building, and holistic student growth since 1995.',
    announcementTicker:
      'ADMISSIONS OPEN FOR SESSION 2025–26 | Pre-School to Class IX & Class XI (Science, Commerce & Humanities Streams) | Contact Admission Desk: 011-27948281 / +91 98188 99001',
    statStudents: '2500+',
    statTeachers: '120+',
    statPassRate: '100%',
    statExperience: '30+',

    // About Us
    visionText:
      'To be a premier center of educational excellence that nurtures enlightened, innovative, and ethically grounded global citizens capable of contributing meaningfully to society and thriving in an ever-evolving world.',
    missionText:
      'To provide a stimulating learning environment where academic rigour, technological innovation, character development, and inclusive values empower every student to discover their unique potential and achieve lifelong success.',
    legacyText:
      'Established in 1995, Decent Public School has evolved from a visionary institution into one of North-West Delhi\'s most trusted centers of quality school education.',

    // Principal's Message
    principalName: 'Mrs. Ritu Pathak',
    principalDesignation: 'Principal, Decent Public School',
    principalMessage:
      'At Decent Public School, Rohini, we believe that every child carries within them an immense potential waiting to be discovered. Our role as educators is not merely to teach — it is to inspire, guide, and empower. We prepare students for life, not merely for examinations.',
    principalQuote:
      'Education is the most powerful weapon which you can use to change the world. At DPS Rohini, we nurture curious minds and compassionate hearts.',

    // Academics
    pedagogyText:
      'Our academic framework follows the National Education Policy (NEP) 2020 guidelines, emphasizing experiential learning, conceptual clarity, inquiry-based discussions, and STEM project work.',
    streamsOverview:
      'Class XI and XII students can select from Science (PCM/PCB with CS/IP/Physical Education), Commerce (with or without Mathematics), and Humanities (Economics, Political Science, Psychology).',

    // Admissions Page Text
    admissionAgeCriteria:
      'Pre-School (Nursery): 3+ years as of 31st March | Pre-Primary (KG): 4+ years | Class 1: 5+ years. Admissions are open based on merit and neighborhood criteria per Directorate of Education guidelines.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: 'Page content updated successfully and published to live website!',
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h2 className="font-serif font-bold text-2xl text-slate-900">Page Content CMS</h2>
        <p className="text-xs text-slate-500">
          Edit dynamic text sections, hero headlines, vision statements, and principal messages across the website
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'home'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home size={15} /> Homepage
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'about'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass size={15} /> About & Vision
        </button>
        <button
          onClick={() => setActiveTab('principal')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'principal'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText size={15} /> Principal's Desk
        </button>
        <button
          onClick={() => setActiveTab('academics')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'academics'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen size={15} /> Academics Page
        </button>
        <button
          onClick={() => setActiveTab('admissions')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'admissions'
              ? 'border-navy-950 text-navy-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GraduationCap size={15} /> Admissions Info
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        {/* TAB 1: HOMEPAGE */}
        {activeTab === 'home' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Homepage Hero & Headlines
              </h3>
              <p className="text-xs text-slate-500">First impression text displayed on the main entrance banner</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Main Hero Headline
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
                  Hero Subtitle / Mission Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubtext}
                  onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Top Announcement Ticker Text
                </label>
                <input
                  type="text"
                  value={formData.announcementTicker}
                  onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Homepage Trust Metrics / Key Stats
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Enrolled Students</span>
                    <input
                      type="text"
                      value={formData.statStudents}
                      onChange={(e) => setFormData({ ...formData, statStudents: e.target.value })}
                      className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Qualified Faculty</span>
                    <input
                      type="text"
                      value={formData.statTeachers}
                      onChange={(e) => setFormData({ ...formData, statTeachers: e.target.value })}
                      className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Board Pass Rate</span>
                    <input
                      type="text"
                      value={formData.statPassRate}
                      onChange={(e) => setFormData({ ...formData, statPassRate: e.target.value })}
                      className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Years of Legacy</span>
                    <input
                      type="text"
                      value={formData.statExperience}
                      onChange={(e) => setFormData({ ...formData, statExperience: e.target.value })}
                      className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT & VISION */}
        {activeTab === 'about' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                About Us: Vision, Mission & Legacy
              </h3>
              <p className="text-xs text-slate-500">Core statements defining the institution's philosophy</p>
            </div>

            <div className="space-y-4">
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  History & Legacy Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.legacyText}
                  onChange={(e) => setFormData({ ...formData, legacyText: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRINCIPAL'S DESK */}
        {activeTab === 'principal' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Principal's Message & Leadership
              </h3>
              <p className="text-xs text-slate-500">Official message published on the Principal Desk page</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Principal Name
                  </label>
                  <input
                    type="text"
                    value={formData.principalName}
                    onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formData.principalDesignation}
                    onChange={(e) => setFormData({ ...formData, principalDesignation: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Message Content
                </label>
                <textarea
                  rows={6}
                  value={formData.principalMessage}
                  onChange={(e) => setFormData({ ...formData, principalMessage: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Featured Quote Highlight
                </label>
                <input
                  type="text"
                  value={formData.principalQuote}
                  onChange={(e) => setFormData({ ...formData, principalQuote: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACADEMICS PAGE */}
        {activeTab === 'academics' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Academics & Pedagogy Guidelines
              </h3>
              <p className="text-xs text-slate-500">Descriptions for academic methodology and senior streams</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Pedagogical Framework Summary (NEP 2020)
                </label>
                <textarea
                  rows={4}
                  value={formData.pedagogyText}
                  onChange={(e) => setFormData({ ...formData, pedagogyText: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Senior Secondary Streams (XI & XII)
                </label>
                <textarea
                  rows={4}
                  value={formData.streamsOverview}
                  onChange={(e) => setFormData({ ...formData, streamsOverview: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ADMISSIONS INFO */}
        {activeTab === 'admissions' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                Admissions Criteria & Guidelines
              </h3>
              <p className="text-xs text-slate-500">Summary notes shown on the Public Admissions page</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Age Eligibility & DoE Guidelines Note
                </label>
                <textarea
                  rows={4}
                  value={formData.admissionAgeCriteria}
                  onChange={(e) => setFormData({ ...formData, admissionAgeCriteria: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="submit" variant="primary" size="lg">
            <Save size={16} /> Save Changes
          </Button>
        </div>
      </form>

      {/* TOAST FEEDBACK */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
