'use client';

import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  Clock,
  Calendar,
  User,
  FileText,
  Printer,
  Download,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationRecord {
  refId: string;
  mobile: string;
  studentName: string;
  parentName: string;
  classApplying: string;
  submissionDate: string;
  currentStep: number; // 1 to 4
  status: string;
  interactionSlot?: string;
  remarks: string;
}

const mockApplications: ApplicationRecord[] = [
  {
    refId: 'DPS-2025-0842',
    mobile: '9818899001',
    studentName: 'Aarav Malhotra',
    parentName: 'Mr. Rajesh Malhotra',
    classApplying: 'Class XI (Science PCM)',
    submissionDate: '12 Feb 2025',
    currentStep: 3,
    status: 'Interaction Scheduled',
    interactionSlot: 'Saturday, 15 March 2025 at 10:30 AM (Room 104, Senior Wing)',
    remarks: 'Documents verified successfully. Both parents requested to accompany student with original Class X marksheet.',
  },
  {
    refId: 'DPS-2025-1021',
    mobile: '9876543210',
    studentName: 'Ananya Verma',
    parentName: 'Mrs. Meenakshi Verma',
    classApplying: 'Pre-School / Nursery',
    submissionDate: '20 Feb 2025',
    currentStep: 4,
    status: 'Provisional Admission Offered',
    remarks: 'Seat offered under General Category. Please deposit admission fee by 25 March 2025 to secure admission.',
  },
  {
    refId: 'DPS-2025-1155',
    mobile: '9911223344',
    studentName: 'Siddharth Mehra',
    parentName: 'Mr. Amitav Mehra',
    classApplying: 'Class VI',
    submissionDate: '01 March 2025',
    currentStep: 2,
    status: 'Document Scrutiny in Progress',
    remarks: 'Application under review with admissions committee. Previous school Transfer Certificate (TC) pending upload.',
  },
];

const steps = [
  { step: 1, title: 'Application Submitted', desc: 'Form & basic info received' },
  { step: 2, title: 'Document Scrutiny', desc: 'Eligibility & address verification' },
  { step: 3, title: 'Interaction / Assessment', desc: 'Parent-child campus session' },
  { step: 4, title: 'Provisional Seat Offered', desc: 'Offer letter & fee deposit' },
];

export function AdmissionTrackerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ApplicationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase().replace(/\s+/g, '');
    const found = mockApplications.find(
      (app) => app.refId === cleanQuery || app.mobile.includes(cleanQuery)
    );

    if (found) {
      setResult(found);
    } else if (cleanQuery.startsWith('DPS-')) {
      // Dynamic fallback for any custom entered DPS-ID
      setResult({
        refId: cleanQuery,
        mobile: '9876543210',
        studentName: 'Applicant Student',
        parentName: 'Applicant Parent',
        classApplying: 'Class I (Primary Wing)',
        submissionDate: 'Recently Submitted',
        currentStep: 2,
        status: 'Document Scrutiny in Progress',
        remarks: 'Your application is currently active and undergoing admissions verification.',
      });
    } else {
      setResult(null);
    }
    setHasSearched(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-wider font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Live Admissions Portal
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
            Track Admission Application
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Enter your Application Reference ID (e.g. <span className="font-mono font-bold text-amber-700">DPS-2025-0842</span>) or 10-digit registered mobile
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Application Ref (e.g. DPS-2025-0842) or Mobile Number"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-sm rounded-xl transition-colors shrink-0 shadow"
            >
              Check Status
            </button>
          </div>
        </form>

        {/* Result Area */}
        {hasSearched && (
          <div>
            {result ? (
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-6">
                {/* Basic Details Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4 border-b border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">App Reference</span>
                    <span className="font-mono font-bold text-navy-950 text-sm">{result.refId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                    <span className="font-bold text-navy-950">{result.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Class Applying</span>
                    <span className="font-semibold text-amber-700">{result.classApplying}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Status</span>
                    <span className="font-bold text-emerald-700">{result.status}</span>
                  </div>
                </div>

                {/* 4-Step Progress Visualizer */}
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Application Progression
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
                    {steps.map((s) => {
                      const isCompleted = s.step <= result.currentStep;
                      const isCurrent = s.step === result.currentStep;

                      return (
                        <div
                          key={s.step}
                          className={`p-3 rounded-xl border text-center relative transition-all ${
                            isCurrent
                              ? 'bg-amber-500/15 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-400/50'
                              : isCompleted
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-center mb-1.5">
                            {isCompleted ? (
                              <CheckCircle className={`w-4 h-4 ${isCurrent ? 'text-amber-600' : 'text-emerald-600'}`} />
                            ) : (
                              <Clock className="w-4 h-4 text-slate-300" />
                            )}
                          </div>
                          <div className="text-[11px] font-bold leading-tight">{s.title}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 hidden sm:block">{s.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Specific Details Box */}
                {result.interactionSlot && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" /> Scheduled Campus Interaction
                    </div>
                    <p className="text-xs font-semibold text-navy-950">{result.interactionSlot}</p>
                  </div>
                )}

                {/* Remarks */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-slate-700">Official Admissions Desk Note:</div>
                  <p className="text-slate-600 leading-relaxed">{result.remarks}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-slate-400">
                    Need assistance? Call Admissions Desk: 011-27948281
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Acknowledgment Slip
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center bg-red-50 border border-red-200 rounded-2xl text-red-800">
                <AlertCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
                <p className="text-sm font-bold">No Application Found</p>
                <p className="text-xs text-red-600 mt-1">
                  We couldn't find an application matching "{query}". Please verify your reference ID (e.g. DPS-2025-0842) or contact the admission office directly.
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
