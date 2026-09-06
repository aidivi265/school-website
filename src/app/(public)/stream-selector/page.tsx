import { Metadata } from 'next';
import { StreamSelectorClient } from '@/components/academics/StreamSelectorClient';

export const metadata: Metadata = {
  title: 'Class 11 Stream & Career Selector Quiz | Decent Public School, Rohini',
  description:
    'Take our interactive Class 10 to 11 Stream Selector Quiz. Discover your ideal CBSE stream fit (Science PCM/PCB, Commerce with/without Maths, Humanities) and career pathways at Decent Public School, Rohini.',
};

export default function StreamSelectorPage() {
  return <StreamSelectorClient />;
}
