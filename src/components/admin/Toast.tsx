'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

export default function Toast({
  message,
  onClose,
}: {
  message: ToastMessage | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-950/95 border-emerald-500 text-emerald-100',
    error: 'bg-rose-950/95 border-rose-500 text-rose-100',
    info: 'bg-slate-900/95 border-amber-500 text-slate-100',
  };

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />,
    info: <Info size={18} className="text-amber-400 flex-shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md text-xs sm:text-sm font-medium ${
          bgStyles[message.type]
        }`}
      >
        {icons[message.type]}
        <span>{message.text}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors ml-2"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
