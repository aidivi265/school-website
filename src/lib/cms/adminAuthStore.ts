'use client';

import { useState, useEffect } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  designation: string;
  role: 'super_admin' | 'staff';
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  allowedModules: string[]; // e.g. ['all'] or ['notices', 'events', 'gallery', 'achievements', 'admissions', 'faculty', 'facilities', 'documents', 'faqs', 'pages', 'settings', 'analytics']
  isProtected?: boolean; // Cannot be deleted or removed (Super Admin)
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export const MODULE_DEFINITIONS = [
  { id: 'notices', label: 'Notices & Circulars', desc: 'Publish student circulars, notices and announcements' },
  { id: 'events', label: 'Events & Calendar', desc: 'Manage academic calendar, PTM dates, and school festivals' },
  { id: 'admissions', label: 'Admissions Desk', desc: 'Review student enquiries, applications, and WhatsApp invites' },
  { id: 'faculty', label: 'Faculty Directory', desc: 'Update teaching staff biographies and departments' },
  { id: 'facilities', label: 'Campus Facilities & Labs', desc: 'Update science labs, robotics wing, and sports amenities' },
  { id: 'achievements', label: 'Toppers & Achievements', desc: 'Update CBSE board toppers (95%+ club) and Olympiad honors' },
  { id: 'gallery', label: 'Photo & Media Gallery', desc: 'Upload event albums and campus life photographs' },
  { id: 'documents', label: 'Mandatory CBSE Documents', desc: 'Upload affiliation documents, safety audits, and fee books' },
  { id: 'faqs', label: 'FAQs & AI Knowledgebase', desc: 'Update school helpdesk Q&A answers' },
  { id: 'careers', label: 'Careers & Job Postings', desc: 'Post teacher vacancies and review job applications' },
  { id: 'pages', label: 'Page Content CMS', desc: 'Edit hero text, principal desk, vision, and mission' },
  { id: 'settings', label: 'School Settings', desc: 'Modify school phone, email, address, and social links' },
  { id: 'analytics', label: 'Insights & Analytics', desc: 'View admission trends and visitor footfall analytics' },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-super-1',
    name: 'Dr. Ananya Sharma',
    email: 'principal@decentpublicschoolrohini.edu.in',
    password: 'Admin@2025',
    designation: 'Principal & Head of Institution (Super Admin)',
    role: 'super_admin',
    status: 'active',
    allowedModules: ['all'],
    isProtected: true,
    createdAt: '2025-01-01',
    approvedAt: '2025-01-01',
    approvedBy: 'Governing Body',
  },
  {
    id: 'usr-super-2',
    name: 'Master Admin',
    email: 'admin@decentpublicschoolrohini.edu.in',
    password: 'Admin@2025',
    designation: 'Chief Administrator & Systems Head',
    role: 'super_admin',
    status: 'active',
    allowedModules: ['all'],
    isProtected: true,
    createdAt: '2025-01-01',
    approvedAt: '2025-01-01',
    approvedBy: 'Principal',
  },
  {
    id: 'usr-staff-1',
    name: 'Priya Malhotra',
    email: 'priya.admissions@decentpublicschoolrohini.edu.in',
    password: 'Teacher@2025',
    designation: 'Senior Admission Coordinator',
    role: 'staff',
    status: 'active',
    allowedModules: ['admissions', 'events'],
    isProtected: false,
    createdAt: '2025-02-10',
    approvedAt: '2025-02-11',
    approvedBy: 'Dr. Ananya Sharma',
  },
  {
    id: 'usr-staff-2',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@decentpublicschoolrohini.edu.in',
    password: 'Teacher@2025',
    designation: 'PGT Computer Science & ATL Lead',
    role: 'staff',
    status: 'pending',
    allowedModules: ['notices', 'events', 'achievements'],
    isProtected: false,
    createdAt: '2025-03-01',
  },
  {
    id: 'usr-staff-3',
    name: 'Sunita Verma',
    email: 'sunita.verma@decentpublicschoolrohini.edu.in',
    password: 'Teacher@2025',
    designation: 'TGT Science & Eco Club Incharge',
    role: 'staff',
    status: 'pending',
    allowedModules: ['notices', 'gallery', 'facilities'],
    isProtected: false,
    createdAt: '2025-03-03',
  },
];

const USERS_STORAGE_KEY = 'dps_admin_users_db';
const CURRENT_SESSION_KEY = 'dps_admin_session';

export function getStoredAdminUsers(): AdminUser[] {
  if (typeof window === 'undefined') return INITIAL_ADMIN_USERS;
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_ADMIN_USERS));
      return INITIAL_ADMIN_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ADMIN_USERS;
  } catch {
    return INITIAL_ADMIN_USERS;
  }
}

export function saveStoredAdminUsers(users: AdminUser[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {}
}

export function getCurrentSessionUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session || !session.email) return null;

    const allUsers = getStoredAdminUsers();
    const found = allUsers.find((u) => u.email.toLowerCase() === session.email.toLowerCase());
    return found || session;
  } catch {
    return null;
  }
}

export function useAdminStaffManager() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = getStoredAdminUsers();
    setUsers(loaded);
    setIsLoaded(true);
  }, []);

  const updateUsersList = (newUsers: AdminUser[]) => {
    setUsers(newUsers);
    saveStoredAdminUsers(newUsers);
  };

  const approveUser = (id: string, assignedModules: string[]) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        return {
          ...u,
          status: 'active' as const,
          allowedModules: assignedModules.length > 0 ? assignedModules : ['notices'],
          approvedAt: new Date().toISOString().split('T')[0],
          approvedBy: 'Principal / Super Admin',
        };
      }
      return u;
    });
    updateUsersList(updated);
  };

  const rejectUser = (id: string) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        return { ...u, status: 'rejected' as const };
      }
      return u;
    });
    updateUsersList(updated);
  };

  const toggleUserStatus = (id: string) => {
    const updated = users.map((u) => {
      if (u.id === id && !u.isProtected) {
        const nextStatus = u.status === 'active' ? ('suspended' as const) : ('active' as const);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    updateUsersList(updated);
  };

  const updatePermissions = (id: string, modules: string[]) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        return { ...u, allowedModules: modules };
      }
      return u;
    });
    updateUsersList(updated);
  };

  const removeUser = (id: string) => {
    const target = users.find((u) => u.id === id);
    if (target?.isProtected) {
      alert('Super Admin account is permanently protected and cannot be deleted.');
      return false;
    }
    const updated = users.filter((u) => u.id !== id);
    updateUsersList(updated);
    return true;
  };

  const registerStaffRequest = (data: {
    name: string;
    email: string;
    password?: string;
    designation: string;
    requestedModules: string[];
  }) => {
    const existing = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUser: AdminUser = {
      id: `usr-staff-${Date.now()}`,
      name: data.name,
      email: data.email.trim().toLowerCase(),
      password: data.password || 'Teacher@2025',
      designation: data.designation,
      role: 'staff',
      status: 'pending',
      allowedModules: data.requestedModules.length > 0 ? data.requestedModules : ['notices', 'events'],
      isProtected: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newUser, ...users];
    updateUsersList(updated);
    return { success: true, message: 'Registration request submitted for Principal approval.' };
  };

  return {
    users,
    isLoaded,
    approveUser,
    rejectUser,
    toggleUserStatus,
    updatePermissions,
    removeUser,
    registerStaffRequest,
  };
}
