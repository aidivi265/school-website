'use client';

import React from 'react';
import { LucideIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionText,
  onAction,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionText?: string;
  onAction?: () => void;
}) {
  const label = actionLabel || actionText;

  return (
    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
          <Icon size={26} />
        </div>
      )}
      <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {label && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          <Plus size={16} /> {label}
        </Button>
      )}
    </div>
  );
}
