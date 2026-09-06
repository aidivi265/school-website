'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Users,
  Image as ImageIcon,
  Trophy,
  FileDown,
  UserCheck,
  HelpCircle,
  FileText,
  Settings,
  ArrowLeftRight,
  ExternalLink,
  LogOut,
  GraduationCap,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { SchoolCrest } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';
import { getCurrentSessionUser, AdminUser } from '@/lib/cms/adminAuthStore';

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: any;
  superAdminOnly?: boolean;
}

const allSidebarLinks: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { id: 'staff', label: 'Staff & Roles Governance', href: '/admin/staff', icon: ShieldCheck, superAdminOnly: true },
  { id: 'analytics', label: 'Insights & Analytics', href: '/admin/analytics', icon: TrendingUp },
  { id: 'admissions', label: 'Admission Enquiries', href: '/admin/admissions', icon: UserCheck },
  { id: 'pages', label: 'Page Content CMS', href: '/admin/pages', icon: FileText },
  { id: 'notices', label: 'Notices & News', href: '/admin/notices', icon: Bell },
  { id: 'events', label: 'Events Calendar', href: '/admin/events', icon: Calendar },
  { id: 'faculty', label: 'Faculty Directory', href: '/admin/faculty', icon: Users },
  { id: 'facilities', label: 'Campus Facilities', href: '/admin/facilities', icon: GraduationCap },
  { id: 'careers', label: 'Careers & Hiring', href: '/admin/careers', icon: Briefcase },
  { id: 'gallery', label: 'Photo Gallery', href: '/admin/gallery', icon: ImageIcon },
  { id: 'achievements', label: 'Achievements', href: '/admin/achievements', icon: Trophy },
  { id: 'documents', label: 'Documents & Circulars', href: '/admin/documents', icon: FileDown },
  { id: 'faqs', label: 'FAQs & Assistant', href: '/admin/faqs', icon: HelpCircle },
  { id: 'settings', label: 'School Settings', href: '/admin/settings', icon: Settings },
  { id: 'migration', label: 'Data Migration', href: '/admin/migration', icon: ArrowLeftRight },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const user = getCurrentSessionUser();
    setCurrentUser(user);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('dps_admin_session');
      router.push('/admin/login');
    } catch {
      localStorage.removeItem('dps_admin_session');
      router.push('/admin/login');
    }
  };

  const isSuperAdmin = !currentUser || currentUser.role === 'super_admin' || currentUser.allowedModules?.includes('all');
  const allowed = currentUser?.allowedModules || ['all'];

  const visibleLinks = allSidebarLinks.filter((item) => {
    if (item.id === 'dashboard') return true;
    if (item.superAdminOnly && !isSuperAdmin) return false;
    if (isSuperAdmin) return true;
    return allowed.includes(item.id);
  });

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SchoolCrest size={36} />
          <div>
            <p className="font-serif font-bold text-white text-sm leading-tight">DPS CMS Panel</p>
            <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              {isSuperAdmin ? '👑 Super Admin Desk' : 'Staff Access'}
            </p>
          </div>
        </div>
      </div>

      {/* Logged in User Pill */}
      {currentUser && (
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{currentUser.name || currentUser.email}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.designation || 'Administrator'}</p>
          </div>
          {isSuperAdmin ? (
            <span className="text-[9px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded border border-amber-500/40">
              Master
            </span>
          ) : (
            <span className="text-[9px] bg-blue-500/20 text-blue-400 font-bold px-1.5 py-0.5 rounded border border-blue-500/40">
              Staff
            </span>
          )}
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {visibleLinks.map(({ label, href, icon: Icon, superAdminOnly }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                <span>{label}</span>
              </div>
              {superAdminOnly && !isActive && (
                <Lock size={12} className="text-amber-400 opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Quick Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/60">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} /> View Public Website
          </span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-3 py-2 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <LogOut size={14} /> Log Out Session
        </button>
      </div>
    </aside>
  );
}
