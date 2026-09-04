import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { parseCSV, normalizeBoolean, normalizeDate, normalizeNoticeCategory, normalizeEventCategory } from '../../src/lib/migration/normalizer';

/**
 * Server-side migration client using SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY
 */
export function getMigrationSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Supabase URL or Key missing in environment. Running in offline/dry-run mode.');
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export function readCSVFile(filePath: string): { headers: string[]; rows: Record<string, string>[] } {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File not found: ${resolvedPath}`);
  }
  const content = fs.readFileSync(resolvedPath, 'utf-8');
  return parseCSV(content);
}

export function logMigrationSummary(type: string, stats: { total: number; imported: number; updated: number; skipped: number; failed: number }) {
  console.log('\n========================================');
  console.log(`📊 MIGRATION SUMMARY: ${type.toUpperCase()}`);
  console.log('========================================');
  console.log(`Total Rows:   ${stats.total}`);
  console.log(`✅ Imported:   ${stats.imported}`);
  console.log(`🔄 Updated:    ${stats.updated}`);
  console.log(`⏭️  Skipped:    ${stats.skipped}`);
  console.log(`❌ Failed:     ${stats.failed}`);
  console.log('========================================\n');
}
