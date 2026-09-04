import { importFaculty } from './import-faculty';
import { importNotices } from './import-notices';
import { importEvents } from './import-events';
import { importGallery } from './import-gallery';
import { importAchievements } from './import-achievements';
import { importDocuments } from './import-documents';
import { importFAQs } from './import-faqs';

async function importAll() {
  console.log('\n======================================================');
  console.log('🏛️  DECENT PUBLIC SCHOOL (ROHINI) - FULL MIGRATION RUN');
  console.log('    Migrating content from Legacy Wix to Supabase DB  ');
  console.log('======================================================\n');

  try {
    console.log('1/7: Migrating Faculty Directory...');
    await importFaculty();

    console.log('2/7: Migrating Notices & Circulars...');
    await importNotices();

    console.log('3/7: Migrating Events Calendar...');
    await importEvents();

    console.log('4/7: Migrating Photo Gallery & Albums...');
    await importGallery();

    console.log('5/7: Migrating Student Achievements...');
    await importAchievements();

    console.log('6/7: Migrating Downloadable Documents...');
    await importDocuments();

    console.log('7/7: Migrating FAQs & Assistant Knowledge...');
    await importFAQs();

    console.log('\n✨ FULL MIGRATION COMPLETED SUCCESSFULLY!\n');
  } catch (err: any) {
    console.error('\n❌ Migration Pipeline Terminated with error:', err?.message || err);
  }
}

if (require.main === module) {
  importAll().catch(console.error);
}
