import { Metadata } from 'next';
import { getSchoolData } from '@/lib/supabase/service';
import { BookVisitClient } from '@/components/booking/BookVisitClient';

export const metadata: Metadata = {
  title: 'Book a Campus Visit & Meeting | Decent Public School Rohini',
  description:
    'Schedule a guided campus tour, Principal desk interaction, or admission counselling meeting at Decent Public School, Sector 3, Rohini, Delhi.',
};

export default async function BookVisitPage() {
  const school = await getSchoolData();
  return <BookVisitClient initialSchool={school} />;
}
