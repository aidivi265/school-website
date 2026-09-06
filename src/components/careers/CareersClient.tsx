'use client';

import React, { useState } from 'react';
import { useCareers, useJobApplications } from '@/lib/cms/useCMS';
import { JobOpening } from '@/types';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Send,
  X,
  Building,
  Clock,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CareersClient({ initialJobs }: { initialJobs?: JobOpening[] }) {
  const { jobs } = useCareers(initialJobs);
  const { addJobApplication } = useJobApplications();

  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [applyingJob, setApplyingJob] = useState<JobOpening | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Application form state
  const [formData, setFormData] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    qualification: '',
    experience_years: '',
    current_organization: '',
    portfolio_url: '',
    resume_notes: '',
  });

  const activeJobs = jobs.filter((j) => j.is_active !== false);

  const filteredJobs = activeJobs.filter((job) => {
    if (selectedDept === 'all') return true;
    return job.department.toLowerCase().includes(selectedDept.toLowerCase());
  });

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    addJobApplication({
      job_id: applyingJob.id,
      job_title: applyingJob.title,
      applicant_name: formData.applicant_name,
      email: formData.email,
      phone: formData.phone,
      qualification: formData.qualification,
      experience_years: formData.experience_years,
      current_organization: formData.current_organization,
      portfolio_url: formData.portfolio_url,
      resume_notes: formData.resume_notes,
      status: 'Pending',
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setApplyingJob(null);
      setFormData({
        applicant_name: '',
        email: '',
        phone: '',
        qualification: '',
        experience_years: '',
        current_organization: '',
        portfolio_url: '',
        resume_notes: '',
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            Join Our Faculty
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight mb-3">
            Careers & Faculty <span className="text-amber-600">Recruitment</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Shape the minds of tomorrow. Decent Public School invites passionate, progressive educators, STEM trainers, and administrative staff to join our vibrant learning family.
          </p>
        </div>

        {/* Why Teach at DPS Callout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: 'Academic Freedom', desc: 'Modern smart classrooms & STEM maker labs supporting innovative experiential teaching.' },
            { title: 'Competitive Remuneration', desc: '7th Pay Commission scale, Provident Fund (PF), Gratuity & annual performance bonuses.' },
            { title: 'Professional Growth', desc: 'Regular CBSE pedagogical workshops, leadership seminars & faculty research support.' },
            { title: 'Nurturing Culture', desc: 'Collaborative staff council, employee healthcare support & bus transport facility.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-amber-600 mb-3" />
              <h3 className="font-serif font-bold text-navy-950 text-base mb-1">{item.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Department Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'all', label: 'All Openings' },
            { id: 'Senior', label: 'Senior Wing (PGT)' },
            { id: 'Middle', label: 'Middle Wing (TGT)' },
            { id: 'Primary', label: 'Primary Wing (PRT)' },
            { id: 'STEM', label: 'STEM & Robotics' },
            { id: 'Sports', label: 'Sports & Fitness' },
          ].map((dept) => {
            const isSelected = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-navy-950 border-navy-950 text-amber-400 shadow-md scale-105'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-6 mb-16">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="font-serif font-bold text-navy-950 text-lg">No Vacancies in This Category</p>
              <p className="text-xs text-slate-500 mt-1">
                You can still submit your general CV to{' '}
                <a href="mailto:careers@decentpublicschoolrohini.edu.in" className="text-amber-600 font-bold underline">
                  careers@decentpublicschoolrohini.edu.in
                </a>
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {job.employment_type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {job.openings_count} Openings
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-navy-950 text-xl sm:text-2xl leading-snug">
                    {job.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {job.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <GraduationCap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Qualifications:</strong> {job.qualifications}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Experience:</strong> {job.experience_required}</span>
                    </div>
                  </div>

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Requirements:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:border-l lg:border-slate-200 lg:pl-8 flex flex-col sm:flex-row lg:flex-col justify-between items-start sm:items-center lg:items-end gap-4 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Application Deadline</span>
                    <span className="text-xs font-bold text-navy-950 font-mono">{job.deadline}</span>
                  </div>

                  <button
                    onClick={() => setApplyingJob(job)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    Apply for Position <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Application Modal */}
        <AnimatePresence>
          {applyingJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative my-8"
              >
                <button
                  onClick={() => setApplyingJob(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-navy-950 text-2xl">Application Submitted!</h3>
                    <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
                      Thank you for applying for <strong>{applyingJob.title}</strong>. Our academic recruitment committee will review your profile and contact you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                        Application Form
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-navy-950">
                        {applyingJob.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-0.5">{applyingJob.department}</p>
                    </div>

                    <form onSubmit={handleSubmitApplication} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.applicant_name}
                          onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                          placeholder="e.g. Dr. Vivek Saxena"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="vivek@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                            Highest Qualification *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.qualification}
                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                            placeholder="e.g. M.Sc (Physics) + B.Ed"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                            Total Experience *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.experience_years}
                            onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                            placeholder="e.g. 5 Years in CBSE School"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                            Current School / Employer
                          </label>
                          <input
                            type="text"
                            value={formData.current_organization}
                            onChange={(e) => setFormData({ ...formData, current_organization: e.target.value })}
                            placeholder="Current school or institute"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                            LinkedIn / Portfolio Link
                          </label>
                          <input
                            type="url"
                            value={formData.portfolio_url}
                            onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                            placeholder="https://linkedin.com/in/..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                          Brief Statement of Purpose / Key Achievements
                        </label>
                        <textarea
                          rows={3}
                          value={formData.resume_notes}
                          onChange={(e) => setFormData({ ...formData, resume_notes: e.target.value })}
                          placeholder="Highlight your pedagogical strengths, subjects taught, board results, and why you wish to join DPS Rohini..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 px-4 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4 text-amber-400" />
                          Submit Application to Admissions Committee
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
