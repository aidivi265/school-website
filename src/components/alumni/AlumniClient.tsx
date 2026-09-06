'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader, Badge } from '@/components/ui';
import {
  GraduationCap,
  Briefcase,
  Building,
  Sparkles,
  MapPin,
  ExternalLink,
  Users,
  Search,
  CheckCircle,
  Award,
  Heart,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlumniProfile {
  id: string;
  name: string;
  batchYear: string;
  category: string;
  currentRole: string;
  organization: string;
  higherEducation: string;
  location: string;
  photoUrl: string;
  quote: string;
  stream: string;
}

const mockAlumni: AlumniProfile[] = [
  {
    id: '1',
    name: 'Rohan Aggarwal',
    batchYear: 'Batch of 2016',
    category: 'Engineering & Tech',
    currentRole: 'Senior Machine Learning Engineer',
    organization: 'Google AI (Bengaluru)',
    higherEducation: 'B.Tech in Computer Science, IIT Delhi (AIR 142)',
    location: 'Bengaluru, India',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    quote: 'The Atal Tinkering Lab and STEM mentorship at Decent Public School ignited my love for artificial intelligence and problem-solving.',
    stream: 'Science (PCM with Computer Science)',
  },
  {
    id: '2',
    name: 'Dr. Shruti Mathur',
    batchYear: 'Batch of 2014',
    category: 'Medicine & Healthcare',
    currentRole: 'Resident Pediatric Cardiologist',
    organization: 'AIIMS, New Delhi',
    higherEducation: 'MBBS & MD, AIIMS New Delhi (NEET AIR 89)',
    location: 'New Delhi, India',
    photoUrl: 'https://images.unsplash.com/photo-1594824813589-3221e8e2c019?w=500&q=80',
    quote: 'Our biology teachers and the compassionate values nurtured at DPS laid the foundation for my medical journey.',
    stream: 'Science (PCB with Biotechnology)',
  },
  {
    id: '3',
    name: 'Vikas Singhal',
    batchYear: 'Batch of 2017',
    category: 'Finance & Consulting',
    currentRole: 'Investment Banking Associate',
    organization: 'Goldman Sachs',
    higherEducation: 'B.Com (Hons), Shri Ram College of Commerce (SRCC) · IIM Ahmedabad (MBA)',
    location: 'Mumbai, India',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    quote: 'The commerce department and youth parliament debates gave me the commercial acumen and public speaking confidence to thrive globally.',
    stream: 'Commerce with Mathematics',
  },
  {
    id: '4',
    name: 'Pooja Rawat, IPS',
    batchYear: 'Batch of 2012',
    category: 'Civil Services & Law',
    currentRole: 'Assistant Commissioner of Police',
    organization: 'Indian Police Service (IPS)',
    higherEducation: 'B.A. (Hons) Political Science, Delhi University · UPSC CSE (AIR 74)',
    location: 'New Delhi, India',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
    quote: 'Discipline, ethical responsibility, and patriotism were the true gifts given to me during morning assemblies at Decent Public School.',
    stream: 'Humanities & Social Sciences',
  },
  {
    id: '5',
    name: 'Kunal Sachdeva',
    batchYear: 'Batch of 2018',
    category: 'Engineering & Tech',
    currentRole: 'Founder & CEO',
    organization: 'GreenVolt Robotics (EdTech Startup)',
    higherEducation: 'B.Tech Robotics, DTU Delhi',
    location: 'Gurugram, India',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80',
    quote: 'Winning our first inter-school robotics cup under DPS Rohini taught me teamwork and entrepreneurial grit.',
    stream: 'Science (PCM with Informatics Practices)',
  },
  {
    id: '6',
    name: 'Neha Kapoor',
    batchYear: 'Batch of 2015',
    category: 'Corporate & Strategy',
    currentRole: 'Product Marketing Manager',
    organization: 'Microsoft Europe',
    higherEducation: 'B.A. Economics, St. Stephen’s College · London School of Economics (LSE)',
    location: 'London, United Kingdom',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80',
    quote: 'From Annual Day plays to Model UN conferences, DPS Rohini molded me into a confident global professional.',
    stream: 'Commerce with Economics',
  },
];

const categories = [
  'All Sectors',
  'Engineering & Tech',
  'Medicine & Healthcare',
  'Finance & Consulting',
  'Civil Services & Law',
  'Corporate & Strategy',
];

export function AlumniClient() {
  const [selectedCat, setSelectedCat] = useState('All Sectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    batchYear: '2020',
    email: '',
    phone: '',
    currentCompany: '',
    role: '',
    city: '',
  });

  const filtered = mockAlumni.filter((a) => {
    const matchCat = selectedCat === 'All Sectors' || a.category === selectedCat;
    const matchSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.higherEducation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSuccess(true);
    setTimeout(() => {
      setJoinSuccess(false);
      setIsJoinModalOpen(false);
    }, 2500);
  };

  return (
    <>
      <PageHeader
        eyebrow="Pride of DPS Rohini"
        title="Alumni Spotlight & Hall of Fame"
        subtitle="Celebrating the trailblazing journeys of our alumni leading innovations across IITs, AIIMS, global tech, and civil services"
        breadcrumbs={[{ label: 'About Us', href: '/about' }, { label: 'Alumni Network' }]}
      />

      <section className="py-16 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Banner & Network Stats */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Users size={13} /> 5000+ Alumni Worldwide
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                "Once a Decentian, Always a Leader."
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Our alumni community connects professionals across 20+ countries, offering guest lectures, career guidance, and college mentorship to current high school students.
              </p>
            </div>

            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Join Alumni Association / Register Profile →
            </button>
          </div>

          {/* Search & Category Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCat === cat
                      ? 'bg-navy-950 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, college, role..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((alumnus) => (
              <div
                key={alumnus.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Photo & Header */}
                  <div className="p-6 sm:p-7 pb-4">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={alumnus.photoUrl}
                        alt={alumnus.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 block w-fit mb-1">
                          {alumnus.batchYear}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-navy-950 leading-tight">
                          {alumnus.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">
                          {alumnus.currentRole}
                        </p>
                        <p className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                          <Building size={11} /> {alumnus.organization}
                        </p>
                      </div>
                    </div>

                    {/* Academic Pedigree */}
                    <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                      <div className="flex items-start gap-2 text-slate-700">
                        <GraduationCap size={14} className="text-navy-950 shrink-0 mt-0.5" />
                        <span className="leading-snug">{alumnus.higherEducation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                        <MapPin size={12} className="shrink-0" />
                        <span>{alumnus.location}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs italic text-slate-600 leading-relaxed">
                      "{alumnus.quote}"
                    </div>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{alumnus.stream}</span>
                  <span className="font-bold text-navy-950 flex items-center gap-1 text-[10px]">
                    <Sparkles size={11} className="text-amber-500" /> DPS Rohini Pride
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Alumni Modal */}
      <AnimatePresence>
        {isJoinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative my-8"
            >
              {joinSuccess ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-navy-950">
                    Welcome to the Alumni Network!
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                    Thank you for connecting back with your alma mater. Our alumni coordinator will reach out regarding upcoming mentorship events and alumni meets.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Alumni Registration
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-navy-950">
                        Join DPS Rohini Alumni
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsJoinModalOpen(false)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleJoinSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sahil Mehra"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Passing Batch Year *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.batchYear}
                          onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                          placeholder="e.g. 2018"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sahil@example.com"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Mobile / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Current Organization / College
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.currentCompany}
                          onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                          placeholder="e.g. Microsoft / IIT"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Current Role / Designation
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="e.g. Software Engineer"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <Send size={14} /> Submit Alumni Profile
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
