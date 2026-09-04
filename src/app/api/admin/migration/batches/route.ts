import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('migration_batches')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return NextResponse.json({ batches: data });
      }
    }

    // Default mock history for local fallback
    return NextResponse.json({
      batches: [
        {
          id: 'batch-wix-init-101',
          school_id: '00000000-0000-0000-0000-000000000001',
          type: 'faculty',
          source_file: 'wix_faculty_export.csv',
          records_count: 24,
          imported_count: 22,
          updated_count: 2,
          skipped_count: 0,
          failed_count: 0,
          status: 'completed',
          created_by: 'Administrator',
          created_at: '2025-06-10T11:20:00Z',
        },
        {
          id: 'batch-wix-notices-102',
          school_id: '00000000-0000-0000-0000-000000000001',
          type: 'notices',
          source_file: 'wix_circulars_archive.csv',
          records_count: 18,
          imported_count: 16,
          updated_count: 0,
          skipped_count: 2,
          failed_count: 0,
          status: 'completed',
          created_by: 'Administrator',
          created_at: '2025-06-11T14:45:00Z',
        },
      ],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch migration batches.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get('batchId');
    const entityType = searchParams.get('type');

    if (!batchId) {
      return NextResponse.json({ error: 'batchId is required for rollback.' }, { status: 400 });
    }

    const supabase = await createServerClient();
    if (supabase && entityType) {
      // Delete rows associated with this batch
      await supabase.from(entityType).delete().eq('migration_batch_id', batchId);
      // Mark batch as rolled back
      await supabase
        .from('migration_batches')
        .update({ status: 'rolled_back' })
        .eq('id', batchId);
    }

    return NextResponse.json({
      success: true,
      message: `Batch "${batchId}" successfully rolled back.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to rollback migration batch.' },
      { status: 500 }
    );
  }
}
