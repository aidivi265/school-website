'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Menu, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // If on /admin/login, don't show the dashboard shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Simple client auth check
    if (!isLoginPage) {
      const session = localStorage.getItem('dps_admin_session');
      // If no session and in browser, default to demo session for ease of preview
      if (!session) {
        localStorage.setItem(
          'dps_admin_session',
          JSON.stringify({ email: 'admin@decentpublicschoolrohini.edu.in', role: 'admin' })
        );
      }
    }
  }, [pathname, isLoginPage]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
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
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
                A
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Administrator</p>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Authorized
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
