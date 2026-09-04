'use client';

import { useState } from 'react';
import { AdmissionEnquiry } from '@/types';
import { Button, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Search, Phone, Mail, Calendar, MapPin, UserCheck, MessageSquare, Download, Filter } from 'lucide-react';

const INITIAL_ENQUIRIES: AdmissionEnquiry[] = [
  {
    id: 'enq-101',
    parent_name: 'Sunil Malhotra',
    student_name: 'Aarav Malhotra',
    class_applying: 'Pre-School (Nursery)',
    phone: '+91 98112 34567',
    email: 'sunil.malhotra@gmail.com',
    date_of_birth: '2021-08-14',
    address: 'Sector 3, Rohini, Delhi',
    message: 'Interested in AC school bus facility from Sector 3 pocket B.',
    status: 'Pending',
    created_at: '2025-06-16T09:30:00Z',
  },
  {
    id: 'enq-102',
    parent_name: 'Meera Chawla',
    student_name: 'Kavya Chawla',
    class_applying: 'Class XI (Science - PCM)',
    phone: '+91 98711 22334',
    email: 'meera.chawla@yahoo.com',
    date_of_birth: '2009-04-10',
    address: 'Prashant Vihar, Rohini',
    message: 'Scored 94% in Class X CBSE. Looking for PCM with Computer Science.',
    status: 'Contacted',
    admin_notes: 'Spoke with mother. Scheduled interaction for Saturday 11 AM.',
    created_at: '2025-06-15T14:20:00Z',
  },
  {
    id: 'enq-103',
    parent_name: 'Vikram Batra',
    student_name: 'Rohan Batra',
    class_applying: 'Class I',
    phone: '+91 99100 88776',
    email: 'vikram.batra@outlook.com',
    date_of_birth: '2019-11-22',
    address: 'Pitampura, Delhi',
    message: 'Transfer admission from Mumbai school. Transfer Certificate ready.',
    status: 'Under Review',
    created_at: '2025-06-14T11:15:00Z',
  },
  {
    id: 'enq-104',
    parent_name: 'Pooja Aggarwal',
    student_name: 'Dev Aggarwal',
    class_applying: 'Class VI',
    phone: '+91 98101 44556',
    email: 'pooja.agg@gmail.com',
    date_of_birth: '2014-02-18',
    address: 'Sector 9, Rohini',
    message: 'Interested in sports facilities, specially football coaching.',
    status: 'Admitted',
    admin_notes: 'Admission fee deposited. Enrolment ID: DPS-2025-482.',
    created_at: '2025-06-12T16:45:00Z',
  },
];

export default function AdminAdmissionsPage() {
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>(INITIAL_ENQUIRIES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);

  const updateStatus = (id: string, newStatus: AdmissionEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSearch =
      e.student_name.toLowerCase().includes(search.toLowerCase()) ||
      e.parent_name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.class_applying.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Admission Enquiries Manager</h2>
          <p className="text-xs text-slate-500">Track and manage online admission registrations and counseling status</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'Pending', 'Contacted', 'Under Review', 'Admitted', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-navy-950 text-amber-300 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, parent, phone..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Student & Parent</th>
                <th className="p-4">Class Applying</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{enq.student_name}</p>
                    <p className="text-[11px] text-slate-500">Parent: {enq.parent_name}</p>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{enq.class_applying}</td>
                  <td className="p-4">
                    <p className="text-slate-800 font-medium">{enq.phone}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{enq.email}</p>
                  </td>
                  <td className="p-4">
                    <select
                      value={enq.status}
                      onChange={(e) => updateStatus(enq.id, e.target.value as any)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-200 focus:outline-none ${
                        enq.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : enq.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : enq.status === 'Admitted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : enq.status === 'Under Review'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
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
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedEnquiry(enq)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {selectedEnquiry.student_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-slate-400 text-[11px] block">Parent Name</span>
                  <strong className="text-slate-900">{selectedEnquiry.parent_name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Applying For</span>
                  <strong className="text-slate-900">{selectedEnquiry.class_applying}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-amber-700 font-bold hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Email</span>
                  <strong className="text-slate-900">{selectedEnquiry.email || 'N/A'}</strong>
                </div>
              </div>

              {selectedEnquiry.address && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[11px] block mb-0.5">Address</span>
                  <p>{selectedEnquiry.address}</p>
                </div>
              )}

              {selectedEnquiry.message && (
                <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                  <span className="text-amber-800 text-[11px] font-bold block mb-0.5">Parent Comments</span>
                  <p>{selectedEnquiry.message}</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Update Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value as any)}
                    className="text-xs font-bold px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <Button variant="outline" size="sm" onClick={() => setSelectedEnquiry(null)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
