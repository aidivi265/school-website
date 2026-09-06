import { Metadata } from 'next';
import { HouseSystemClient } from '@/components/house/HouseSystemClient';

export const metadata: Metadata = {
  title: 'House System & Live Leaderboard | Decent Public School, Rohini',
  description:
    'Discover the House System at Decent Public School, Rohini — Agni, Trishul, Prithvi, and Akash Houses. Explore live championship leaderboard, house masters, student captains, and sports shields.',
};

export default function HouseSystemPage() {
  return <HouseSystemClient />;
}
