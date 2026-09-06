import { Metadata } from 'next';
import { AlumniClient } from '@/components/alumni/AlumniClient';

export const metadata: Metadata = {
  title: 'Alumni Network & Hall of Fame | Decent Public School Rohini',
  description:
    'Discover inspiring journeys of Decent Public School alumni excelling across IITs, AIIMS, IIMs, civil services, global tech giants, and entrepreneurship.',
};

export default function AlumniPage() {
  return <AlumniClient />;
}
