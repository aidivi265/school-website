import { Metadata } from 'next';
import { getFacilities } from '@/lib/supabase/service';
import FacilitiesClient from '@/components/facilities/FacilitiesClient';

export const metadata: Metadata = {
  title: 'Campus Facilities & Infrastructure | Labs, Sports & Library',
  description:
    'Discover the modern campus infrastructure at Decent Public School, Rohini. Smart classrooms, advanced science and AI labs, multi-sport ground, and safe transport.',
};

export default async function FacilitiesPage() {
  const facilitiesList = await getFacilities();

  return <FacilitiesClient initialFacilities={facilitiesList} />;
}
