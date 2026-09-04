import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { MigrationEntityType, DuplicateAction, ImportResult, ValidationError } from '@/lib/migration/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type,
      sourceFile = 'upload.csv',
      rows = [],
      duplicateAction = 'skip' as DuplicateAction,
      schoolId = '00000000-0000-0000-0000-000000000001',
    }: {
      type: MigrationEntityType;
      sourceFile?: string;
      rows: Array<{
        data: Record<string, any>;
        isDuplicate: boolean;
        duplicateMatch?: { id: string };
      }>;
      duplicateAction?: DuplicateAction;
      schoolId?: string;
    } = body;

    if (!type || !rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid migration payload. Type and rows are required.' },
        { status: 400 }
      );
    }

    const batchId = 'batch-' + Date.now();
    let imported = 0;
    let updated = 0;
    let skipped = 0;
    let failed = 0;
    const errors: ValidationError[] = [];

    const supabase = await createServerClient();

    // Map entity types to Supabase table names
    const tableMap: Record<MigrationEntityType, string> = {
      faculty: 'faculty',
      notices: 'notices',
      events: 'events',
      gallery_albums: 'gallery_albums',
      gallery_images: 'gallery_images',
      achievements: 'achievements',
      documents: 'documents',
      faqs: 'faqs',
      pages: 'page_content',
      settings: 'schools',
    };

    const tableName = tableMap[type] || type;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 1;

      try {
        if (row.isDuplicate) {
          if (duplicateAction === 'skip') {
            skipped++;
            continue;
          } else if (duplicateAction === 'update' && row.duplicateMatch?.id) {
            // Update existing record
            if (supabase) {
              const { error: updateErr } = await supabase
                .from(tableName)
                .update({
                  ...row.data,
                  updated_at: new Date().toISOString(),
                })
                .eq('id', row.duplicateMatch.id);

              if (updateErr) {
                failed++;
                errors.push({ row: rowNum, field: 'db', message: updateErr.message });
                continue;
              }
            }
            updated++;
            continue;
          }
        }

        // Insert as new record
        const recordToInsert = {
          ...row.data,
          school_id: schoolId,
          migration_batch_id: batchId,
          created_at: new Date().toISOString(),
        };

        if (supabase) {
          const { error: insertErr } = await supabase.from(tableName).insert([recordToInsert]);
          if (insertErr) {
            failed++;
            errors.push({ row: rowNum, field: 'db', message: insertErr.message });
            continue;
          }
        }

        imported++;
      } catch (err: any) {
        failed++;
        errors.push({
          row: rowNum,
          field: 'unknown',
          message: err?.message || 'Database error during insertion',
        });
      }
    }

    // Save migration batch log in Supabase
    if (supabase) {
      await supabase.from('migration_batches').insert([
        {
          id: batchId,
          school_id: schoolId,
          type,
          source_file: sourceFile,
          records_count: rows.length,
          imported_count: imported,
          updated_count: updated,
          skipped_count: skipped,
          failed_count: failed,
          errors,
          status: 'completed',
          created_by: 'School Administrator',
          created_at: new Date().toISOString(),
        },
      ]);
    }

    const result: ImportResult = {
      batchId,
      type,
      sourceFile,
      total: rows.length,
      imported,
      updated,
      skipped,
      failed,
      errors,
    };

    return NextResponse.json({
      success: true,
      message: `Migration completed. ${imported} imported, ${updated} updated, ${skipped} skipped, ${failed} failed.`,
      result,
    });
  } catch (error: any) {
    console.error('Migration API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error processing migration import.' },
      { status: 500 }
    );
  }
}
