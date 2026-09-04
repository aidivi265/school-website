/**
 * CSV Parser & Data Normalizer Utility
 * Handles RFC-4180 CSV strings, messy Wix exports, whitespace trimming,
 * multi-format date conversions, boolean parsing, and category alignment.
 */

// 1. RFC 4180 CSV Parser
export function parseCSV(csvText: string): { headers: string[]; rows: Record<string, string>[] } {
  const cleanText = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!cleanText) return { headers: [], rows: [] };

  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentCell += '"';
          i++; // Skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\n') {
        currentRow.push(currentCell.trim());
        lines.push(currentRow);
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
  }

  // Push last cell & row if remaining
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    lines.push(currentRow);
  }

  if (lines.length === 0) return { headers: [], rows: [] };

  // Normalize header keys: lowercase, remove spaces/hyphens -> snake_case
  const rawHeaders = lines[0];
  const headers = rawHeaders.map((h) =>
    h
      .toLowerCase()
      .trim()
      .replace(/[\s\-_]+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
  );

  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Skip completely empty lines
    if (line.length === 0 || (line.length === 1 && !line[0])) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((header, colIndex) => {
      rowObj[header] = line[colIndex] !== undefined ? line[colIndex].trim() : '';
    });
    rows.push(rowObj);
  }

  return { headers, rows };
}

// 2. Boolean Normalizer
export function normalizeBoolean(value: unknown, defaultValue = true): boolean {
  if (value === undefined || value === null || value === '') return defaultValue;
  if (typeof value === 'boolean') return value;

  const str = String(value).trim().toLowerCase();
  if (['true', 'yes', 'y', '1', 'published', 'active', 'enabled', 'highlight'].includes(str)) {
    return true;
  }
  if (['false', 'no', 'n', '0', 'draft', 'inactive', 'disabled', 'hidden', 'unpublished'].includes(str)) {
    return false;
  }
  return defaultValue;
}

// 3. Date Normalizer (Supports DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, D Mon YYYY, etc.)
export function normalizeDate(dateStr: unknown, fallbackToToday = true): string | null {
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.trim()) {
    return fallbackToToday ? new Date().toISOString().split('T')[0] : null;
  }

  const clean = dateStr.trim();

  // Pattern 1: ISO standard YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }

  // Pattern 2: DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = clean.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const month = dmyMatch[2].padStart(2, '0');
    const year = dmyMatch[3];
    return `${year}-${month}-${day}`;
  }

  // Pattern 3: YYYY/MM/DD
  const ymdMatch = clean.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const month = ymdMatch[2].padStart(2, '0');
    const day = ymdMatch[3].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Pattern 4: Try standard Date constructor
  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }

  return fallbackToToday ? new Date().toISOString().split('T')[0] : null;
}

// 4. Phone Normalizer
export function normalizePhone(phone: unknown): string {
  if (!phone || typeof phone !== 'string') return '';
  let clean = phone.trim().replace(/[^\d+]/g, '');
  if (clean.length === 10 && !clean.startsWith('+')) {
    clean = '+91 ' + clean.substring(0, 5) + ' ' + clean.substring(5);
  }
  return clean || phone.toString().trim();
}

// 5. Category Normalizers
export function normalizeNoticeCategory(cat?: string): string {
  if (!cat) return 'General';
  const c = cat.toLowerCase().trim();
  if (c.includes('admiss')) return 'Admissions';
  if (c.includes('exam') || c.includes('datesheet') || c.includes('result')) return 'Examination';
  if (c.includes('holiday') || c.includes('vacation')) return 'Holiday';
  if (c.includes('achieve') || c.includes('topper') || c.includes('award')) return 'Achievement';
  if (c.includes('event') || c.includes('sports') || c.includes('annual')) return 'Event';
  if (c.includes('urgent') || c.includes('alert') || c.includes('important')) return 'Urgent';
  if (c.includes('circul')) return 'Circular';
  return 'General';
}

export function normalizeEventCategory(cat?: string): string {
  if (!cat) return 'Celebration';
  const c = cat.toLowerCase().trim();
  if (c.includes('sport') || c.includes('athlet') || c.includes('game')) return 'Sports';
  if (c.includes('acad') || c.includes('olympiad') || c.includes('quiz')) return 'Academic';
  if (c.includes('cultur') || c.includes('dance') || c.includes('music') || c.includes('drama')) return 'Cultural';
  if (c.includes('work') || c.includes('seminar') || c.includes('orient')) return 'Workshop';
  if (c.includes('compet')) return 'Competition';
  return 'Celebration';
}

export function normalizeDocumentCategory(cat?: string): string {
  if (!cat) return 'Admission Forms';
  const c = cat.toLowerCase().trim();
  if (c.includes('admiss') || c.includes('regist')) return 'Admission Forms';
  if (c.includes('circul') || c.includes('notice')) return 'Circulars';
  if (c.includes('syllab') || c.includes('curricul')) return 'Syllabus & Curriculum';
  if (c.includes('polic') || c.includes('guideline') || c.includes('code')) return 'School Policies';
  if (c.includes('acad') || c.includes('calendar') || c.includes('book')) return 'Academic Documents';
  return 'Important Forms';
}

export function normalizeAchievementCategory(cat?: string): 'academic' | 'sports' | 'cultural' | 'awards' {
  if (!cat) return 'academic';
  const c = cat.toLowerCase().trim();
  if (c.includes('sport') || c.includes('game')) return 'sports';
  if (c.includes('cultur') || c.includes('art')) return 'cultural';
  if (c.includes('award') || c.includes('trophy') || c.includes('school')) return 'awards';
  return 'academic';
}

export function normalizeFAQCategory(cat?: string): string {
  if (!cat) return 'General';
  const c = cat.toLowerCase().trim();
  if (c.includes('admiss') || c.includes('apply')) return 'Admissions';
  if (c.includes('acad') || c.includes('curric') || c.includes('cbse')) return 'Academics';
  if (c.includes('trans') || c.includes('bus') || c.includes('facil')) return 'Transport & Facilities';
  if (c.includes('time') || c.includes('hour') || c.includes('sched')) return 'Timings & Schedule';
  if (c.includes('fee') || c.includes('cost') || c.includes('pay')) return 'Fees & Payments';
  return 'General';
}

export function normalizeGalleryCategory(cat?: string): string {
  if (!cat) return 'campus';
  const c = cat.toLowerCase().trim();
  if (c.includes('class') || c.includes('lab')) return 'classrooms';
  if (c.includes('sport') || c.includes('ground')) return 'sports';
  if (c.includes('event') || c.includes('function')) return 'events';
  if (c.includes('celeb') || c.includes('festival')) return 'celebrations';
  if (c.includes('activ') || c.includes('stem')) return 'activities';
  return 'campus';
}
