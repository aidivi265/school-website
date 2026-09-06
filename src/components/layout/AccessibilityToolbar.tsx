'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, Type, Phone, Mail, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export function AccessibilityToolbar({
  schoolPhone = '+91 11 2794 8281',
  schoolEmail = 'info@decentpublicschoolrohini.edu.in',
  affiliationNo = '2730248',
}: {
  schoolPhone?: string;
  schoolEmail?: string;
  affiliationNo?: string;
}) {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0 = small, 1 = normal, 2 = large
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSizeLevel === 0) {
      root.style.fontSize = '92%';
    } else if (fontSizeLevel === 2) {
      root.style.fontSize = '108%';
    } else {
      root.style.fontSize = '100%';
    }
  }, [fontSizeLevel]);

  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [isHighContrast]);

  const handleToggleNarrate = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      window.speechSynthesis.cancel();
      const h1 = document.querySelector('h1')?.textContent || '';
      const textToSpeak = `Decent Public School Rohini portal. ${h1}. Welcome to our official website.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);
      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  return (
    <div className="bg-navy-950 text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 border-b border-amber-500/25 hidden lg:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Affiliation & Contact */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <GraduationCap size={13} className="text-amber-400" />
            <span>CBSE Affiliated No. {affiliationNo} · Sector 3, Rohini</span>
          </div>

          <span className="w-px h-3 bg-navy-800" />

          <a
            href={`tel:${schoolPhone}`}
            className="flex items-center gap-1 text-slate-300 hover:text-amber-300 transition-colors"
          >
            <Phone size={11} className="text-amber-400" />
            <span>{schoolPhone}</span>
          </a>

          <span className="w-px h-3 bg-navy-800" />

          <a
            href={`mailto:${schoolEmail}`}
            className="flex items-center gap-1 text-slate-300 hover:text-amber-300 transition-colors"
          >
            <Mail size={11} className="text-amber-400" />
            <span>{schoolEmail}</span>
          </a>
        </div>

        {/* Right: A11y Tools & Admin Link */}
        <div className="flex items-center gap-3">
          {/* Font Resizer */}
          <div className="flex items-center gap-1 bg-navy-900/90 px-2 py-0.5 rounded-md border border-navy-800">
            <span className="text-slate-400 text-[10px] mr-1 flex items-center gap-0.5">
              <Type size={10} /> Text:
            </span>
            <button
              onClick={() => setFontSizeLevel(0)}
              title="Decrease text size"
              className={`px-1.5 py-0.2 rounded font-bold text-[10px] transition-colors ${
                fontSizeLevel === 0 ? 'bg-amber-500 text-navy-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(1)}
              title="Default text size"
              className={`px-1.5 py-0.2 rounded font-bold text-[10px] transition-colors ${
                fontSizeLevel === 1 ? 'bg-amber-500 text-navy-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel(2)}
              title="Increase text size"
              className={`px-1.5 py-0.2 rounded font-bold text-[10px] transition-colors ${
                fontSizeLevel === 2 ? 'bg-amber-500 text-navy-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold transition-colors ${
              isHighContrast
                ? 'bg-amber-400 text-navy-950 border-amber-300 font-bold'
                : 'bg-navy-900 text-slate-300 border-navy-800 hover:text-white'
            }`}
            title="Toggle high contrast"
          >
            <Eye size={11} />
            <span>{isHighContrast ? 'Standard' : 'Contrast'}</span>
          </button>

          {/* Screen Reader Voice */}
          <button
            onClick={handleToggleNarrate}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold transition-colors ${
              isNarrating
                ? 'bg-emerald-500 text-white border-emerald-400 font-bold animate-pulse'
                : 'bg-navy-900 text-slate-300 border-navy-800 hover:text-white'
            }`}
            title="Read page aloud"
          >
            {isNarrating ? <VolumeX size={11} /> : <Volume2 size={11} />}
            <span>{isNarrating ? 'Stop' : 'Voice'}</span>
          </button>

          <span className="w-px h-3 bg-navy-800" />

          {/* Admin Link */}
          <Link
            href="/admin/login"
            className="text-[11px] font-bold text-amber-400 hover:text-white transition-colors flex items-center gap-1"
          >
            Admin Login 🔒 →
          </Link>
        </div>
      </div>
    </div>
  );
}
