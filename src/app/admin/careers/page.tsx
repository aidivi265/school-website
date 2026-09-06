'use client';

import React, { useState } from 'react';
import { useCareers, useJobApplications } from '@/lib/cms/useCMS';
import { JobOpening, JobApplication } from '@/types';
import {
  Briefcase,
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Calendar,
  Search,
  Filter,
  ExternalLink,
  GraduationCap,
  Building,
  Mail,
  Phone,
  Eye,
  X,
  AlertCircle,
} from 'lucide-react';

export default function AdminCareersPage() {
  const { jobs, upsertJobOpening, deleteJobOpening } = useCareers();
  const { applications, updateJobApplicationStatus } = useJobApplications();

  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Job form state
  const [jobForm, setJobForm] = useState<Partial<JobOpening>>({
    title: '',
    department: 'Senior Wing (PGT)',
    employment_type: 'Full Time',
    experience_required: '2–4 Years',
    qualifications: '',
    openings_count: 1,
    salary_range: 'As per 7th Pay Commission / CBSE Norms',
    description: '',
    requirements: ['Strong subject conceptual clarity', 'Excellent English communication skills'],
    is_active: true,
    deadline: '2025-06-30',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddJob = () => {
    setEditingJob(null);
    setJobForm({
      title: '',
      department: 'Senior Wing (PGT)',
      employment_type: 'Full Time',
      experience_required: '2–4 Years',
      qualifications: '',
      openings_count: 1,
      salary_range: 'As per 7th Pay Commission / CBSE Norms',
      description: '',
      requirements: ['Strong subject conceptual clarity', 'Excellent English communication skills'],
      is_active: true,
      deadline: '2025-06-30',
    });
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job: JobOpening) => {
    setEditingJob(job);
    setJobForm(job);
    setIsJobModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobOpening = {
      id: editingJob ? editingJob.id : 'job-' + Date.now(),
      title: jobForm.title || 'Teaching Vacancy',
      department: jobForm.department as any,
      employment_type: jobForm.employment_type as any,
      experience_required: jobForm.experience_required || '2+ Years',
      qualifications: jobForm.qualifications || 'B.Ed / Master Degree',
      openings_count: Number(jobForm.openings_count) || 1,
      salary_range: jobForm.salary_range,
      description: jobForm.description || '',
      requirements: jobForm.requirements || [],
      is_active: jobForm.is_active ?? true,
      deadline: jobForm.deadline || '2025-06-30',
    };

    upsertJobOpening(newJob);
    showToast(editingJob ? 'Job opening updated successfully.' : 'New job vacancy posted successfully.');
    setIsJobModalOpen(false);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this job vacancy?')) {
      deleteJobOpening(id);
      showToast('Job opening deleted.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-950">
            Faculty Recruitment & Careers Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage active teaching vacancies, job descriptions, and review incoming candidate applications
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'jobs' && (
            <button
              onClick={handleOpenAddJob}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Post New Job Vacancy
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'jobs'
              ? 'border-amber-500 text-navy-950'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Active Job Openings ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'border-amber-500 text-navy-950'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Users className="w-4 h-4" />
          Received Applications ({applications.length})
        </button>
      </div>

      {/* ─── TAB 1: JOB VACANCIES ─────────────────────────────────────────── */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                    {job.department}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      job.is_active ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {job.is_active ? 'Active Vacancy' : 'Closed / Archived'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Deadline: {job.deadline}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-navy-950 text-lg">{job.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{job.description}</p>
                <div className="text-[11px] text-slate-500 flex items-center gap-3">
                  <span><strong>Exp:</strong> {job.experience_required}</span>
                  <span><strong>Seats:</strong> {job.openings_count}</span>
                  <span><strong>Scale:</strong> {job.salary_range}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <button
                  onClick={() => handleOpenEditJob(job)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Edit Vacancy"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Vacancy"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── TAB 2: RECEIVED APPLICATIONS ─────────────────────────────────── */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Applicant Name</th>
                  <th className="p-4">Position Applied</th>
                  <th className="p-4">Experience & Qual</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-navy-950">{app.applicant_name}</td>
                    <td className="p-4 font-medium text-slate-700">{app.job_title}</td>
                    <td className="p-4 text-slate-600">
                      <div>{app.qualification}</div>
                      <div className="text-[10px] text-slate-400">{app.experience_years}</div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div>{app.phone}</div>
                      <div className="text-[10px] text-slate-400">{app.email}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={app.status}
                        onChange={(e) => {
                          updateJobApplicationStatus(app.id, e.target.value as any);
                          showToast(`Status updated to ${e.target.value}`);
                        }}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                          app.status === 'Shortlisted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : app.status === 'Interview Scheduled'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : app.status === 'Rejected'
                            ? 'bg-red-50 text-red-800 border-red-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2 text-slate-600 hover:text-navy-950 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD / EDIT JOB ────────────────────────────────────────── */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative my-8">
            <button
              onClick={() => setIsJobModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-navy-950 mb-4">
              {editingJob ? 'Edit Job Opening' : 'Post New Teaching Vacancy'}
            </h3>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. PGT Physics (Senior Wing)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Department</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Senior Wing (PGT)">Senior Wing (PGT)</option>
                    <option value="Middle Wing (TGT)">Middle Wing (TGT)</option>
                    <option value="Primary Wing (PRT)">Primary Wing (PRT)</option>
                    <option value="Pre-Primary / NTT">Pre-Primary / NTT</option>
                    <option value="STEM & Robotics">STEM & Robotics</option>
                    <option value="Sports & Fitness">Sports & Fitness</option>
                    <option value="Administration & Lab">Administration & Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Openings Count</label>
                  <input
                    type="number"
                    min="1"
                    value={jobForm.openings_count}
                    onChange={(e) => setJobForm({ ...jobForm, openings_count: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={jobForm.qualifications}
                    onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
                    placeholder="M.Sc + B.Ed"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={jobForm.experience_required}
                    onChange={(e) => setJobForm({ ...jobForm, experience_required: e.target.value })}
                    placeholder="3–5 Years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Detailed role summary and expectations..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-navy-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jobForm.is_active}
                    onChange={(e) => setJobForm({ ...jobForm, is_active: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span>Active & Accepting Applications</span>
                </label>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs rounded-xl transition-colors shadow"
                >
                  Save Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: VIEW APPLICANT FULL PROFILE ───────────────────────────── */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative my-8">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Candidate Profile
              </span>
              <h3 className="font-serif text-2xl font-bold text-navy-950">{selectedApp.applicant_name}</h3>
              <p className="text-xs text-slate-500">{selectedApp.job_title}</p>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-semibold text-navy-950">{selectedApp.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold text-navy-950">{selectedApp.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Qualification:</span>
                <span className="font-semibold text-navy-950">{selectedApp.qualification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Experience:</span>
                <span className="font-semibold text-navy-950">{selectedApp.experience_years}</span>
              </div>
              {selectedApp.current_organization && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Employer:</span>
                  <span className="font-semibold text-navy-950">{selectedApp.current_organization}</span>
                </div>
              )}
              {selectedApp.portfolio_url && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Portfolio / LinkedIn:</span>
                  <a href={selectedApp.portfolio_url} target="_blank" rel="noreferrer" className="text-amber-600 font-bold underline">
                    Open Link ↗
                  </a>
                </div>
              )}
            </div>

            {selectedApp.resume_notes && (
              <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs mb-4">
                <span className="font-bold text-slate-700 block mb-1">Statement of Purpose / Notes:</span>
                <p className="text-slate-600 leading-relaxed">{selectedApp.resume_notes}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 bg-navy-950 text-white text-xs font-bold rounded-xl"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
