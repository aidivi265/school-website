import { Metadata } from 'next';
import { getSchoolData } from '@/lib/supabase/service';
import AboutClient from '@/components/about/AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Vision, Mission & Leadership',
  description:
    'Learn about Decent Public School, Rohini, Delhi. Discover our founding story since 1995, educational vision, mission, core values, and principal leadership.',
};

export default async function AboutPage() {
  const school = await getSchoolData();

  return <AboutClient initialSchool={school} />;
}
