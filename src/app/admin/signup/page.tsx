'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SchoolCrest, Button } from '@/components/ui';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { MODULE_DEFINITIONS, useAdminStaffManager } from '@/lib/cms/adminAuthStore';
import { motion } from 'framer-motion';

export default function AdminStaffSignupPage() {
  const router = useRouter();
  const { registerStaffRequest } = useAdminStaffManager();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('PGT Subject Teacher');
  const [selectedModules, setSelectedModules] = useState<string[]>(['notices', 'events']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes('@')) {
      setError('Please enter a valid school/official email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const res = registerStaffRequest({
      name,
      email,
      password,
      designation,
      requestedModules: selectedModules,
    });

    if (res.success) {
      setIsSubmitted(true);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-navy-950 to-slate-900 py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Crest & Title */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <SchoolCrest size={54} />
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Decent Public School
          </h1>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest mt-1">
            Teacher & Staff Access Portal · Registration Request
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
          {!isSubmitted ? (
            <>
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-xl text-slate-900">
                    Request Staff Portal Access
                  </h2>
                  <p className="text-xs text-slate-500">
                    Account requests require Principal / Super Admin authorization
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 mb-5">
                  <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Staff Member Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Email & Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Official Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@decentpublicschoolrohini.edu.in"
                        className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Create Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Designation & Department *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      required
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. PGT Computer Science / Admission Coordinator / PRT Head"
                      className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Module Request Checkboxes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Select Management Modules You Need Access To:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50">
                    {MODULE_DEFINITIONS.slice(0, 8).map((mod) => {
                      const isChecked = selectedModules.includes(mod.id);
                      return (
                        <label
                          key={mod.id}
                          className={`p-2.5 rounded-lg border text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleModule(mod.id)}
                            className="rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>{mod.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Submit Access Request for Approval <ArrowRight size={16} />
                  </Button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                  Already have an approved staff account?{' '}
                  <Link href="/admin/login" className="text-amber-600 font-bold hover:underline">
                    Sign In here
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Clock size={34} />
              </div>
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                Access Request Pending Approval
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. Your staff registration request has been submitted to <strong>Principal Dr. Ananya Sharma / Super Admin</strong>.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 text-left space-y-1.5 max-w-sm mx-auto">
                <p><strong>Registered Email:</strong> {email}</p>
                <p><strong>Designation:</strong> {designation}</p>
                <p><strong>Status:</strong> <span className="font-bold text-amber-700">Pending Review</span></p>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/admin/login"
                  className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs rounded-xl transition-colors shadow"
                >
                  Return to Admin Sign In
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
