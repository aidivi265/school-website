'use client';

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
} from 'lucide-react';
import { SchoolCrest } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Notices & News', href: '/admin/notices', icon: Bell },
  { label: 'Events Calendar', href: '/admin/events', icon: Calendar },
  { label: 'Faculty Directory', href: '/admin/faculty', icon: Users },
  { label: 'Campus Facilities', href: '/admin/facilities', icon: GraduationCap },
  { label: 'Careers & Hiring', href: '/admin/careers', icon: Briefcase },
  { label: 'Photo Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
  { label: 'Documents & Circulars', href: '/admin/documents', icon: FileDown },
  { label: 'Admission Enquiries', href: '/admin/admissions', icon: UserCheck },
  { label: 'FAQs & Assistant', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Page Content CMS', href: '/admin/pages', icon: FileText },
  { label: 'School Settings', href: '/admin/settings', icon: Settings },
  { label: 'Data Migration', href: '/admin/migration', icon: ArrowLeftRight },
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
            <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Rohini, Delhi</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
              <span>{label}</span>
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
          className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-3 py-2 rounded-lg hover:bg-rose-950/40 transition-colors"
        >
          <LogOut size={14} /> Log Out
        </button>
      </div>
    </aside>
  );
}
