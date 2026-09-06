import { Metadata } from 'next';
import AcademicsClient from '@/components/academics/AcademicsClient';

export const metadata: Metadata = {
  title: 'Academics & Curriculum | CBSE Streams & Pedagogy',
  description:
    'Explore the academic curriculum at Decent Public School, Rohini. CBSE affiliated courses from Pre-School to Class XII including Science and Commerce streams.',
};

export default function AcademicsPage() {
  return <AcademicsClient />;
}
