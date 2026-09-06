'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Trash2,
  Lock,
  Edit,
  UserPlus,
  Search,
  Key,
  AlertCircle,
  Sparkles,
  Clock,
  Check,
  X,
} from 'lucide-react';
import {
  AdminUser,
  MODULE_DEFINITIONS,
  useAdminStaffManager,
} from '@/lib/cms/adminAuthStore';
import { Button } from '@/components/ui';

export default function AdminStaffManagementPage() {
  const {
    users,
    isLoaded,
    approveUser,
    rejectUser,
    toggleUserStatus,
    updatePermissions,
    removeUser,
    addStaffDirectly,
  } = useAdminStaffManager();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Direct Add Staff States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('Staff@2025');
  const [newStaffDesignation, setNewStaffDesignation] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'staff' | 'super_admin'>('staff');
  const [newStaffModules, setNewStaffModules] = useState<string[]>(['notices', 'events', 'gallery']);
  const [notifyViaEmail, setNotifyViaEmail] = useState(true);
  const [copiedInfo, setCopiedInfo] = useState<string | null>(null);

  const pendingUsers = users.filter((u) => u.status === 'pending');
  const activeStaff = users
    .filter((u) => u.status !== 'pending' && u.status !== 'rejected')
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.designation.toLowerCase().includes(search.toLowerCase())
    );

  const showFeedback = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4500);
  };

  const generateRandomPassword = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setNewStaffPassword(`DPS#${randomNum}`);
  };

  const selectAllNewModules = () => {
    setNewStaffModules(MODULE_DEFINITIONS.map((m) => m.id));
  };

  const clearAllNewModules = () => {
    setNewStaffModules(['notices']);
  };

  const toggleNewModule = (modId: string) => {
    setNewStaffModules((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    );
  };

  const handleDirectAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffEmail.trim()) {
      alert('Please provide staff name and email address.');
      return;
    }

    const res = addStaffDirectly({
      name: newStaffName,
      email: newStaffEmail,
      password: newStaffPassword,
      designation: newStaffDesignation || 'Staff Faculty Member',
      role: newStaffRole,
      allowedModules: newStaffModules,
    });

    if (!res.success) {
      alert(res.message);
      return;
    }

    if (notifyViaEmail && res.user) {
      await sendApprovalEmail(res.user, newStaffModules);
    }

    // Success
    showFeedback(`✓ Staff "${newStaffName}" created! Password: ${newStaffPassword}`);
    setIsAddModalOpen(false);
    setActiveTab('active');

    // Reset Form
    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffDesignation('');
    setNewStaffPassword('Staff@2025');
    setNewStaffModules(['notices', 'events', 'gallery']);
  };

  const copyCredentials = (email: string, pass: string) => {
    const text = `Decent Public School Admin Portal Credentials:\nEmail: ${email}\nPassword: ${pass}\nLogin Link: ${window.location.origin}/admin/login`;
    navigator.clipboard.writeText(text);
    setCopiedInfo(`Credentials copied for ${email}!`);
    setTimeout(() => setCopiedInfo(null), 3000);
  };

  const sendApprovalEmail = async (user: AdminUser, modules: string[]) => {
    try {
      await fetch('/api/admin/staff/notify-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facultyName: user.name,
          facultyEmail: user.email,
          facultyDesignation: user.designation,
          assignedModules: modules,
          approvedBy: 'Principal Dr. Ananya Sharma',
        }),
      });
    } catch (e) {
      console.error('Email dispatch error:', e);
    }
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingUser(user);
    setSelectedModules(user.allowedModules || ['notices']);
  };

  const handleSavePermissions = () => {
    if (!editingUser) return;
    updatePermissions(editingUser.id, selectedModules);
    setEditingUser(null);
    showFeedback(`Permissions updated for ${editingUser.name}`);
  };

  const handleQuickApprove = async (user: AdminUser) => {
    approveUser(user.id, user.allowedModules);
    await sendApprovalEmail(user, user.allowedModules);
    showFeedback(`✓ Access Approved! Email notification sent to ${user.email}`);
  };

  const handleQuickReject = (user: AdminUser) => {
    rejectUser(user.id);
    showFeedback(`Rejected request for ${user.name}`);
  };

  const handleRemoveStaff = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove staff member "${name}" from the school admin portal?`)) {
      const success = removeUser(id);
      if (success) {
        showFeedback(`Removed staff member: ${name}`);
      }
    }
  };

  const toggleModuleSelection = (modId: string) => {
    setSelectedModules((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck size={14} className="text-amber-600" /> Super Admin Access Governance
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-navy-950">
            Staff Access & Role Governance
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Authorize teacher sign-ups or directly add faculty accounts by setting their email, password and permissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-shine-effect inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-md text-xs cursor-pointer transition-all active:scale-95"
          >
            <UserPlus size={15} /> + Add Staff Directly
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        </div>
      )}

      {copiedInfo && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
          <Check size={14} className="text-amber-600" />
          <span>{copiedInfo}</span>
        </div>
      )}

      {/* Navigation Tabs (Pending vs Active) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'active'
                ? 'bg-navy-950 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users size={14} />
            <span>Active Staff Directory</span>
            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.2 rounded-full">
              {activeStaff.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-navy-950 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock size={14} />
            <span>Pending Approvals Queue</span>
            {pendingUsers.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.2 rounded-full animate-pulse">
                {pendingUsers.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar for Active Staff */}
        {activeTab === 'active' && (
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty by name, email..."
              className="bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-64"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Pending Approvals Queue */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingUsers.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-2">
              <CheckCircle size={36} className="text-emerald-500 mx-auto mb-2" />
              <h3 className="font-serif font-bold text-lg text-slate-800">
                No Pending Staff Requests
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                All teacher and employee registration requests have been reviewed and authorized.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-3xl p-6 border border-amber-300 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-all"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                        Pending Principal Approval
                      </span>
                      <span className="text-xs text-slate-400">Requested on {user.createdAt}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-navy-950">
                      {user.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700">{user.designation}</p>
                    <p className="text-xs text-slate-500 font-mono">{user.email}</p>

                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Requested Management Modules:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {user.allowedModules.map((m) => {
                          const def = MODULE_DEFINITIONS.find((d) => d.id === m);
                          return (
                            <span
                              key={m}
                              className="text-[11px] bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded-md border border-slate-200"
                            >
                              {def?.label || m}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
                    <button
                      onClick={() => handleOpenEdit(user)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit size={13} /> Customize Modules
                    </button>

                    <button
                      onClick={() => handleQuickApprove(user)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle size={14} /> Approve Access
                    </button>

                    <button
                      onClick={() => handleQuickReject(user)}
                      className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Active Staff Directory */}
      {activeTab === 'active' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Staff Member & Designation</th>
                  <th className="p-4">Role & Status</th>
                  <th className="p-4">Authorized Modules</th>
                  <th className="p-4">Approved By</th>
                  <th className="p-4 text-right">Governance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeStaff.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* User Details */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{user.name}</p>
                        {user.isProtected && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                            <Lock size={10} /> Permanent Super Admin
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium">{user.designation}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{user.email}</p>
                    </td>

                    {/* Role & Status */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            user.role === 'super_admin'
                              ? 'bg-navy-950 text-amber-400'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {user.role === 'super_admin' ? 'Super Admin' : 'Staff Member'}
                        </span>
                        <div>
                          <span
                            className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              user.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Assigned Modules */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {user.allowedModules.includes('all') ? (
                          <span className="text-[10px] font-bold bg-amber-500/20 text-amber-950 px-2 py-0.5 rounded border border-amber-300">
                            ⭐ Full Access (All 13 Modules)
                          </span>
                        ) : (
                          user.allowedModules.map((m) => (
                            <span
                              key={m}
                              className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium border border-slate-200"
                            >
                              {m}
                            </span>
                          ))
                        )}
                      </div>
                    </td>

                    {/* Approved By */}
                    <td className="p-4 text-slate-500 text-xs">
                      <p>{user.approvedBy || 'Principal'}</p>
                      <p className="text-[10px] text-slate-400">{user.approvedAt || user.createdAt}</p>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      {user.isProtected ? (
                        <span className="text-[11px] font-semibold text-slate-400 italic">
                          Protected Account
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => copyCredentials(user.email, user.password || 'Teacher@2025')}
                            title="Copy Portal Login Credentials"
                            className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                          >
                            <Key size={14} />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(user)}
                            title="Edit Permissions"
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          >
                            <Edit size={14} />
                          </button>

                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            title={user.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              user.status === 'active'
                                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                            }`}
                          >
                            {user.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>

                          <button
                            onClick={() => handleRemoveStaff(user.id, user.name)}
                            title="Remove Staff Account"
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Permissions Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Access Control Management
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-950">
                  Edit Modules for {editingUser.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{editingUser.designation}</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Checkbox Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Authorized Management Modules:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto p-1">
                {MODULE_DEFINITIONS.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <label
                      key={mod.id}
                      className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-400'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{mod.label}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleModuleSelection(mod.id)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={handleSavePermissions}>
                Save Module Permissions
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-navy-950 flex items-center justify-center shadow font-bold">
                  <UserPlus size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    Direct Staff Provisioning
                  </span>
                  <h3 className="font-serif text-xl font-bold text-navy-950">
                    Add New Staff Member
                  </h3>
                  <p className="text-xs text-slate-500">
                    Set up faculty account details, login password/code and operational permissions directly.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleDirectAddStaff} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    placeholder="e.g. Dr. Kavita Mehra"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newStaffEmail}
                    onChange={(e) => setNewStaffEmail(e.target.value)}
                    placeholder="e.g. kavita.physics@decentpublicschool.edu.in"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Designation / Department
                  </label>
                  <input
                    type="text"
                    value={newStaffDesignation}
                    onChange={(e) => setNewStaffDesignation(e.target.value)}
                    placeholder="e.g. PGT Physics / Exam Incharge"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Password / Access Code */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-800">
                      Login Password / Access Code *
                    </label>
                    <button
                      type="button"
                      onClick={generateRandomPassword}
                      className="text-[10px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Key size={11} /> Generate Code
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={newStaffPassword}
                      onChange={(e) => setNewStaffPassword(e.target.value)}
                      placeholder="e.g. Staff@2025"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Module Permission Selection */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Assign Permitted Management Modules:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={selectAllNewModules}
                      className="text-[10px] font-bold text-navy-950 hover:underline cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={clearAllNewModules}
                      className="text-[10px] font-bold text-slate-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-200">
                  {MODULE_DEFINITIONS.map((mod) => {
                    const isChecked = newStaffModules.includes(mod.id);
                    return (
                      <label
                        key={mod.id}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate pr-2">{mod.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleNewModule(mod.id)}
                          className="rounded text-amber-600 focus:ring-amber-500 shrink-0"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Email Notification Option */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="notifyEmail"
                  checked={notifyViaEmail}
                  onChange={(e) => setNotifyViaEmail(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 shrink-0 cursor-pointer"
                />
                <label htmlFor="notifyEmail" className="text-xs text-slate-800 font-medium cursor-pointer">
                  Send welcome email notification with portal login details and assigned modules to faculty.
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine-effect px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-300 font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle size={14} className="text-emerald-400" />
                  Create Active Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
