'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Menu, ExternalLink, ShieldAlert, Loader2, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { getCurrentSessionUser, AdminUser } from '@/lib/cms/adminAuthStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/signup';

  useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    try {
      const sessionStr = localStorage.getItem('dps_admin_session');
      if (sessionStr) {
        const parsed = JSON.parse(sessionStr);
        if (parsed && (parsed.email || parsed.role)) {
          setCurrentUser(parsed);
          setIsAuthenticated(true);
          setIsCheckingAuth(false);
          return;
        }
      }
    } catch {}

    // Not authenticated -> redirect to login
    setIsAuthenticated(false);
    setIsCheckingAuth(false);
    router.replace('/admin/login');
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
  }

  if (isCheckingAuth || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <p className="font-serif font-bold text-lg text-white">Verifying Admin Permissions...</p>
        <p className="text-xs text-slate-400 mt-1">Checking session credentials with school security gate</p>
      </div>
    );
  }

  const isSuperAdmin = !currentUser || currentUser.role === 'super_admin' || currentUser.allowedModules?.includes('all');

  const pathToModuleMap: Record<string, { moduleId: string; name: string; superAdminOnly?: boolean }> = {
    '/admin/staff': { moduleId: 'staff', name: 'Staff & Roles Governance', superAdminOnly: true },
    '/admin/analytics': { moduleId: 'analytics', name: 'Insights & Analytics' },
    '/admin/admissions': { moduleId: 'admissions', name: 'Admission Enquiries' },
    '/admin/pages': { moduleId: 'pages', name: 'Page Content CMS' },
    '/admin/notices': { moduleId: 'notices', name: 'Notices & News' },
    '/admin/events': { moduleId: 'events', name: 'Events Calendar' },
    '/admin/faculty': { moduleId: 'faculty', name: 'Faculty Directory' },
    '/admin/facilities': { moduleId: 'facilities', name: 'Campus Facilities' },
    '/admin/careers': { moduleId: 'careers', name: 'Careers & Hiring' },
    '/admin/gallery': { moduleId: 'gallery', name: 'Photo Gallery' },
    '/admin/achievements': { moduleId: 'achievements', name: 'Achievements' },
    '/admin/documents': { moduleId: 'documents', name: 'Documents & Circulars' },
    '/admin/faqs': { moduleId: 'faqs', name: 'FAQs & Assistant' },
    '/admin/settings': { moduleId: 'settings', name: 'School Settings' },
    '/admin/migration': { moduleId: 'migration', name: 'Data Migration', superAdminOnly: true },
  };

  const currentModuleInfo = pathToModuleMap[pathname];
  const isAuthorized =
    !currentModuleInfo ||
    isSuperAdmin ||
    (!currentModuleInfo.superAdminOnly && currentUser?.allowedModules?.includes(currentModuleInfo.moduleId));

  // Route Permission Restriction Screen
  if (!isAuthorized) {
    const userAllowed = currentUser?.allowedModules || [];
    return (
      <div className="min-h-screen bg-slate-100 flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <main className="flex-1 p-6 sm:p-12 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl max-w-lg text-center space-y-5">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-200">
                <Lock size={32} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full">
                  Permission Required
                </span>
                <h2 className="font-serif font-bold text-2xl text-slate-900 mt-2">
                  Access Restricted to {currentModuleInfo.name}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {currentModuleInfo.superAdminOnly
                    ? 'This section is strictly reserved for the Principal / Super Administrator.'
                    : `Your staff account (${currentUser?.email}) has not been granted permission to access the "${currentModuleInfo.name}" module.`}
                </p>
              </div>

              {userAllowed.length > 0 && !userAllowed.includes('all') && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Authorized Modules:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {userAllowed.map((mod) => (
                      <Link
                        key={mod}
                        href={`/admin/${mod}`}
                        className="text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:border-amber-500 hover:text-amber-700 px-2.5 py-1 rounded-lg shadow-sm transition-colors capitalize"
                      >
                        → {mod}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/admin"
                  className="w-full sm:w-auto px-5 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  ← Return to Staff Dashboard
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Dashboard Header */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-tight">
                Decent Public School CMS
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Sector 3, Rohini, Delhi · Administrator Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors font-semibold"
            >
              <ExternalLink size={13} /> View Live Website
            </Link>

            {/* Current Logged in Staff Badge */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm uppercase">
                {currentUser?.name ? currentUser.name.charAt(0) : 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {isSuperAdmin ? '👑 Principal / Super Admin' : currentUser?.designation || 'Staff Member'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
