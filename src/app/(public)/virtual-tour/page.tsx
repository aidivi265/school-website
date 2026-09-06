import { Metadata } from 'next';
import { VirtualTourClient } from '@/components/tour/VirtualTourClient';

export const metadata: Metadata = {
  title: '360° Virtual Campus Tour | Decent Public School, Rohini',
  description:
    'Experience an interactive 360-degree virtual tour of Decent Public School, Rohini. Explore modern STEM robotics labs, science laboratories, smart classrooms, basketball courts, skating arena, and library.',
};

export default function VirtualTourPage() {
  return <VirtualTourClient />;
}
