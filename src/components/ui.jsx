// ── Premium UI primitives — Navy/Gold academic theme ──────────────────

export function SectionHeader({ eyebrow, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-3 ${center ? 'justify-center' : ''}`}>
          <span className="w-6 h-px bg-amber-500" />
          <p className={`text-amber-500 font-semibold text-xs uppercase tracking-[0.2em] ${light ? 'text-amber-400' : ''}`}>
            {eyebrow}
          </p>
          <span className="w-6 h-px bg-amber-500" />
        </div>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight ${light ? 'text-white' : 'text-navy-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-navy-200' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Badge({ children, variant = 'navy' }) {
  const variants = {
    navy:   'bg-navy-100 text-navy-800',
    gold:   'bg-amber-100 text-amber-800',
    green:  'bg-emerald-100 text-emerald-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    gray:   'bg-slate-100 text-slate-600',
    blue:   'bg-navy-100 text-navy-700',
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide ${variants[variant] || variants.navy}`}>
      {children}
    </span>
  );
}

export function PageHero({ title, subtitle, breadcrumb, bgImage }) {
  return (
    <div className="relative py-24 sm:py-32 px-4 overflow-hidden">
      {bgImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-900/80 to-navy-800/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      )}

      {/* Decorative gold line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        {breadcrumb && (
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-amber-400" />
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">{breadcrumb}</p>
            <span className="w-5 h-px bg-amber-400" />
          </div>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">{title}</h1>
        {subtitle && (
          <p className="text-navy-200 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_2px_12px_rgba(14,30,66,0.06)] ${
        hover ? 'card-lift cursor-default' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400" />
      <span className="w-2 h-2 rotate-45 bg-amber-400 flex-shrink-0" />
      <span className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400" />
    </div>
  );
}
