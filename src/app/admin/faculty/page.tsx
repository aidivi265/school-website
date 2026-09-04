'use client';

import { useState } from 'react';
import { mockFaculty } from '@/lib/data/mockData';
import { FacultyMember } from '@/types';
import { Button, Badge } from '@/components/ui';
import { Plus, Edit2, Trash2, Search, X, Users, Award, Briefcase } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast, { ToastMessage } from '@/components/admin/Toast';
import ImageUploader from '@/components/admin/ImageUploader';
import EmptyState from '@/components/admin/EmptyState';

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<FacultyMember[]>(mockFaculty);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [editingTeacher, setEditingTeacher] = useState<FacultyMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: 'Science Department',
    subject: '',
    qualification: '',
    experience_years: '10+ Years',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
    bio: '',
    message: '',
    display_order: 1,
    is_published: true,
  });

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: String(Date.now()), type, text });
  };

  const handleOpenCreate = () => {
    setEditingTeacher(null);
    setForm({
      name: '',
      designation: '',
      department: 'Science Department',
      subject: '',
      qualification: '',
      experience_years: '10+ Years',
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
      bio: '',
      message: '',
      display_order: faculty.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: FacultyMember) => {
    setEditingTeacher(t);
    setForm({
      name: t.name,
      designation: t.designation,
      department: t.department || 'Science Department',
      subject: t.subject || '',
      qualification: t.qualification,
      experience_years: t.experience_years,
      photo_url: t.photo_url,
      bio: t.bio || '',
      message: t.message || '',
      display_order: t.sort_order || 1,
      is_published: t.is_published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      setFaculty((prev) =>
        prev.map((t) => (t.id === editingTeacher.id ? { ...t, ...form, sort_order: form.display_order } : t))
      );
      showToast('Faculty member profile updated.');
    } else {
      const newTeacher: FacultyMember = {
        id: 'f-' + Date.now(),
        ...form,
        sort_order: form.display_order,
      };
      setFaculty([...faculty, newTeacher]);
      showToast('New faculty member added to directory.');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      setFaculty(faculty.filter((t) => t.id !== deleteTargetId));
      setDeleteTargetId(null);
      showToast('Faculty record deleted.', 'info');
    }
  };

  const departments = ['All', 'Administration', 'Science Department', 'Mathematics Department', 'Commerce Department', 'IT & Robotics', 'Languages', 'Sports'];

  const filtered = faculty.filter((t) => {
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.designation.toLowerCase().includes(search.toLowerCase()) ||
      (t.subject && t.subject.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Toast message={toast} onClose={() => setToast(null)} />

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Remove Faculty Member"
        message="Are you sure you want to remove this teacher from the faculty directory? This action will remove their public profile from the website."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Manage Faculty Directory</h2>
          <p className="text-xs text-slate-500">Update teacher profiles, designations, qualifications, and photos</p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" size="md">
          <Plus size={16} /> Add Faculty Member
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDept === d
                  ? 'bg-slate-900 text-amber-300 shadow-sm font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search faculty by name, subject..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Teacher</th>
                  <th className="p-4">Designation</th>
                  <th className="p-4">Department / Subject</th>
                  <th className="p-4">Qualification</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={t.photo_url}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{t.name}</p>
                        <p className="text-[11px] text-slate-500">{t.department}</p>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-800">{t.designation}</td>
                    <td className="p-4 text-slate-600">{t.subject || t.department}</td>
                    <td className="p-4 text-slate-600">{t.qualification}</td>
                    <td className="p-4 text-slate-600">{t.experience_years}</td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                        title="Edit Profile"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(t.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Delete Faculty"
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
      ) : (
        <EmptyState
          title="No faculty members found"
          description="Try selecting a different department or add a new educator profile."
          actionText="Add Faculty"
          onAction={handleOpenCreate}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingTeacher ? 'Edit Faculty Member' : 'Add Faculty Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Dr. Ananya Sharma"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g. Head of Department – Science"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Department
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                  >
                    {['Administration', 'Science Department', 'Mathematics Department', 'Commerce Department', 'IT & Robotics', 'Languages', 'Sports', 'Arts & Music'].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject Taught
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Physics, Mathematics"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Qualification *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    placeholder="e.g. M.Sc. (Physics), B.Ed."
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={form.experience_years}
                    onChange={(e) => setForm({ ...form, experience_years: e.target.value })}
                    placeholder="e.g. 15+ Years"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                  />
                </div>
              </div>

              <ImageUploader
                bucket="faculty"
                value={form.photo_url}
                onChange={(url) => setForm({ ...form, photo_url: url })}
                label="Faculty Profile Photo"
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Bio / Background
                </label>
                <textarea
                  rows={2}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Teaching philosophy or background..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
