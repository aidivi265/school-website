import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  children,
  variant = 'navy',
  className,
}: {
  children: React.ReactNode;
  variant?: 'navy' | 'amber' | 'gold' | 'green' | 'red' | 'purple' | 'gray';
  className?: string;
}) {
  const variantStyles = {
    navy: 'bg-navy-950 text-amber-300 border border-amber-400/30',
    amber: 'bg-amber-100 text-amber-900 border border-amber-300/60',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm',
    green: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    red: 'bg-rose-50 text-rose-800 border border-rose-200',
    purple: 'bg-purple-50 text-purple-800 border border-purple-200',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-12 sm:mb-16',
        center ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'inline-flex items-center gap-2 mb-3',
            center && 'justify-center'
          )}
        >
          <span className={cn('w-6 h-px', light ? 'bg-amber-400' : 'bg-amber-500')} />
          <p
            className={cn(
              'text-xs font-bold uppercase tracking-[0.22em]',
              light ? 'text-amber-400' : 'text-amber-600'
            )}
          >
            {eyebrow}
          </p>
          <span className={cn('w-6 h-px', light ? 'bg-amber-400' : 'bg-amber-500')} />
        </div>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-4',
          light ? 'text-white' : 'text-navy-950'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base sm:text-lg leading-relaxed font-normal',
            light ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(14,30,66,0.06)] overflow-hidden transition-all duration-300',
        hover && 'hover:shadow-xl hover:-translate-y-1 hover:border-amber-200/70',
        className
      )}
    >
      {children}
    </div>
  );
}

export function SchoolCrest({ size = 42, className }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        'rounded-xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 flex items-center justify-center shadow-md flex-shrink-0 border border-amber-500/40 relative overflow-hidden group',
        className
      )}
    >
      <div className="absolute inset-0 bg-amber-400/5 group-hover:bg-amber-400/15 transition-colors" />
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" className="relative z-10">
        <path
          d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
          stroke="#f59e0b"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
          stroke="#f59e0b"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6c0 0 1.5 1.5 1.5 3S12 11 12 11s-1.5-1-1.5-2S12 6 12 6z"
          fill="#fcd34d"
          stroke="#f59e0b"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500/40';

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20 active:scale-[0.98]',
    secondary:
      'bg-navy-950 hover:bg-navy-900 text-amber-300 border border-amber-500/30 shadow-md active:scale-[0.98]',
    outline:
      'border-2 border-slate-200 hover:border-navy-900 hover:bg-navy-900 hover:text-white text-navy-900 active:scale-[0.98]',
    ghost:
      'text-slate-700 hover:bg-slate-100 hover:text-navy-900',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-[0.98]',
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
