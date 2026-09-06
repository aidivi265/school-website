'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { SectionHeader } from '@/components/ui';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  Building,
  Sparkles,
  Printer,
  Compass,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { School } from '@/types';
import { useSiteSettings } from '@/lib/cms/useCMS';

interface VisitAgenda {
  id: string;
  title: string;
  desc: string;
  icon: string;
  duration: string;
}

const visitAgendas: VisitAgenda[] = [
  {
    id: 'campus-tour',
    title: '🏫 Comprehensive Campus & Lab Tour',
    desc: 'Guided walkthrough of smart classrooms, Atal Tinkering robotics lab, sports grounds, and library.',
    icon: 'Building',
    duration: '30 Mins',
  },
  {
    id: 'principal-desk',
    title: '🎓 Principal Desk Academic Interaction',
    desc: 'One-on-one session for Class 11 stream selection, career roadmaps, and special guidance.',
    icon: 'User',
    duration: '20 Mins',
  },
  {
    id: 'nursery-interaction',
    title: '🧸 Pre-School / Nursery Welcome Session',
    desc: 'Child-friendly informal interaction and activity zone orientation for early learners.',
    icon: 'Sparkles',
    duration: '25 Mins',
  },
  {
    id: 'fee-transport',
    title: '🚌 Bus Transport & Accounts Desk',
    desc: 'Detailed discussion regarding bus routes, pickup points, and quarterly fee breakdown.',
    icon: 'Clock',
    duration: '15 Mins',
  },
];

const availableTimeSlots = [
  '09:00 AM – 09:30 AM',
  '10:15 AM – 10:45 AM',
  '11:30 AM – 12:00 PM',
  '01:00 PM – 01:30 PM',
  '02:30 PM – 03:00 PM',
  '03:30 PM – 04:00 PM',
];

export function BookVisitClient({ initialSchool }: { initialSchool: School }) {
  const { settings } = useSiteSettings(initialSchool);
  const [selectedAgenda, setSelectedAgenda] = useState(visitAgendas[0].id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(availableTimeSlots[1]);

  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('Class I');
  const [notes, setNotes] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Default to tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DPS-VISIT-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(newId);
    setBookingConfirmed(true);
  };

  const activeAgendaObj = visitAgendas.find((a) => a.id === selectedAgenda) || visitAgendas[0];

  return (
    <>
      <PageHeader
        eyebrow="Campus Experience"
        title="Book a School Visit & Meeting"
        subtitle="Schedule a personalized campus tour, Principal desk meeting, or admission counselling session"
        breadcrumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Book Campus Visit' }]}
      />

      <section className="py-16 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {!bookingConfirmed ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-wider font-bold mb-2">
                  <Sparkles size={13} className="text-amber-600" /> Easy 3-Step Appointment Portal
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                  Select Your Visit Schedule
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Visits are hosted Monday through Saturday between 9:00 AM and 4:00 PM at our Rohini Sector 3 campus.
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-8">
                {/* Step 1: Purpose of Visit */}
                <div>
                  <label className="block font-serif font-bold text-base text-navy-950 mb-3">
                    1. Choose Purpose of Visit:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {visitAgendas.map((agenda) => {
                      const isSelected = agenda.id === selectedAgenda;
                      return (
                        <div
                          key={agenda.id}
                          onClick={() => setSelectedAgenda(agenda.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400/40 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="font-serif font-bold text-sm text-navy-950">
                                {agenda.title}
                              </h4>
                              <span className="text-[10px] bg-white font-bold px-2 py-0.5 rounded-full text-slate-600 border border-slate-200">
                                {agenda.duration}
                              </span>
                            </div>
                            <p className="text-slate-600 text-xs leading-relaxed">{agenda.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date & Slot */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block font-serif font-bold text-sm text-navy-950 mb-2">
                      2. Preferred Visit Date:
                    </label>
                    <input
                      type="date"
                      required
                      min={minDateStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      * Campus visits are closed on Sundays & Delhi Gazetted holidays.
                    </span>
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-sm text-navy-950 mb-2">
                      Preferred Time Window:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((slot) => {
                        const isSelected = slot === selectedSlot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                              isSelected
                                ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 3: Contact & Student Details */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <label className="block font-serif font-bold text-base text-navy-950">
                    3. Parent & Student Information:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Parent / Guardian Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Mr. Sanjay Kapoor"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Mobile Number (for SMS & WhatsApp Confirmation) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98188 99001"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sanjay@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Student Name & Class Applying
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Aryan Kapoor (Class 6)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Specific Inquiries or Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Interested in Atal Tinkering Lab and skating coaching..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedDate}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-navy-950 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Calendar size={18} /> Confirm & Generate School Visit Pass
                </button>
              </form>
            </div>
          ) : (
            /* Step 4: Instant Confirmation Pass */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      Visit Scheduled Successfully
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-navy-950">
                      Official Campus Visit Pass
                    </h3>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-left sm:text-right">
                  <span className="text-[10px] text-amber-800 uppercase font-bold block">
                    Appointment Reference
                  </span>
                  <span className="font-mono font-bold text-base text-navy-950">{bookingId}</span>
                </div>
              </div>

              {/* Pass Details Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Date</span>
                  <span className="font-bold text-navy-950 text-sm">{selectedDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Time Slot</span>
                  <span className="font-bold text-amber-700">{selectedSlot}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Parent Name</span>
                  <span className="font-semibold text-navy-950">{parentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Student / Grade</span>
                  <span className="font-semibold text-navy-950">{studentName}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-200 text-xs text-amber-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <MapPin size={14} className="text-amber-700" />
                  Campus Address & Reporting Gate:
                </p>
                <p>
                  Decent Public School, Sector 3, Rohini, Delhi – 110085 (Opp. Jaipur Golden Hospital).
                  Please present this digital pass or SMS confirmation at Gate No. 1 Security Desk.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setBookingConfirmed(false);
                    setSelectedDate('');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-navy-950 transition-colors"
                >
                  ← Book Another Visit Slot
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs shadow transition-colors"
                  >
                    <Printer size={14} /> Print Visit Pass
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
