import { getMigrationSupabaseClient, readCSVFile, logMigrationSummary } from './utils';
import { validateRow } from '../../src/lib/migration/validator';
import process from 'process';
import { fileURLToPath } from 'url';

export async function importFaculty(filePath = 'data/migration_samples/faculty.csv', schoolId = '00000000-0000-0000-0000-000000000001') {
  console.log(`🚀 Starting Faculty Migration from: ${filePath}`);
  const { rows } = readCSVFile(filePath);
  const supabase = getMigrationSupabaseClient();

  const stats = { total: rows.length, imported: 0, updated: 0, skipped: 0, failed: 0 };
  const batchId = `batch-faculty-${Date.now()}`;

  for (let i = 0; i < rows.length; i++) {
    const rowResult = validateRow('faculty', rows[i], i + 1);
    if (!rowResult.isValid) {
      console.error(`❌ Row ${i + 1} Error:`, rowResult.errors);
      stats.failed++;
      continue;
    }

    if (supabase) {
      const { error } = await supabase.from('faculty').insert([
        {
          ...rowResult.data,
          school_id: schoolId,
          migration_batch_id: batchId,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) {
        console.error(`❌ Insert Error row ${i + 1}:`, error.message);
        stats.failed++;
      } else {
        stats.imported++;
      }
    } else {
      stats.imported++;
    }
  }

  logMigrationSummary('faculty', stats);
  return stats;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2] || 'data/migration_samples/faculty.csv';
  importFaculty(file).catch(console.error);
}
