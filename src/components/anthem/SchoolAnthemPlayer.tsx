'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Music, Sparkles, BookOpen, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LyricLine {
  id: number;
  timeSec: number;
  hindi: string;
  english: string;
}

const anthemLyrics: LyricLine[] = [
  {
    id: 1,
    timeSec: 0,
    hindi: 'ज्ञान का दीप जलाएं हम, नव प्रभात ले आएं हम।',
    english: 'We kindle the lamp of wisdom, ushering in a radiant dawn.',
  },
  {
    id: 2,
    timeSec: 8,
    hindi: 'डिसेंट पब्लिक स्कूल हमारा, विद्या का पावन धाम प्यारा।',
    english: 'Our beloved Decent Public School, a sacred sanctuary of learning.',
  },
  {
    id: 3,
    timeSec: 16,
    hindi: 'सत्य, निष्ठा, कर्म हमारा, लक्ष्य सदा हो सबसे न्यारा।',
    english: 'Truth, integrity and duty our guide; noble aspirations forever high.',
  },
  {
    id: 4,
    timeSec: 24,
    hindi: 'रोहिणी की इस पावन धरती पर, गूंजे यश का यह जयकारा।',
    english: 'Upon this sacred soil of Rohini, echoes our triumphant glory.',
  },
  {
    id: 5,
    timeSec: 32,
    hindi: 'देश का गौरव हम बढ़ाएंगे, नव युग का इतिहास बनाएंगे।',
    english: 'We shall elevate our nation’s pride, shaping history for a new era.',
  },
  {
    id: 6,
    timeSec: 40,
    hindi: 'जय जय जय डिसेंट विद्यालय, अमर रहे तेरा नाम सदा!',
    english: 'Hail, all hail Decent Public School, eternal be thy cherished name!',
  },
];

export function SchoolAnthemPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState(0);

  const duration = 48; // Total 48 seconds loop
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Play synthesized melody chime
  const playSynthesizedTone = (freq: number) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Audio context fallback
    }
  };

  const melodyFrequencies = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= duration) {
            return 0;
          }
          // Chime melody on lines
          if (next % 4 === 0) {
            const freq = melodyFrequencies[(next / 4) % melodyFrequencies.length];
            playSynthesizedTone(freq);
          }
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isMuted]);

  useEffect(() => {
    let currentIdx = 0;
    for (let i = 0; i < anthemLyrics.length; i++) {
      if (currentTime >= anthemLyrics[i].timeSec) {
        currentIdx = i;
      }
    }
    setActiveLineIdx(currentIdx);
  }, [currentTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAudio = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl overflow-hidden relative">
      {/* Background Decorative Notes */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Music size={180} />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-navy-950 flex items-center justify-center shadow-lg font-bold">
            <Music size={22} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
              <Sparkles size={13} /> Official School Song
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Decent Public School Anthem
            </h3>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={togglePlay}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? 'Pause Anthem' : 'Play Anthem'}</span>
          </button>

          <button
            onClick={resetAudio}
            title="Restart Anthem"
            className="p-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-300 border border-navy-700 transition-colors"
          >
            <RotateCcw size={15} />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-300 border border-navy-700 transition-colors"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Live Waveform & Timeline Progress */}
      <div className="py-6 space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{`00:${currentTime < 10 ? '0' + currentTime : currentTime}`}</span>
          {/* Animated Audio Equalizer Bars */}
          <div className="flex items-center gap-1 h-5">
            {[40, 75, 55, 90, 60, 80, 45, 95, 70, 50, 85, 65, 40].map((h, idx) => (
              <span
                key={idx}
                style={{
                  height: isPlaying ? `${h}%` : '20%',
                  transition: 'height 0.2s ease',
                }}
                className={`w-1 rounded-full ${
                  isPlaying ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          <span>{`00:${duration}`}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-navy-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Synchronized Lyrics Container */}
      <div className="space-y-3 pt-2 relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Karaoke Synchronized Lyrics:
        </p>
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
          {anthemLyrics.map((line, idx) => {
            const isActive = idx === activeLineIdx;
            return (
              <motion.div
                key={line.id}
                animate={{
                  scale: isActive ? 1.02 : 1.0,
                  opacity: isActive ? 1 : 0.6,
                }}
                className={`p-3.5 rounded-2xl transition-all border ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg'
                    : 'bg-navy-900/60 border-navy-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`font-serif text-base sm:text-lg font-bold ${isActive ? 'text-amber-300' : 'text-slate-200'}`}>
                    {line.hindi}
                  </p>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 italic">
                  {line.english}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
        <span>Composed for Decent Public School, Sector 3, Rohini</span>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 text-amber-400 hover:text-white transition-colors font-semibold"
        >
          <BookOpen size={14} /> Print Anthem Sheet
        </button>
      </div>
    </div>
  );
}
