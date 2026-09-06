'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  Download,
  ArrowRight,
  GraduationCap,
  BookOpen,
  PieChart,
  BarChart3,
  CheckCircle,
  FileText,
  Clock,
  Printer,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');

  const statsSummary = [
    {
      label: 'Total Admission Inquiries',
      val: '184',
      change: '+24%',
      period: 'vs previous month',
      icon: Users,
      color: 'amber',
    },
    {
      label: 'Stream Selector Quizzes Taken',
      val: '392',
      change: '+38%',
      period: 'Class 10 students',
      icon: Sparkles,
      color: 'indigo',
    },
    {
      label: 'Campus Visit Appointments',
      val: '68',
      change: '+15%',
      period: 'confirmed bookings',
      icon: Calendar,
      color: 'emerald',
    },
    {
      label: 'Mandatory CBSE Document Downloads',
      val: '1,450',
      change: '+42%',
      period: 'public compliance access',
      icon: Download,
      color: 'blue',
    },
  ];

  const streamPreferences = [
    { stream: 'Science (PCM with CS/AI)', percentage: 42, count: 165, color: 'bg-amber-500' },
    { stream: 'Commerce with Mathematics', percentage: 28, count: 110, color: 'bg-blue-600' },
    { stream: 'Medical (PCB with Biotechnology)', percentage: 18, count: 70, color: 'bg-emerald-500' },
    { stream: 'Humanities & Social Sciences', percentage: 12, count: 47, color: 'bg-purple-500' },
  ];

  const gradeDemand = [
    { grade: 'Pre-School / Nursery', percentage: 36, enquiries: 66 },
    { grade: 'Class I (Primary Wing)', percentage: 22, enquiries: 40 },
    { grade: 'Class VI (Middle Wing)', percentage: 18, enquiries: 33 },
    { grade: 'Class XI (Senior Streams)', percentage: 14, enquiries: 26 },
    { grade: 'Class IX (Secondary Wing)', percentage: 10, enquiries: 19 },
  ];

  const weeklyTraffic = [
    { day: 'Mon', count: 42, height: '70%' },
    { day: 'Tue', count: 58, height: '85%' },
    { day: 'Wed', count: 64, height: '95%' },
    { day: 'Thu', count: 52, height: '78%' },
    { day: 'Fri', count: 70, height: '100%' },
    { day: 'Sat', count: 60, height: '88%' },
    { day: 'Sun', count: 25, height: '40%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp size={13} className="text-amber-600" /> Real-time School Insights
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
            Admissions & Student Analytics
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Monitor online enquiry volumes, Class 11 stream trends, and campus visit engagements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold text-slate-600">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === '7d' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-950'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === '30d' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-950'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === 'all' ? 'bg-white text-navy-950 shadow-sm' : 'hover:text-navy-950'
              }`}
            >
              All Time
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow"
          >
            <Printer size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsSummary.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{kpi.label}</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Icon size={16} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-serif font-bold text-3xl text-navy-950">{kpi.val}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {kpi.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{kpi.period}</p>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Traffic & Daily Enquiry Velocity */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-navy-950">
                Daily Enquiries & Footfall Trend
              </h3>
              <p className="text-xs text-slate-500">Average daily active prospective admissions</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Peak: Friday (70 Enquiries)
            </span>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-100">
            {weeklyTraffic.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-navy-950 transition-colors">
                  {item.count}
                </span>
                <div className="w-full bg-slate-100 rounded-t-xl h-36 flex items-end overflow-hidden p-1">
                  <div
                    style={{ height: item.height }}
                    className="w-full bg-gradient-to-t from-navy-950 to-amber-500 rounded-t-lg group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-slate-600">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Fastest Turnaround</span>
              <span className="font-bold text-navy-950 text-sm">Under 2.5 Hours</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Highest Lead Source</span>
              <span className="font-bold text-navy-950 text-sm">Mobile Search & WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Class 11 Stream Selector Career Choices */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-navy-950">
                Class 11 Stream Preference
              </h3>
              <p className="text-xs text-slate-500">Based on 392 Stream Selector quiz responses</p>
            </div>
            <Sparkles size={18} className="text-amber-500" />
          </div>

          <div className="space-y-4">
            {streamPreferences.map((st) => (
              <div key={st.stream} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{st.stream}</span>
                  <span className="font-bold text-navy-950">
                    {st.percentage}% ({st.count})
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${st.color} rounded-full transition-all duration-500`}
                    style={{ width: `${st.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950">
            <p className="font-bold mb-0.5">Key Admission Trend:</p>
            <p className="text-slate-700 leading-relaxed">
              High interest in <strong>AI & Computer Science</strong> integrated with PCM. Commerce with Mathematics maintains steady second place.
            </p>
          </div>
        </div>
      </div>

      {/* Grade Demand & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-lg text-navy-950">
            Admission Enquiries by Grade Level
          </h3>
          <div className="space-y-3">
            {gradeDemand.map((row) => (
              <div
                key={row.grade}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-2.5 font-semibold text-navy-950">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{row.grade}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500">{row.enquiries} Applications</span>
                  <span className="font-bold text-navy-950 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                    {row.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-navy-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Quick Management Actions
            </span>
            <h3 className="font-serif font-bold text-xl text-white mt-1">
              Admissions & Content Workflow
            </h3>
            <p className="text-slate-300 text-xs mt-2 leading-relaxed">
              Review incoming registration applications, dispatch WhatsApp confirmations, or modify website announcements.
            </p>
          </div>

          <div className="space-y-2.5">
            <Link
              href="/admin/admissions"
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs rounded-xl flex items-center justify-between transition-colors shadow"
            >
              <span>Manage Admission Leads & Desk</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/admin/pages"
              className="w-full py-3 px-4 bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs rounded-xl flex items-center justify-between border border-navy-700 transition-colors"
            >
              <span>Edit Live Website Text & Content</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
