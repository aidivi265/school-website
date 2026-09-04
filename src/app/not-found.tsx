import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-serif font-bold text-3xl mb-6">
          404
        </div>
        <h1 className="text-2xl font-serif font-bold text-navy-950 mb-3">Page Not Found</h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-navy-950 to-navy-900 text-white font-semibold px-6 py-3 rounded-xl hover:from-navy-900 hover:to-navy-800 transition-all text-sm shadow-md"
          >
            <Home size={16} /> Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-all text-sm"
          >
            <ArrowLeft size={16} /> Contact Office
          </Link>
        </div>
      </div>
    </div>
  );
}
