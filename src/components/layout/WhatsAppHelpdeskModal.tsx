'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Phone, ArrowRight, ShieldCheck, User, School } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntentOption {
  id: string;
  title: string;
  department: string;
  defaultMessage: string;
}

const intentOptions: IntentOption[] = [
  {
    id: 'admission',
    title: '🎓 Admissions Enquiry 2025–26',
    department: 'Admissions Desk',
    defaultMessage: 'Hello Decent Public School, I would like to enquire about admission guidelines, seat availability, and fee structure for the session 2025–26.',
  },
  {
    id: 'fee',
    title: '💳 Fee Desk & Payment Verification',
    department: 'Accounts Section',
    defaultMessage: 'Hello Decent Public School, I need assistance regarding quarterly fee deposit and payment receipt verification.',
  },
  {
    id: 'transport',
    title: '🚌 Bus Transport & Route Info',
    department: 'Transport Coordinator',
    defaultMessage: 'Hello Decent Public School, I would like to know the school bus routes, pickup points, and timings for my locality in Rohini / Delhi.',
  },
  {
    id: 'general',
    title: '🏛️ General Query & Principal Office',
    department: 'School Reception',
    defaultMessage: 'Hello Decent Public School, I have a general enquiry regarding school schedule, CBSE curriculum, and appointments.',
  },
];

export function WhatsAppHelpdeskModal({
  isOpen,
  onClose,
  schoolPhone = '+919818899001',
}: {
  isOpen: boolean;
  onClose: () => void;
  schoolPhone?: string;
}) {
  const [selectedIntentId, setSelectedIntentId] = useState(intentOptions[0].id);
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [customQuery, setCustomQuery] = useState('');

  if (!isOpen) return null;

  const activeIntent = intentOptions.find((i) => i.id === selectedIntentId) || intentOptions[0];

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = schoolPhone.replace(/[^0-9]/g, '');

    let finalMessage = activeIntent.defaultMessage;
    if (parentName) finalMessage += `\n\nParent Name: ${parentName}`;
    if (studentName) finalMessage += `\nStudent / Class: ${studentName}`;
    if (customQuery) finalMessage += `\nSpecific Query: ${customQuery}`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-3.5 h-3.5" /> Instant WhatsApp Helpdesk
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
              Chat with School Desk
            </h3>
          </div>
        </div>

        <form onSubmit={handleLaunchWhatsApp} className="space-y-4">
          {/* Select Department Intent */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-2">
              Select What You Need Help With:
            </label>
            <div className="space-y-2">
              {intentOptions.map((opt) => {
                const isSelected = opt.id === selectedIntentId;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSelectedIntentId(opt.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.title}</span>
                    <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {opt.department}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                Parent / Caller Name:
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Rajesh Malhotra"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                Student / Class Applying:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Class 6 / Pre-School"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
              Add Specific Note / Question (Optional):
            </label>
            <textarea
              rows={2}
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Type any specific question for the admissions or transport team..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Open WhatsApp & Send Message
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Official DPS Rohini WhatsApp desk · Mon–Sat 8:30 AM – 4:00 PM
          </div>
        </form>
      </motion.div>
    </div>
  );
}
