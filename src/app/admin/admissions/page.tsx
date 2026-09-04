'use client';

import { useState } from 'react';
import { useEnquiries } from '@/lib/cms/useCMS';
import { AdmissionEnquiry } from '@/types';
import { Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import EmptyState from '@/components/admin/EmptyState';
import {
  Search,
  Phone,
  Mail,
  Download,
  Trash2,
  X,
} from 'lucide-react';

export default function AdminAdmissionsPage() {
  const { enquiries, setEnquiries, updateEnquiryStatus, deleteEnquiry } = useEnquiries();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Delete Confirm Dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
  }>({
    isOpen: false,
    id: '',
    name: '',
  });

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const updateStatus = (id: string, newStatus: AdmissionEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: `Status updated to "${newStatus}"`,
    });
  };

  const handleOpenDetails = (enq: AdmissionEnquiry) => {
    setSelectedEnquiry(enq);
    setEditingNotes(enq.admin_notes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedEnquiry) return;
    setEnquiries((prev) =>
      prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, admin_notes: editingNotes } : e))
    );
    setSelectedEnquiry({ ...selectedEnquiry, admin_notes: editingNotes });
    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: 'Admin notes saved successfully!',
    });
  };

  const triggerDelete = (id: string, name: string) => {
    setDeleteDialog({
      isOpen: true,
      id,
      name,
    });
  };

  const confirmDelete = () => {
    setEnquiries(enquiries.filter((e) => e.id !== deleteDialog.id));
    if (selectedEnquiry?.id === deleteDialog.id) {
      setSelectedEnquiry(null);
    }
    setToast({ id: Date.now().toString(), type: 'info', text: 'Enquiry record removed.' });
    setDeleteDialog({ isOpen: false, id: '', name: '' });
  };

  const exportCSV = () => {
    const headers = ['ID', 'Student Name', 'Parent Name', 'Class', 'Phone', 'Email', 'Status', 'Date'];
    const rows = enquiries.map((e) => [
      e.id,
      `"${e.student_name}"`,
      `"${e.parent_name}"`,
      `"${e.class_applying}"`,
      e.phone,
      e.email || '',
      e.status,
      e.created_at || '',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DPS_Admissions_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: 'Exported enquiries to CSV file!',
    });
  };

  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSearch =
      e.student_name.toLowerCase().includes(search.toLowerCase()) ||
      e.parent_name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.class_applying.toLowerCase().includes(search.toLowerCase()) ||
      (e.id && e.id.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: AdmissionEnquiry['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Under Review':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Admitted':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Admission Enquiries Manager</h2>
          <p className="text-xs text-slate-500">
            Track online registrations, follow up with prospective parents, and update admission status
          </p>
        </div>
        <Button onClick={exportCSV} variant="outline" size="md">
          <Download size={16} /> Export to CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Pending', 'Contacted', 'Under Review', 'Admitted', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-navy-950 text-amber-300 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
              <span className="ml-1.5 text-[10px] opacity-75">
                ({st === 'All' ? enquiries.length : enquiries.filter((e) => e.status === st).length})
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, parent, phone..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Enquiries Found"
          description="No admission requests match the selected status or keyword."
          actionLabel="Clear Filter"
          onAction={() => {
            setStatusFilter('All');
            setSearch('');
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Applicant ID & Student</th>
                  <th className="p-4">Applying For</th>
                  <th className="p-4">Parent Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Registered Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <span className="text-[10px] font-mono text-slate-400 block">{enq.id}</span>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">{enq.student_name}</p>
                    </td>
                    <td className="p-4 font-bold text-navy-950">{enq.class_applying}</td>
                    <td className="p-4">
                      <p className="font-medium text-slate-800">{enq.parent_name}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-slate-500 text-[11px]">
                        <a href={`tel:${enq.phone}`} className="hover:text-amber-700 flex items-center gap-1 font-semibold">
                          <Phone size={11} /> {enq.phone}
                        </a>
                      </div>
                    </td>
                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border focus:outline-none transition-colors ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Admitted">Admitted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(enq.created_at || '2025-06-15')}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => handleOpenDetails(enq)}
                        className="px-3 py-1.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-300 font-bold text-[11px] transition-colors shadow-sm"
                      >
                        View & Notes
                      </button>
                      <button
                        onClick={() => triggerDelete(enq.id, enq.student_name)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAILS & COUNSELING NOTES MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block font-mono">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {selectedEnquiry.student_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div>
                  <span className="text-slate-400 text-[11px] block">Parent / Guardian</span>
                  <strong className="text-slate-900">{selectedEnquiry.parent_name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Class Applying For</span>
                  <strong className="text-amber-700 font-bold">{selectedEnquiry.class_applying}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Date of Birth</span>
                  <strong className="text-slate-900">{selectedEnquiry.date_of_birth || 'Not Specified'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Submission Date</span>
                  <strong className="text-slate-900">{formatDate(selectedEnquiry.created_at || '2025-06-15')}</strong>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-colors"
                >
                  <Phone size={14} /> Call: {selectedEnquiry.phone}
                </a>
                {selectedEnquiry.email && (
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center gap-2 border border-blue-200 transition-colors"
                  >
                    <Mail size={14} /> Send Email
                  </a>
                )}
              </div>

              {selectedEnquiry.address && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 text-[11px] block mb-0.5">Residential Address</span>
                  <p className="text-slate-800">{selectedEnquiry.address}</p>
                </div>
              )}

              {selectedEnquiry.message && (
                <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <span className="text-amber-900 text-[11px] font-bold block mb-0.5">
                    Parent Query / Message
                  </span>
                  <p className="text-slate-800">{selectedEnquiry.message}</p>
                </div>
              )}

              {/* Counseling / Staff Notes */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Internal Staff Notes & Counseling History
                </label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record interaction details, entrance exam date, fee concessions, or document checklist..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 text-slate-900"
                />
                <div className="flex justify-end">
                  <Button type="button" variant="outline" size="sm" onClick={handleSaveNotes}>
                    Save Notes
                  </Button>
                </div>
              </div>

              {/* Status Update bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value as any)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${getStatusBadge(
                      selectedEnquiry.status
                    )}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <Button variant="primary" size="sm" onClick={() => setSelectedEnquiry(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Enquiry Record"
        message={`Are you sure you want to remove the registration record for "${deleteDialog.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, id: '', name: '' })}
      />

      {/* TOAST FEEDBACK */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
