'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Calendar,
  Users,
  Image as ImageIcon,
  Trophy,
  FileDown,
  UserCheck,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { mockNotices, mockEvents, mockFaculty, mockGalleryImages, mockDocuments } from '@/lib/data/mockData';
import { formatDate } from '@/lib/utils';
import { Badge, Button } from '@/components/ui';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    noticesCount: mockNotices.length,
    eventsCount: mockEvents.length,
    facultyCount: mockFaculty.length,
    galleryCount: mockGalleryImages.length,
    documentsCount: mockDocuments.length,
    enquiriesCount: 14,
  });

  const recentEnquiries = [
    { id: 'enq-101', parent: 'Sunil Malhotra', student: 'Aarav Malhotra', class: 'Pre-School (Nursery)', phone: '+91 98112 34567', date: '2025-06-16', status: 'Pending' },
    { id: 'enq-102', parent: 'Meera Chawla', student: 'Kavya Chawla', class: 'Class XI (Science - PCM)', phone: '+91 98711 22334', date: '2025-06-15', status: 'Contacted' },
    { id: 'enq-103', parent: 'Vikram Batra', student: 'Rohan Batra', class: 'Class I', phone: '+91 99100 88776', date: '2025-06-14', status: 'Under Review' },
    { id: 'enq-104', parent: 'Pooja Aggarwal', student: 'Dev Aggarwal', class: 'Class VI', phone: '+91 98101 44556', date: '2025-06-12', status: 'Admitted' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
            Decent Public School CMS
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl">Administrator Dashboard</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Manage school notices, events, faculty directory, photo gallery, circulars, and admission enquiries.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/notices"
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <Plus size={15} /> Add Notice
          </Link>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors border border-white/20"
          >
            <Plus size={15} /> Add Event
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Active Notices', count: stats.noticesCount, icon: Bell, href: '/admin/notices', color: 'text-blue-600 bg-blue-50' },
          { label: 'School Events', count: stats.eventsCount, icon: Calendar, href: '/admin/events', color: 'text-amber-600 bg-amber-50' },
          { label: 'Faculty Staff', count: stats.facultyCount, icon: Users, href: '/admin/faculty', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Enquiries', count: stats.enquiriesCount, icon: UserCheck, href: '/admin/admissions', color: 'text-purple-600 bg-purple-50' },
          { label: 'Gallery Photos', count: stats.galleryCount, icon: ImageIcon, href: '/admin/gallery', color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Documents', count: stats.documentsCount, icon: FileDown, href: '/admin/documents', color: 'text-rose-600 bg-rose-50' },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.label}
              href={m.href}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon size={18} />
                </div>
                <ArrowUpRight size={15} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
              </div>
              <div>
                <p className="font-serif font-bold text-2xl text-slate-900 leading-none mb-1">{m.count}</p>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{m.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Section: Recent Enquiries & Recent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Enquiries */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">Recent Admission Enquiries</h3>
                <p className="text-xs text-slate-500">Live applications submitted via website form</p>
              </div>
              <Link
                href="/admin/admissions"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                View All <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Student & Parent</th>
                    <th className="pb-3">Class</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5">
                        <p className="font-bold text-slate-900">{enq.student}</p>
                        <p className="text-[11px] text-slate-500">{enq.parent}</p>
                      </td>
                      <td className="py-3.5 font-medium text-slate-700">{enq.class}</td>
                      <td className="py-3.5 text-slate-600">{enq.phone}</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            enq.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : enq.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : enq.status === 'Admitted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing latest 4 enquiries</span>
            <Link href="/admin/admissions" className="font-semibold text-slate-800 hover:text-amber-600">
              Manage all enquiries →
            </Link>
          </div>
        </div>

        {/* Right: Quick Notices View */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">Live Circulars & Notices</h3>
                <p className="text-xs text-slate-500">Currently published to public website</p>
              </div>
              <Link
                href="/admin/notices"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                Manage <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3.5">
              {mockNotices.slice(0, 4).map((n) => (
                <div
                  key={n.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-0.5">
                      {n.category} · {formatDate(n.date)}
                    </span>
                    <p className="font-serif font-bold text-slate-900 text-xs leading-snug line-clamp-1">
                      {n.title}
                    </p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex-shrink-0">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <Link
              href="/admin/notices"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-xl transition-colors"
            >
              <Plus size={14} /> Create New Notice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
