import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | Date | undefined | null): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(dateString);
  }
}

export function formatEventDate(dateString: string | Date | undefined | null) {
  if (!dateString) return { day: '01', month: 'JAN', year: '2025' };
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { day: '01', month: 'JAN', year: '2025' };
    return {
      day: String(d.getDate()).padStart(2, '0'),
      month: d.toLocaleString('en-IN', { month: 'short' }).toUpperCase(),
      year: String(d.getFullYear()),
    };
  } catch {
    return { day: '01', month: 'JAN', year: '2025' };
  }
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchFAQ<T extends { question: string; answer: string; keywords?: string[]; category?: string }>(
  query: string,
  faqs: T[]
): T | null {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return null;

  const queryWords = normalizedQuery.split(' ').filter((w) => w.length > 2);

  let bestMatch: T | null = null;
  let highestScore = 0;

  for (const faq of faqs) {
    let score = 0;
    const normQ = normalizeText(faq.question);
    const normA = normalizeText(faq.answer);
    const keywords = (faq.keywords || []).map((k) => normalizeText(k));

    // Direct substring in question
    if (normQ.includes(normalizedQuery)) {
      score += 15;
    }

    // Direct keyword match
    for (const kw of keywords) {
      if (normalizedQuery.includes(kw) || kw.includes(normalizedQuery)) {
        score += 10;
      }
    }

    // Word overlap
    for (const word of queryWords) {
      if (normQ.includes(word)) score += 3;
      if (keywords.some((k) => k.includes(word))) score += 4;
      if (normA.includes(word)) score += 1;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  // Threshold to avoid false positives
  if (highestScore >= 3) {
    return bestMatch;
  }

  return null;
}
