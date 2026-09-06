'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpNumberProps {
  value: string | number;
  duration?: number; // in ms
  className?: string;
}

export function CountUpNumber({ value, duration = 1800, className = '' }: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the numeric part and prefix/suffix
    const stringVal = String(value);
    const match = stringVal.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (!match) {
      setDisplayValue(stringVal);
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';

    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic formula for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.round(targetNum * easeOut);

      setDisplayValue(`${prefix}${currentNum.toLocaleString('en-IN')}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(stringVal);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
