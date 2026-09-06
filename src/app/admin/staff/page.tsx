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
  } = useAdminStaffManager();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('pending');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const pendingUsers = users.filter((u) => u.status === 'pending');
  const activeStaff = users.filter((u) => u.status !== 'pending' && u.status !== 'rejected');

  const showFeedback = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
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

  const handleQuickApprove = (user: AdminUser) => {
    approveUser(user.id, user.allowedModules);
    showFeedback(`Approved staff access for ${user.name}`);
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
            Authorize teacher sign-up requests, assign module permissions (Notices, Events, Admissions), and manage staff credentials.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500/10 border border-amber-300 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <Lock size={13} className="text-amber-700" /> Super Admin Exclusive
          </div>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Navigation Tabs (Pending vs Active) */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-navy-950 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock size={14} />
            <span>Pending Approvals Queue</span>
            {pendingUsers.length > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.2 rounded-full">
                {pendingUsers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'active'
                ? 'bg-navy-950 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users size={14} />
            <span>Active Staff Directory</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.2 rounded-full">
              {activeStaff.length}
            </span>
          </button>
        </div>
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
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
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
    </div>
  );
}
