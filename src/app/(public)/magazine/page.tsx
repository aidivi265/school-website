import { Metadata } from 'next';
import { MagazineClient } from '@/components/magazine/MagazineClient';

export const metadata: Metadata = {
  title: 'Digital School Magazine & Newsletter | Decent Public School Rohini',
  description:
    'Read the official Decent Public School annual magazine "Decent Horizon", student literature, STEM innovations, and board achievements with our digital flipbook.',
};

export default function MagazinePage() {
  return <MagazineClient />;
}
