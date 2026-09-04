import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { MediaMigrationRecord } from '@/lib/migration/types';

const INITIAL_MAPPINGS: MediaMigrationRecord[] = [
  {
    id: 'map-1',
    old_url: 'https://static.wixstatic.com/media/decent_logo_orig.png',
    new_url: 'https://storage.supabase.co/v1/object/public/school-assets/logo.png',
    file_name: 'logo.png',
    file_type: 'image/png',
    bucket: 'school-assets',
    status: 'uploaded',
    created_at: '2025-06-10T09:00:00Z',
  },
  {
    id: 'map-2',
    old_url: 'https://static.wixstatic.com/media/campus_front_building.jpg',
    new_url: 'https://storage.supabase.co/v1/object/public/gallery/campus_front.jpg',
    file_name: 'campus_front.jpg',
    file_type: 'image/jpeg',
    bucket: 'gallery',
    status: 'uploaded',
    created_at: '2025-06-10T09:15:00Z',
  },
  {
    id: 'map-3',
    old_url: 'https://static.wixstatic.com/ugd/decent_admission_form_2024.pdf',
    new_url: 'https://storage.supabase.co/v1/object/public/documents/admission_form_2025.pdf',
    file_name: 'admission_form_2025.pdf',
    file_type: 'application/pdf',
    bucket: 'documents',
    status: 'uploaded',
    created_at: '2025-06-11T10:00:00Z',
  },
  {
    id: 'map-4',
    old_url: 'https://static.wixstatic.com/media/annual_sports_trophy_2024.jpg',
    file_name: 'annual_sports_trophy_2024.jpg',
    file_type: 'image/jpeg',
    bucket: 'achievements',
    status: 'pending',
    error_message: 'File pending manual upload or automatic download verification',
    created_at: '2025-06-12T11:00:00Z',
  },
];

export async function GET() {
  try {
    const supabase = await createServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('media_migrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ mappings: data });
      }
    }
    return NextResponse.json({ mappings: INITIAL_MAPPINGS });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch media mappings.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { oldUrl, newUrl, fileName, bucket = 'school-assets', fileType = 'image/jpeg' } = body;

    if (!oldUrl || !fileName) {
      return NextResponse.json({ error: 'oldUrl and fileName are required.' }, { status: 400 });
    }

    const supabase = await createServerClient();
    const newRecord: MediaMigrationRecord = {
      id: 'map-' + Date.now(),
      old_url: oldUrl,
      new_url: newUrl || undefined,
      file_name: fileName,
      file_type: fileType,
      bucket,
      status: newUrl ? 'uploaded' : 'pending',
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      await supabase.from('media_migrations').insert([newRecord]);
    }

    return NextResponse.json({ success: true, mapping: newRecord });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to register media mapping.' },
      { status: 500 }
    );
  }
}
