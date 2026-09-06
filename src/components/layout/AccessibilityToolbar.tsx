'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, Sun, Moon, Type, Sparkles } from 'lucide-react';

export function AccessibilityToolbar() {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0 = small, 1 = normal, 2 = large
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  useEffect(() => {
    // Apply font size class to html root
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
      // Read page header or main content summary
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
    <div className="bg-navy-950 text-slate-300 text-[11px] py-1 px-4 border-b border-navy-800/80 hidden sm:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-semibold tracking-wider uppercase text-[10px] flex items-center gap-1">
            <Sparkles size={11} /> CBSE School Code: 2730248 · Rohini Sector-3
          </span>
        </div>

        {/* A11y Tools */}
        <div className="flex items-center gap-4">
          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1 bg-navy-900 px-2 py-0.5 rounded-md border border-navy-800">
            <span className="text-slate-400 text-[10px] mr-1 flex items-center gap-0.5">
              <Type size={11} /> Text Size:
            </span>
            <button
              onClick={() => setFontSizeLevel(0)}
              title="Decrease Font Size"
              className={`px-1.5 py-0.2 rounded font-bold text-[10px] transition-colors ${
                fontSizeLevel === 0 ? 'bg-amber-500 text-navy-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(1)}
              title="Normal Font Size"
              className={`px-1.5 py-0.2 rounded font-bold text-[10px] transition-colors ${
                fontSizeLevel === 1 ? 'bg-amber-500 text-navy-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel(2)}
              title="Increase Font Size"
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
            title="Toggle High Contrast Mode"
          >
            <Eye size={11} />
            <span>{isHighContrast ? 'Standard View' : 'High Contrast'}</span>
          </button>

          {/* Screen Reader Narrator */}
          <button
            onClick={handleToggleNarrate}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold transition-colors ${
              isNarrating
                ? 'bg-emerald-500 text-white border-emerald-400 font-bold animate-pulse'
                : 'bg-navy-900 text-slate-300 border-navy-800 hover:text-white'
            }`}
            title="Read Page Aloud (Screen Reader Voice)"
          >
            {isNarrating ? <VolumeX size={11} /> : <Volume2 size={11} />}
            <span>{isNarrating ? 'Stop Voice' : 'Screen Reader'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
