import { Metadata } from 'next';
import { getSchoolData } from '@/lib/supabase/service';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Location, Phone & Office Timings',
  description:
    'Contact Decent Public School, Sector 3, Rohini, Delhi. Find our school location on map, telephone numbers, admission desk timings, and office email.',
};

export default async function ContactPage() {
  const school = await getSchoolData();

  return <ContactClient initialSchool={school} />;
}
