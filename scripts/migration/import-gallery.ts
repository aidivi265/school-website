import { getMigrationSupabaseClient, readCSVFile, logMigrationSummary } from './utils';
import { validateRow } from '../../src/lib/migration/validator';

export async function importGallery(
  albumsFile = 'data/migration_samples/gallery_albums.csv',
  imagesFile = 'data/migration_samples/gallery_images.csv',
  schoolId = '00000000-0000-0000-0000-000000000001'
) {
  console.log(`🚀 Starting Gallery Migration (Albums: ${albumsFile}, Images: ${imagesFile})`);
  const supabase = getMigrationSupabaseClient();
  const batchId = `batch-gallery-${Date.now()}`;

  // 1. Import Albums
  const albumStats = { total: 0, imported: 0, updated: 0, skipped: 0, failed: 0 };
  const albumMap = new Map<string, string>(); // Title -> ID

  try {
    const { rows: albumRows } = readCSVFile(albumsFile);
    albumStats.total = albumRows.length;

    for (let i = 0; i < albumRows.length; i++) {
      const rowResult = validateRow('gallery_albums', albumRows[i], i + 1);
      if (!rowResult.isValid) {
        albumStats.failed++;
        continue;
      }

      const albId = `alb-${Date.now()}-${i}`;
      albumMap.set(rowResult.data.title.toLowerCase(), albId);

      if (supabase) {
        const { error } = await supabase.from('gallery_albums').insert([
          {
            id: albId,
            ...rowResult.data,
            school_id: schoolId,
            migration_batch_id: batchId,
            created_at: new Date().toISOString(),
          },
        ]);
        if (error) {
          albumStats.failed++;
        } else {
          albumStats.imported++;
        }
      } else {
        albumStats.imported++;
      }
    }
  } catch (err) {
    console.warn('Albums file skipped or not found.');
  }

  logMigrationSummary('gallery_albums', albumStats);

  // 2. Import Images
  const imgStats = { total: 0, imported: 0, updated: 0, skipped: 0, failed: 0 };
  try {
    const { rows: imgRows } = readCSVFile(imagesFile);
    imgStats.total = imgRows.length;

    for (let i = 0; i < imgRows.length; i++) {
      const rowResult = validateRow('gallery_images', imgRows[i], i + 1);
      if (!rowResult.isValid) {
        imgStats.failed++;
        continue;
      }

      const assignedAlbumId = albumMap.get((rowResult.data.album_title || '').toLowerCase());

      if (supabase) {
        const { error } = await supabase.from('gallery_images').insert([
          {
            ...rowResult.data,
            album_id: assignedAlbumId || null,
            school_id: schoolId,
            migration_batch_id: batchId,
            created_at: new Date().toISOString(),
          },
        ]);
        if (error) {
          imgStats.failed++;
        } else {
          imgStats.imported++;
        }
      } else {
        imgStats.imported++;
      }
    }
  } catch (err) {
    console.warn('Images file skipped or not found.');
  }

  logMigrationSummary('gallery_images', imgStats);
}

if (require.main === module) {
  importGallery().catch(console.error);
}
