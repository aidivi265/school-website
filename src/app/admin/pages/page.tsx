'use client';

import { useState, useEffect } from 'react';
import { usePagesCMS } from '@/lib/cms/useCMS';
import { defaultPagesCMS } from '@/lib/cms/cmsStore';
import { Button } from '@/components/ui';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import {
  Save,
  RotateCcw,
  Home,
  Compass,
  GraduationCap,
  BookOpen,
  Building,
  Phone,
  Sparkles,
  CheckCircle2,
  Quote,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPagesCMS() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'about' | 'principal' | 'academics' | 'admissions' | 'facilities' | 'contact'
  >('home');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const { pagesData, setPagesData, isHydrated } = usePagesCMS();

  const [formData, setFormData] = useState(defaultPagesCMS);

  useEffect(() => {
    if (isHydrated && pagesData) {
      setFormData({
        ...defaultPagesCMS,
        ...pagesData,
      });
    }
  }, [pagesData, isHydrated]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPagesData(formData);
    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: 'Page content updated successfully and published to live website!',
    });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all page text fields to standard school defaults?')) {
      setFormData(defaultPagesCMS);
      setPagesData(defaultPagesCMS);
      setToast({
        id: Date.now().toString(),
        type: 'info',
        text: 'All page text has been reset to default values.',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="font-serif font-bold text-2xl text-slate-900">Page Content CMS</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            Manage and customize every headline, paragraph, quote, accreditation point, and description across all 7 main areas of the website in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>
          <Link
            href="/"
            target="_blank"
            className="text-xs font-bold text-navy-950 bg-amber-400 hover:bg-amber-500 px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <ExternalLink size={14} /> View Live Website
          </Link>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto flex gap-1.5 scrollbar-none">
        {[
          { id: 'home', label: 'Homepage', icon: Home },
          { id: 'about', label: 'About Us', icon: Compass },
          { id: 'principal', label: "Principal's Desk", icon: Quote },
          { id: 'academics', label: 'Academics', icon: BookOpen },
          { id: 'admissions', label: 'Admissions', icon: GraduationCap },
          { id: 'facilities', label: 'Facilities', icon: Building },
          { id: 'contact', label: 'Contact Us', icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-navy-950 text-amber-400 shadow-md'
                  : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. HOMEPAGE TAB                                                           */}
        {/* ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Hero Section Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Section 1 · Entrance Banner
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Hero & Main Headlines</h3>
                <p className="text-xs text-slate-500 mt-0.5">Top-most title, affiliation badge, and mission intro.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Affiliation Pill Badge
                  </label>
                  <input
                    type="text"
                    value={formData.heroBadge}
                    onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-navy-950 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Motto / Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.heroTagline}
                    onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-navy-950 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Main Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-navy-950 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Hero Subtext Paragraph
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubtext}
                  onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-navy-950 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Top Announcement Ticker Marquee Text
                </label>
                <input
                  type="text"
                  value={formData.announcementTicker}
                  onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-navy-950 outline-none"
                />
              </div>
            </div>

            {/* Trust Pillars */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Section 2 · Trust Strip
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">4 Core Trust Pillars</h3>
                <p className="text-xs text-slate-500 mt-0.5">The four highlights displayed right below the hero header.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-navy-950 uppercase">Pillar 1</span>
                  <input
                    type="text"
                    value={formData.trustTitle1}
                    onChange={(e) => setFormData({ ...formData, trustTitle1: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.trustDesc1}
                    onChange={(e) => setFormData({ ...formData, trustDesc1: e.target.value })}
                    className="w-full text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-navy-950 uppercase">Pillar 2</span>
                  <input
                    type="text"
                    value={formData.trustTitle2}
                    onChange={(e) => setFormData({ ...formData, trustTitle2: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.trustDesc2}
                    onChange={(e) => setFormData({ ...formData, trustDesc2: e.target.value })}
                    className="w-full text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-navy-950 uppercase">Pillar 3</span>
                  <input
                    type="text"
                    value={formData.trustTitle3}
                    onChange={(e) => setFormData({ ...formData, trustTitle3: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.trustDesc3}
                    onChange={(e) => setFormData({ ...formData, trustDesc3: e.target.value })}
                    className="w-full text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-navy-950 uppercase">Pillar 4</span>
                  <input
                    type="text"
                    value={formData.trustTitle4}
                    onChange={(e) => setFormData({ ...formData, trustTitle4: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.trustDesc4}
                    onChange={(e) => setFormData({ ...formData, trustDesc4: e.target.value })}
                    className="w-full text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Why Choose Us & Stats */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Section 3 · About School Intro
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Why Choose Us & Key Metrics</h3>
                <p className="text-xs text-slate-500 mt-0.5">Introduction story and counter statistics on the homepage.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Eyebrow Tag
                  </label>
                  <input
                    type="text"
                    value={formData.whyChooseUsEyebrow}
                    onChange={(e) => setFormData({ ...formData, whyChooseUsEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={formData.whyChooseUsTitle}
                    onChange={(e) => setFormData({ ...formData, whyChooseUsTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Introduction Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={formData.whyChooseUsP1}
                  onChange={(e) => setFormData({ ...formData, whyChooseUsP1: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Introduction Paragraph 2
                </label>
                <textarea
                  rows={2}
                  value={formData.whyChooseUsP2}
                  onChange={(e) => setFormData({ ...formData, whyChooseUsP2: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Highlight Counters (Stats)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Students Enrolled</span>
                    <input
                      type="text"
                      value={formData.statStudents}
                      onChange={(e) => setFormData({ ...formData, statStudents: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Educators / Teachers</span>
                    <input
                      type="text"
                      value={formData.statTeachers}
                      onChange={(e) => setFormData({ ...formData, statTeachers: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Board Pass Track Record</span>
                    <input
                      type="text"
                      value={formData.statPassRate}
                      onChange={(e) => setFormData({ ...formData, statPassRate: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Years of Heritage</span>
                    <input
                      type="text"
                      value={formData.statExperience}
                      onChange={(e) => setFormData({ ...formData, statExperience: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Banner */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Section 4 · Bottom Banner
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Admissions CTA Banner</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={formData.ctaBannerTitle}
                    onChange={(e) => setFormData({ ...formData, ctaBannerTitle: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.ctaBannerButtonText}
                    onChange={(e) => setFormData({ ...formData, ctaBannerButtonText: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Banner Subtitle / Eligibility Note
                </label>
                <input
                  type="text"
                  value={formData.ctaBannerSubtitle}
                  onChange={(e) => setFormData({ ...formData, ctaBannerSubtitle: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. ABOUT US TAB                                                           */}
        {/* ========================================================================= */}
        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Heritage */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Page Header & Founding Story
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">About Page Hero & Heritage</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Header Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.aboutHeroEyebrow}
                    onChange={(e) => setFormData({ ...formData, aboutHeroEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Header Title
                  </label>
                  <input
                    type="text"
                    value={formData.aboutHeroTitle}
                    onChange={(e) => setFormData({ ...formData, aboutHeroTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Header Subtitle
                </label>
                <input
                  type="text"
                  value={formData.aboutHeroSubtitle}
                  onChange={(e) => setFormData({ ...formData, aboutHeroSubtitle: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Heritage Section Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.aboutHeritageEyebrow}
                    onChange={(e) => setFormData({ ...formData, aboutHeritageEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Heritage Section Title
                  </label>
                  <input
                    type="text"
                    value={formData.aboutHeritageTitle}
                    onChange={(e) => setFormData({ ...formData, aboutHeritageTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Heritage Story Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutHeritageP1}
                  onChange={(e) => setFormData({ ...formData, aboutHeritageP1: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Heritage Story Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutHeritageP2}
                  onChange={(e) => setFormData({ ...formData, aboutHeritageP2: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  4 Key Highlights / Checklist Points
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.aboutChecklist1}
                    onChange={(e) => setFormData({ ...formData, aboutChecklist1: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={formData.aboutChecklist2}
                    onChange={(e) => setFormData({ ...formData, aboutChecklist2: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={formData.aboutChecklist3}
                    onChange={(e) => setFormData({ ...formData, aboutChecklist3: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={formData.aboutChecklist4}
                    onChange={(e) => setFormData({ ...formData, aboutChecklist4: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Guiding Philosophy
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Vision & Mission Statements</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                    Vision Heading & Statement
                  </label>
                  <input
                    type="text"
                    value={formData.visionTitle}
                    onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-xl px-3 py-2"
                  />
                  <textarea
                    rows={4}
                    value={formData.visionText}
                    onChange={(e) => setFormData({ ...formData, visionText: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 leading-relaxed"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-950">
                    Mission Heading & Statement
                  </label>
                  <input
                    type="text"
                    value={formData.missionTitle}
                    onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-xl px-3 py-2"
                  />
                  <textarea
                    rows={4}
                    value={formData.missionText}
                    onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* 4 Core Values */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Ethos & Culture
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">4 Institutional Core Values</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">Value 1</span>
                  <input
                    type="text"
                    value={formData.value1Title}
                    onChange={(e) => setFormData({ ...formData, value1Title: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.value1Desc}
                    onChange={(e) => setFormData({ ...formData, value1Desc: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">Value 2</span>
                  <input
                    type="text"
                    value={formData.value2Title}
                    onChange={(e) => setFormData({ ...formData, value2Title: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.value2Desc}
                    onChange={(e) => setFormData({ ...formData, value2Desc: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">Value 3</span>
                  <input
                    type="text"
                    value={formData.value3Title}
                    onChange={(e) => setFormData({ ...formData, value3Title: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.value3Desc}
                    onChange={(e) => setFormData({ ...formData, value3Desc: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">Value 4</span>
                  <input
                    type="text"
                    value={formData.value4Title}
                    onChange={(e) => setFormData({ ...formData, value4Title: e.target.value })}
                    className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={2}
                    value={formData.value4Desc}
                    onChange={(e) => setFormData({ ...formData, value4Desc: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. PRINCIPAL'S DESK TAB                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'principal' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  School Leadership
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Principal Profile & Official Message</h3>
                <p className="text-xs text-slate-500 mt-0.5">Displayed prominently on the homepage and about leadership sections.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Principal Name
                  </label>
                  <input
                    type="text"
                    value={formData.principalName}
                    onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
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
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    value={formData.principalQualification}
                    onChange={(e) => setFormData({ ...formData, principalQualification: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Principal Photo Image URL
                </label>
                <input
                  type="url"
                  value={formData.principalPhotoUrl}
                  onChange={(e) => setFormData({ ...formData, principalPhotoUrl: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Featured Quote / Key Takeaway
                </label>
                <textarea
                  rows={2}
                  value={formData.principalQuote}
                  onChange={(e) => setFormData({ ...formData, principalQuote: e.target.value })}
                  className="w-full text-sm italic bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Official Message (3 Paragraphs)
                </label>

                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">Paragraph 1 (Welcome & Vision)</span>
                  <textarea
                    rows={3}
                    value={formData.principalMessageP1}
                    onChange={(e) => setFormData({ ...formData, principalMessageP1: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 leading-relaxed"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">Paragraph 2 (30 Years Heritage & Pedagogy)</span>
                  <textarea
                    rows={3}
                    value={formData.principalMessageP2}
                    onChange={(e) => setFormData({ ...formData, principalMessageP2: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 leading-relaxed"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">Paragraph 3 (Invitation & Closing)</span>
                  <textarea
                    rows={3}
                    value={formData.principalMessageP3}
                    onChange={(e) => setFormData({ ...formData, principalMessageP3: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. ACADEMICS TAB                                                          */}
        {/* ========================================================================= */}
        {activeTab === 'academics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Curriculum & Methodology
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Academics Page Text</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.academicsHeroEyebrow}
                    onChange={(e) => setFormData({ ...formData, academicsHeroEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={formData.academicsHeroTitle}
                    onChange={(e) => setFormData({ ...formData, academicsHeroTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={formData.academicsHeroSubtitle}
                  onChange={(e) => setFormData({ ...formData, academicsHeroSubtitle: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Philosophy Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.academicsPhilosophyEyebrow}
                    onChange={(e) => setFormData({ ...formData, academicsPhilosophyEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Philosophy Title
                  </label>
                  <input
                    type="text"
                    value={formData.academicsPhilosophyTitle}
                    onChange={(e) => setFormData({ ...formData, academicsPhilosophyTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Philosophy Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={formData.academicsPhilosophyP1}
                  onChange={(e) => setFormData({ ...formData, academicsPhilosophyP1: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Philosophy Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={formData.academicsPhilosophyP2}
                  onChange={(e) => setFormData({ ...formData, academicsPhilosophyP2: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Science Stream (XI & XII) Overview
                  </label>
                  <textarea
                    rows={3}
                    value={formData.scienceStreamDesc}
                    onChange={(e) => setFormData({ ...formData, scienceStreamDesc: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Commerce Stream (XI & XII) Overview
                  </label>
                  <textarea
                    rows={3}
                    value={formData.commerceStreamDesc}
                    onChange={(e) => setFormData({ ...formData, commerceStreamDesc: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. ADMISSIONS TAB                                                         */}
        {/* ========================================================================= */}
        {activeTab === 'admissions' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Admissions Portal
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Admissions Guidelines & 4-Step Process</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.admissionsHeroEyebrow}
                    onChange={(e) => setFormData({ ...formData, admissionsHeroEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={formData.admissionsHeroTitle}
                    onChange={(e) => setFormData({ ...formData, admissionsHeroTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={formData.admissionsHeroSubtitle}
                  onChange={(e) => setFormData({ ...formData, admissionsHeroSubtitle: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Welcome Title
                  </label>
                  <input
                    type="text"
                    value={formData.admissionsWelcomeTitle}
                    onChange={(e) => setFormData({ ...formData, admissionsWelcomeTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Admission Desk Timings
                  </label>
                  <input
                    type="text"
                    value={formData.admissionsDeskTimings}
                    onChange={(e) => setFormData({ ...formData, admissionsDeskTimings: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Welcome / DoE Compliance Message
                </label>
                <textarea
                  rows={3}
                  value={formData.admissionsWelcomeText}
                  onChange={(e) => setFormData({ ...formData, admissionsWelcomeText: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              {/* 4 Steps */}
              <div className="space-y-4 pt-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  4-Step Enrolment Procedure
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-amber-700 uppercase">Step 01</span>
                    <input
                      type="text"
                      value={formData.admissionsStep1Title}
                      onChange={(e) => setFormData({ ...formData, admissionsStep1Title: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                    <textarea
                      rows={2}
                      value={formData.admissionsStep1Desc}
                      onChange={(e) => setFormData({ ...formData, admissionsStep1Desc: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-amber-700 uppercase">Step 02</span>
                    <input
                      type="text"
                      value={formData.admissionsStep2Title}
                      onChange={(e) => setFormData({ ...formData, admissionsStep2Title: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                    <textarea
                      rows={2}
                      value={formData.admissionsStep2Desc}
                      onChange={(e) => setFormData({ ...formData, admissionsStep2Desc: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-amber-700 uppercase">Step 03</span>
                    <input
                      type="text"
                      value={formData.admissionsStep3Title}
                      onChange={(e) => setFormData({ ...formData, admissionsStep3Title: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                    <textarea
                      rows={2}
                      value={formData.admissionsStep3Desc}
                      onChange={(e) => setFormData({ ...formData, admissionsStep3Desc: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-amber-700 uppercase">Step 04</span>
                    <input
                      type="text"
                      value={formData.admissionsStep4Title}
                      onChange={(e) => setFormData({ ...formData, admissionsStep4Title: e.target.value })}
                      className="w-full text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                    <textarea
                      rows={2}
                      value={formData.admissionsStep4Desc}
                      onChange={(e) => setFormData({ ...formData, admissionsStep4Desc: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. FACILITIES TAB                                                         */}
        {/* ========================================================================= */}
        {activeTab === 'facilities' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Campus Facilities
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Facilities Page Headers & Text</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Individual facility cards (Labs, Sports, Library) can be managed under the "Facilities" sidebar menu.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.facilitiesHeroEyebrow}
                    onChange={(e) => setFormData({ ...formData, facilitiesHeroEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={formData.facilitiesHeroTitle}
                    onChange={(e) => setFormData({ ...formData, facilitiesHeroTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={formData.facilitiesHeroSubtitle}
                  onChange={(e) => setFormData({ ...formData, facilitiesHeroSubtitle: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Section Header Title
                  </label>
                  <input
                    type="text"
                    value={formData.facilitiesSectionTitle}
                    onChange={(e) => setFormData({ ...formData, facilitiesSectionTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Section Header Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.facilitiesSectionSubtitle}
                    onChange={(e) => setFormData({ ...formData, facilitiesSectionSubtitle: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. CONTACT US TAB                                                         */}
        {/* ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Reach Out & Campus Directions
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">Contact Us Page & Landmarks</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phone numbers and emails can also be updated in "Settings" sidebar menu.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.contactHeroEyebrow}
                    onChange={(e) => setFormData({ ...formData, contactHeroEyebrow: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={formData.contactHeroTitle}
                    onChange={(e) => setFormData({ ...formData, contactHeroTitle: e.target.value })}
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={formData.contactHeroSubtitle}
                  onChange={(e) => setFormData({ ...formData, contactHeroSubtitle: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Campus Address Vicinity / Landmark Intro
                </label>
                <textarea
                  rows={3}
                  value={formData.contactAddressIntro}
                  onChange={(e) => setFormData({ ...formData, contactAddressIntro: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nearest Metro Station & Transport Directions
                </label>
                <input
                  type="text"
                  value={formData.contactMetroLandmark}
                  onChange={(e) => setFormData({ ...formData, contactMetroLandmark: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* Sticky Action / Save Bar */}
        <div className="sticky bottom-6 z-20 bg-navy-950/95 backdrop-blur-md text-white p-4 rounded-2xl border border-amber-500/30 shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-300 hidden sm:inline">
              Changes apply instantly to live website upon clicking Save.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="font-bold shadow-lg shadow-amber-500/30"
            >
              <Save size={16} /> Save All Page Changes
            </Button>
          </div>
        </div>
      </form>

      {/* Toast Feedback Notification */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
