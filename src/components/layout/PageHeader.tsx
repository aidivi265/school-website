import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 overflow-hidden border-b-2 border-amber-500/30">
      {/* Background Image / Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-amber-300/80 mb-5 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home size={13} />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-navy-400" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Eyebrow */}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-amber-400" />
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">{eyebrow}</p>
            <span className="w-5 h-px bg-amber-400" />
          </div>
        )}

        {/* Title & Subtitle */}
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
